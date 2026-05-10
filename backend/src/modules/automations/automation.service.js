import AppError from "../../common/errors/AppError.js";
import {
  createActivity,
} from "../activity/activity.service.js";
import Automation from "./automation.model.js";
import { sendEmail } from "../../common/services/email.service.js";

export const getAutomationsService =
  async (user) => {
    return Automation.find({
      tenantId: user.tenantId,
    }).sort({ createdAt: -1 });
  };

export const createAutomationService =
  async (data, user) => {
    return Automation.create({
      ...data,
      tenantId: user.tenantId,
      createdBy: user.id,
    });
  };

export const updateAutomationService =
  async (id, data, user) => {
    const automation =
      await Automation.findOneAndUpdate(
        {
          _id: id,
          tenantId: user.tenantId,
        },
        data,
        { new: true }
      );

    if (!automation) {
      throw new AppError(
        "Automation not found",
        404
      );
    }

    return automation;
  };

export const deleteAutomationService =
  async (id, user) => {
    const automation =
      await Automation.findOneAndDelete({
        _id: id,
        tenantId: user.tenantId,
      });

    if (!automation) {
      throw new AppError(
        "Automation not found",
        404
      );
    }

    return {
      deletedAutomationId: id,
    };
  };

const matchesStatusConditions = (
  automation,
  previousStatus,
  nextStatus
) => {
  const { conditions = {} } =
    automation;

  const fromMatches =
    !conditions.fromStatus ||
    conditions.fromStatus ===
      previousStatus;

  const toMatches =
    !conditions.toStatus ||
    conditions.toStatus === nextStatus;

  return fromMatches && toMatches;
};

export const runLeadStatusAutomations =
  async ({
    tenantId,
    lead,
    previousStatus,
    nextStatus,
    user,
  }) => {
    const automations =
      await Automation.find({
        tenantId,
        trigger:
          "lead_status_changed",
        isActive: true,
      });

    const matchedAutomations =
      automations.filter(
        (automation) =>
          matchesStatusConditions(
            automation,
            previousStatus,
            nextStatus
          )
      );

    for (const automation of matchedAutomations) {
      if (
        automation.action ===
        "create_task"
      ) {
        const dueDate = new Date();
        dueDate.setDate(
          dueDate.getDate() +
            Number(
              automation.actionConfig
                .dueInDays || 0
            )
        );

        lead.tasks.unshift({
          title:
            automation.actionConfig.title,
          priority:
            automation.actionConfig
              .priority,
          dueDate,
        });

        await createActivity({
          tenantId,
          entityType: "lead",
          entityId: lead._id,
          action:
            "automation_task_created",
          description: `Automation "${automation.name}" created task "${automation.actionConfig.title}"`,
          performedBy: user.id,
          metadata: {
            automationId:
              automation._id,
          },
        });
      } else if (automation.action === "send_email") {
        if (lead.email) {
          const body = automation.actionConfig.emailBody.replace("{{leadName}}", lead.name || "there");
          const subject = automation.actionConfig.emailSubject.replace("{{leadName}}", lead.name || "there");

          await sendEmail({
            to: lead.email,
            subject,
            text: body,
            html: `<p>${body.replace(/\n/g, '<br/>')}</p>`,
          });

          await createActivity({
            tenantId,
            entityType: "lead",
            entityId: lead._id,
            action: "automation_email_sent",
            description: `Automation "${automation.name}" sent email "${subject}"`,
            performedBy: user.id,
            metadata: {
              automationId: automation._id,
              subject,
            },
          });
        }
      }
    }

    if (matchedAutomations.length > 0) {
      await lead.save();
    }

    return matchedAutomations;
  };
