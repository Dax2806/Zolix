import {
  useState,
} from "react";

import {
  Trash2,
  CheckCircle2,
} from "lucide-react";

import toast
  from "react-hot-toast";

import {
  addLeadTask,
  toggleLeadTask,
  deleteLeadTask,
} from "../services/lead.service";

const LeadTasks = ({
  lead,
  onTasksUpdated,
}) => {
  const [title, setTitle] =
    useState("");

  const [
    priority,
    setPriority,
  ] = useState("medium");

  const [dueDate, setDueDate] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleAddTask =
    async (e) => {
      e.preventDefault();

      if (!title.trim())
        return;

      try {
        setLoading(true);

        const updatedLead =
          await addLeadTask(
            lead._id,
            {
              title,
              priority,
              dueDate,
            }
          );

        onTasksUpdated(
          updatedLead
        );

        setTitle("");
        setPriority("medium");
        setDueDate("");

        toast.success(
          "Task added"
        );
      }  finally {
        setLoading(false);
      }
    };

  const handleToggle =
    async (taskId) => {
      try {
        const updatedLead =
          await toggleLeadTask(
            lead._id,
            taskId
          );

        onTasksUpdated(
          updatedLead
        );
      } catch {
        toast.error(
          "Failed to update task"
        );
      }
    };

  const handleDelete =
    async (taskId) => {
      try {
        const updatedLead =
          await deleteLeadTask(
            lead._id,
            taskId
          );

        onTasksUpdated(
          updatedLead
        );

        toast.success(
          "Task deleted"
        );
      } catch {
        toast.error(
          "Failed to delete task"
        );
      }
    };

  return (
    <div className="mt-10">
      <h4
        className="
        text-lg
        font-semibold
        mb-4
      "
      >
        Follow-Up Tasks
      </h4>

      {/* Add Task */}

      <form
        onSubmit={
          handleAddTask
        }
        className="
        space-y-3
        mb-6
      "
      >
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          className="
          w-full
          border
          border-white/10
          rounded-xl
          px-4
          py-3
          outline-none
          focus:ring-2
          focus:ring-black
        "
        />

        <div
          className="
          grid
          grid-cols-2
          gap-3
        "
        >
          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value
              )
            }
            className="
            border
            border-white/10
            rounded-xl
            px-4
            py-3
          "
          >
            <option value="low">
              Low Priority
            </option>

            <option value="medium">
              Medium Priority
            </option>

            <option value="high">
              High Priority
            </option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(
                e.target.value
              )
            }
            className="
            border
            border-white/10
            rounded-xl
            px-4
            py-3
          "
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
          bg-black
          text-white
          px-5
          py-3
          rounded-xl
          font-medium
        "
        >
          Add Task
        </button>
      </form>

      {/* Tasks List */}

      <div
        className="
        space-y-3
      "
      >
        {lead.tasks?.length >
        0 ? (
          lead.tasks.map(
            (task) => (
              <div
                key={task._id}
                className="
                border
                border-white/10
                rounded-2xl
                p-4
                flex
                items-start
                justify-between
                gap-4
              "
              >
                <div>
                  <div
                    className="
                    flex
                    items-center
                    gap-2
                  "
                  >
                    <button
                      onClick={() =>
                        handleToggle(
                          task._id
                        )
                      }
                    >
                      <CheckCircle2
                        size={20}
                        className={
                          task.completed
                            ? "text-green-500"
                            : "text-slate-300"
                        }
                      />
                    </button>

                    <p
                      className={
                        task.completed
                          ? "line-through text-slate-400"
                          : "font-medium"
                      }
                    >
                      {task.title}
                    </p>
                  </div>

                  <div
                    className="
                    mt-2
                    flex
                    gap-2
                    text-xs
                  "
                  >
                    <span
                      className="
                      bg-white/10
                      px-2
                      py-1
                      rounded-lg
                    "
                    >
                      {
                        task.priority
                      }
                    </span>

                    {task.dueDate && (
                      <span
                        className="
                        bg-white/10
                        px-2
                        py-1
                        rounded-lg
                      "
                      >
                        Due{" "}
                        {new Date(
                          task.dueDate
                        ).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() =>
                    handleDelete(
                      task._id
                    )
                  }
                  className="
                  text-red-500
                "
                >
                  <Trash2
                    size={18}
                  />
                </button>
              </div>
            )
          )
        ) : (
          <div
            className="
            border
            border-dashed
            border-slate-300
            rounded-2xl
            p-6
            text-center
            text-slate-400
          "
          >
            No follow-up tasks yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadTasks;