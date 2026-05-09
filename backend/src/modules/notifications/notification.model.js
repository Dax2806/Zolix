import mongoose from "mongoose";

const notificationSchema =
  new mongoose.Schema(
    {
      tenantId: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Tenant",

        required: true,

        index: true,
      },

      userId: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      type: {
        type: String,

        enum: [
          "task_assigned",
          "task_due",
          "lead_created",
          "lead_updated",
          "system",
        ],

        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      isRead: {
        type: Boolean,
        default: false,
      },

      entityType: {
        type: String,
      },

      entityId: {
        type:
          mongoose.Schema.Types.ObjectId,
      },
    },
    {
      timestamps: true,
    }
  );

notificationSchema.index({
  tenantId: 1,
  userId: 1,
  isRead: 1,
});

const Notification =
  mongoose.model(
    "Notification",
    notificationSchema
  );

export default Notification;