import mongoose from "mongoose";

const noteSchema =
  new mongoose.Schema(
    {
      text: {
        type: String,
        required: true,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    { _id: false }
  );

const taskSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      completed: {
        type: Boolean,
        default: false,
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

      dueDate: {
        type: Date,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    { _id: true }
  );

const leadSchema =
  new mongoose.Schema(
    {
      tenantId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
      },

      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
      },

      phone: {
        type: String,
      },

      source: {
        type: String,
        default: "website",
      },

      status: {
        type: String,
        enum: [
          "new",
          "contacted",
          "qualified",
          "converted",
          "lost",
        ],
        default: "new",
      },

      notes: [noteSchema],

      tasks: [taskSchema],
    },
    {
      timestamps: true,
    }
  );

const Lead =
  mongoose.model(
    "Lead",
    leadSchema
  );

export default Lead;