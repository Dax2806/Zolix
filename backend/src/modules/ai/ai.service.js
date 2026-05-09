import Lead from "../leads/lead.model.js";
import Activity from "../activity/activity.model.js";
import AppError from "../../common/errors/AppError.js";

const statusWeights = {
  new: 20,
  contacted: 45,
  qualified: 70,
  converted: 100,
  lost: 5,
};

const priorityWeights = {
  low: 5,
  medium: 10,
  high: 15,
};

const daysSince = (date) => {
  if (!date) return 0;

  return Math.floor(
    (Date.now() -
      new Date(date).getTime()) /
      (1000 * 60 * 60 * 24)
  );
};

const clamp = (value) =>
  Math.max(0, Math.min(100, value));

const getLeadSignals = (
  lead,
  activities
) => {
  const openTasks =
    lead.tasks?.filter(
      (task) => !task.completed
    ) || [];

  const overdueTasks =
    openTasks.filter(
      (task) =>
        task.dueDate &&
        new Date(task.dueDate) <
          new Date()
    );

  const latestActivity =
    activities[0]?.createdAt ||
    lead.updatedAt;

  const inactivityDays =
    daysSince(latestActivity);

  return {
    openTasks,
    overdueTasks,
    inactivityDays,
    noteCount:
      lead.notes?.length || 0,
    activityCount:
      activities.length,
  };
};

const calculateScore = (
  lead,
  signals
) => {
  const base =
    statusWeights[lead.status] || 20;

  const taskScore =
    signals.openTasks.reduce(
      (total, task) =>
        total +
        (priorityWeights[
          task.priority
        ] || 0),
      0
    );

  const engagementScore =
    Math.min(
      20,
      signals.noteCount * 4 +
        signals.activityCount * 2
    );

  const overduePenalty =
    signals.overdueTasks.length * 12;

  const inactivityPenalty =
    signals.inactivityDays > 7
      ? Math.min(
          20,
          signals.inactivityDays
        )
      : 0;

  return clamp(
    base +
      taskScore +
      engagementScore -
      overduePenalty -
      inactivityPenalty
  );
};

const getScoreLabel = (score) => {
  if (score >= 75) return "hot";
  if (score >= 45) return "warm";
  return "cold";
};

const buildSuggestions = (
  lead,
  signals,
  scoreLabel
) => {
  if (lead.status === "converted") {
    return [
      "Send a thank-you message and ask for a referral.",
      "Create an onboarding task so the handoff does not get missed.",
    ];
  }

  if (lead.status === "lost") {
    return [
      "Keep this lead in a reactivation list for a future campaign.",
      "Add a short note explaining why the lead was lost.",
    ];
  }

  if (signals.overdueTasks.length > 0) {
    return [
      "Complete or reschedule the overdue follow-up task.",
      "Send a short check-in message today.",
    ];
  }

  if (signals.inactivityDays >= 7) {
    return [
      "Follow up now; this lead has been inactive for more than a week.",
      "Move the lead to lost if there is no response after this follow-up.",
    ];
  }

  if (scoreLabel === "hot") {
    return [
      "Ask a closing question and offer the next available slot.",
      "Create a high-priority task for the final follow-up.",
    ];
  }

  if (lead.status === "new") {
    return [
      "Contact the lead and move them to contacted after the first response.",
      "Ask one qualifying question before pitching the offer.",
    ];
  }

  return [
    "Send a helpful follow-up with one clear next step.",
    "Add a note after the conversation so the timeline stays useful.",
  ];
};

const buildReplyDraft = (
  lead,
  scoreLabel
) => {
  const name =
    lead.name?.split(" ")[0] ||
    "there";

  if (scoreLabel === "hot") {
    return `Hi ${name}, thanks for your interest. Based on what we discussed, the next best step is to confirm a time that works for you. Would today or tomorrow be better?`;
  }

  if (lead.status === "new") {
    return `Hi ${name}, thanks for reaching out. I wanted to quickly understand your requirement so I can suggest the right next step. What are you looking to get started with?`;
  }

  return `Hi ${name}, just checking in on our earlier conversation. Happy to help you take the next step whenever you are ready.`;
};

export const getLeadInsightsService =
  async (leadId, user) => {
    const lead = await Lead.findOne({
      _id: leadId,
      tenantId: user.tenantId,
    });

    if (!lead) {
      throw new AppError(
        "Lead not found",
        404
      );
    }

    const activities =
      await Activity.find({
        tenantId: user.tenantId,
        entityType: "lead",
        entityId: lead._id,
      })
        .sort({ createdAt: -1 })
        .limit(25);

    const signals =
      getLeadSignals(
        lead,
        activities
      );

    const score =
      calculateScore(
        lead,
        signals
      );

    const scoreLabel =
      getScoreLabel(score);

    return {
      score,
      scoreLabel,
      summary: `${lead.name} is a ${scoreLabel} lead with ${signals.openTasks.length} open task(s) and ${signals.inactivityDays} day(s) since the last activity.`,
      suggestions:
        buildSuggestions(
          lead,
          signals,
          scoreLabel
        ),
      replyDraft:
        buildReplyDraft(
          lead,
          scoreLabel
        ),
      signals: {
        openTasks:
          signals.openTasks.length,
        overdueTasks:
          signals.overdueTasks.length,
        noteCount:
          signals.noteCount,
        activityCount:
          signals.activityCount,
        inactivityDays:
          signals.inactivityDays,
      },
    };
  };
