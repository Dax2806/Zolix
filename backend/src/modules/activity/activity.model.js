import mongoose from "mongoose";

const activitySchema =
  new mongoose.Schema(
    {
      tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required: true,
        index: true,
      },

      entityType: {
        type: String,
        enum: [
          "lead",
          "task",
          "appointment",
          "user",
        ],
        required: true,
      },

      entityId: {
        type:
          mongoose.Schema.Types.ObjectId,

        required: true,
      },

      action: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      performedBy: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      metadata: {
        type: Object,
        default: {},
      },
    },
    {
      timestamps: true,
    }
  );

activitySchema.index({
  tenantId: 1,
  createdAt: -1,
});

const Activity = mongoose.model(
  "Activity",
  activitySchema
);

export default Activity;