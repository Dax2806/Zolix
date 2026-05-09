import Lead from "../leads/lead.model.js";

import Task from "../tasks/task.model.js";

export const getDashboardStatsService =
  async (user) => {
    const tenantFilter = {
      tenantId: user.tenantId,
    };

    // LEADS

    const totalLeads =
      await Lead.countDocuments(
        tenantFilter
      );

    const newLeads =
      await Lead.countDocuments({
        ...tenantFilter,

        status: "new",
      });

    const convertedLeads =
      await Lead.countDocuments({
        ...tenantFilter,

        status: "converted",
      });

    const lostLeads =
      await Lead.countDocuments({
        ...tenantFilter,

        status: "lost",
      });

    // TASKS

    const totalTasks =
      await Task.countDocuments(
        tenantFilter
      );

    const pendingTasks =
      await Task.countDocuments({
        ...tenantFilter,

        status: "pending",
      });

    const completedTasks =
      await Task.countDocuments({
        ...tenantFilter,

        status: "completed",
      });

    const overdueTasks =
      await Task.countDocuments({
        ...tenantFilter,

        dueDate: {
          $lt: new Date(),
        },

        status: {
          $ne: "completed",
        },
      });

    return {
      leads: {
        totalLeads,
        newLeads,
        convertedLeads,
        lostLeads,
      },

      tasks: {
        totalTasks,
        pendingTasks,
        completedTasks,
        overdueTasks,
      },
    };
  };