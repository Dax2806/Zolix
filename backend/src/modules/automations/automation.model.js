import mongoose from "mongoose";

const automationSchema =
  new mongoose.Schema(
    {
      tenantId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required: true,
        index: true,
      },

      name: {
        type: String,
        required: true,
        trim: true,
      },

      trigger: {
        type: String,
        enum: ["lead_status_changed"],
        required: true,
      },

      conditions: {
        fromStatus: {
          type: String,
          default: "",
        },
        toStatus: {
          type: String,
          default: "",
        },
      },

      action: {
        type: String,
        enum: ["create_task", "send_email"],
        required: true,
      },

      actionConfig: {
        title: {
          type: String,
        },
        priority: {
          type: String,
          enum: [
            "low",
            "medium",
            "high",
          ],
          default: "medium",
        },
        dueInDays: {
          type: Number,
          default: 1,
        },
        emailSubject: {
          type: String,
        },
        emailBody: {
          type: String,
        },
      },

      isActive: {
        type: Boolean,
        default: true,
      },

      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    { timestamps: true }
  );

automationSchema.index({
  tenantId: 1,
  trigger: 1,
  isActive: 1,
});

const Automation =
  mongoose.model(
    "Automation",
    automationSchema
  );

export default Automation;
