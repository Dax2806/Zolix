import cron from "node-cron";

import Task from "../modules/tasks/task.model.js";

import {
  createNotification,
} from "../modules/notifications/notification.service.js";

const startTaskReminderJob = () => {
  cron.schedule("* * * * *", async () => {
    console.log(
      "Running task reminder job..."
    );

    try {
      // Find overdue tasks
      const overdueTasks =
        await Task.find({
          dueDate: {
            $lt: new Date(),
          },

          status: {
            $ne: "completed",
          },
        });

      for (const task of overdueTasks) {
        // Update task status
        task.status = "overdue";

        await task.save();

        // Create notification
        await createNotification({
          tenantId: task.tenantId,

          userId: task.assignedTo,

          type: "task_due",

          title: "Task Overdue",

          message: `Task "${task.title}" is overdue`,

          entityType: "task",

          entityId: task._id,
        });
      }

      console.log(
        `Processed ${overdueTasks.length} overdue tasks`
      );
    } catch (error) {
      console.error(
        "Reminder job failed:",
        error
      );
    }
  });
};

export default startTaskReminderJob;