import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
} from "lucide-react";

import toast from "react-hot-toast";

import DashboardLayout from "../../../layouts/DashboardLayout";
import PageHeader from "../../../components/layout/PageHeader";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../services/task.service";

const statusOptions = [
  "pending",
  "in_progress",
  "completed",
];

const priorityStyles = {
  low: "bg-emerald-50 text-emerald-700",
  medium: "bg-amber-50 text-amber-700",
  high: "bg-red-50 text-red-700",
};

const TasksPage = () => {
  const [tasks, setTasks] =
    useState([]);
  const [loading, setLoading] =
    useState(true);
  const [status, setStatus] =
    useState("");
  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
    });

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks(
        status ? { status } : {}
      );
      setTasks(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load tasks"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [status]);

  const taskStats = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        acc.total += 1;
        acc[task.status] =
          (acc[task.status] || 0) + 1;
        return acc;
      },
      {
        total: 0,
        pending: 0,
        in_progress: 0,
        completed: 0,
      }
    );
  }, [tasks]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.value,
    });
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.dueDate
    ) {
      toast.error(
        "Title and due date are required"
      );
      return;
    }

    try {
      const task = await createTask(
        formData
      );

      setTasks((current) => [
        task,
        ...current,
      ]);

      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
      });

      toast.success("Task created");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create task"
      );
    }
  };

  const handleStatusChange =
    async (task, nextStatus) => {
      try {
        const updatedTask =
          await updateTask(task._id, {
            status: nextStatus,
          });

        setTasks((current) =>
          current.map((item) =>
            item._id === task._id
              ? updatedTask
              : item
          )
        );
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to update task"
        );
      }
    };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((current) =>
        current.filter(
          (task) => task._id !== id
        )
      );
      toast.success("Task deleted");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete task"
      );
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Tasks"
        description="Plan, assign, and complete follow-ups"
      />

      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-[360px_1fr]
        gap-6
      "
      >
        <section
          className="
          bg-white
          border
          border-slate-200
          rounded-2xl
          p-6
          h-fit
        "
        >
          <h2 className="text-lg font-semibold">
            New Task
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-5 space-y-4"
          >
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Follow up with lead"
              className="
              w-full
              border
              border-slate-200
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-black
            "
            />

            <textarea
              name="description"
              value={
                formData.description
              }
              onChange={handleChange}
              placeholder="Details"
              rows={4}
              className="
              w-full
              border
              border-slate-200
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-black
              resize-none
            "
            />

            <div className="grid grid-cols-2 gap-3">
              <select
                name="priority"
                value={
                  formData.priority
                }
                onChange={handleChange}
                className="
                border
                border-slate-200
                rounded-xl
                px-4
                py-3
              "
              >
                <option value="low">
                  Low
                </option>
                <option value="medium">
                  Medium
                </option>
                <option value="high">
                  High
                </option>
              </select>

              <input
                type="date"
                name="dueDate"
                value={
                  formData.dueDate
                }
                onChange={handleChange}
                className="
                border
                border-slate-200
                rounded-xl
                px-4
                py-3
              "
            />
            </div>

            <button
              type="submit"
              className="
              inline-flex
              items-center
              justify-center
              gap-2
              w-full
              bg-black
              text-white
              px-5
              py-3
              rounded-xl
              font-medium
            "
            >
              <Plus size={18} />
              Create Task
            </button>
          </form>
        </section>

        <section>
          <div
            className="
            grid
            grid-cols-2
            xl:grid-cols-4
            gap-4
            mb-6
          "
          >
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <p className="text-sm text-slate-500">
                Total
              </p>
              <p className="text-2xl font-bold mt-1">
                {taskStats.total}
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <p className="text-sm text-slate-500">
                Pending
              </p>
              <p className="text-2xl font-bold mt-1">
                {taskStats.pending}
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <p className="text-sm text-slate-500">
                In Progress
              </p>
              <p className="text-2xl font-bold mt-1">
                {
                  taskStats.in_progress
                }
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <p className="text-sm text-slate-500">
                Completed
              </p>
              <p className="text-2xl font-bold mt-1">
                {
                  taskStats.completed
                }
              </p>
            </div>
          </div>

          <div
            className="
            bg-white
            border
            border-slate-200
            rounded-2xl
            overflow-hidden
          "
          >
            <div
              className="
              p-5
              border-b
              border-slate-200
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-3
            "
            >
              <h2 className="text-lg font-semibold">
                Task List
              </h2>

              <select
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target.value
                  )
                }
                className="
                border
                border-slate-200
                rounded-xl
                px-4
                py-2
              "
              >
                <option value="">
                  All statuses
                </option>
                {statusOptions.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option.replace(
                        "_",
                        " "
                      )}
                    </option>
                  )
                )}
              </select>
            </div>

            {loading ? (
              <div className="p-8 text-slate-500">
                Loading tasks...
              </div>
            ) : tasks.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                No tasks found.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {tasks.map((task) => (
                  <div
                    key={task._id}
                    className="
                    p-5
                    flex
                    flex-col
                    xl:flex-row
                    xl:items-center
                    xl:justify-between
                    gap-4
                  "
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <CheckCircle2
                          size={20}
                          className={
                            task.status ===
                            "completed"
                              ? "text-emerald-500"
                              : "text-slate-300"
                          }
                        />
                        <h3 className="font-semibold">
                          {task.title}
                        </h3>
                      </div>

                      {task.description && (
                        <p className="mt-2 text-sm text-slate-600">
                          {
                            task.description
                          }
                        </p>
                      )}

                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <span
                          className={`
                          px-2
                          py-1
                          rounded-lg
                          ${
                            priorityStyles[
                              task.priority
                            ]
                          }
                        `}
                        >
                          {task.priority}
                        </span>

                        <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg">
                          <Clock size={13} />
                          {new Date(
                            task.dueDate
                          ).toLocaleDateString()}
                        </span>

                        {task.leadId?.name && (
                          <span className="bg-slate-100 px-2 py-1 rounded-lg">
                            {
                              task.leadId
                                .name
                            }
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={task.status}
                        onChange={(event) =>
                          handleStatusChange(
                            task,
                            event.target.value
                          )
                        }
                        className="
                        border
                        border-slate-200
                        rounded-xl
                        px-3
                        py-2
                        capitalize
                      "
                      >
                        {statusOptions.map(
                          (option) => (
                            <option
                              key={option}
                              value={option}
                            >
                              {option.replace(
                                "_",
                                " "
                              )}
                            </option>
                          )
                        )}
                      </select>

                      <button
                        onClick={() =>
                          handleDelete(
                            task._id
                          )
                        }
                        className="
                        p-2
                        rounded-xl
                        text-red-500
                        hover:bg-red-50
                      "
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default TasksPage;
