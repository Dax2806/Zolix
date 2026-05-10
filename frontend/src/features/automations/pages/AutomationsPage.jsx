import {
  useEffect,
  useState,
} from "react";

import {
  Play,
  Trash2,
  Workflow,
} from "lucide-react";

import toast from "react-hot-toast";

import DashboardLayout from "../../../layouts/DashboardLayout";
import PageHeader from "../../../components/layout/PageHeader";
import {
  createAutomation,
  deleteAutomation,
  getAutomations,
  updateAutomation,
} from "../services/automation.service";

const statuses = [
  "",
  "new",
  "contacted",
  "qualified",
  "converted",
  "lost",
];

const AutomationsPage = () => {
  const [
    automations,
    setAutomations,
  ] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [formData, setFormData] =
    useState({
      name: "",
      fromStatus: "",
      toStatus: "qualified",
      actionType: "create_task",
      title: "",
      priority: "medium",
      dueInDays: 1,
      emailSubject: "",
      emailBody: "Hi {{leadName}},\n\n",
    });

  const fetchAutomations =
    async () => {
      try {
        setLoading(true);
        const data =
          await getAutomations();
        setAutomations(data);
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to load automations"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchAutomations();
  }, []);

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

    try {
      const actionConfig = formData.actionType === "create_task" 
        ? {
            title: formData.title,
            priority: formData.priority,
            dueInDays: Number(formData.dueInDays),
          }
        : {
            emailSubject: formData.emailSubject,
            emailBody: formData.emailBody,
          };

      const automation =
        await createAutomation({
          name: formData.name,
          trigger:
            "lead_status_changed",
          conditions: {
            fromStatus:
              formData.fromStatus,
            toStatus:
              formData.toStatus,
          },
          action: formData.actionType,
          actionConfig,
          isActive: true,
        });

      setAutomations((current) => [
        automation,
        ...current,
      ]);
      setFormData({
        name: "",
        fromStatus: "",
        toStatus: "qualified",
        actionType: "create_task",
        title: "",
        priority: "medium",
        dueInDays: 1,
        emailSubject: "",
        emailBody: "Hi {{leadName}},\n\n",
      });
      toast.success(
        "Automation created"
      );
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed to create automation"
      );
    }
  };

  const handleToggle =
    async (automation) => {
      try {
        const updated =
          await updateAutomation(
            automation._id,
            {
              isActive:
                !automation.isActive,
            }
          );

        setAutomations((current) =>
          current.map((item) =>
            item._id ===
            automation._id
              ? updated
              : item
          )
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to update automation"
        );
      }
    };

  const handleDelete = async (id) => {
    try {
      await deleteAutomation(id);
      setAutomations((current) =>
        current.filter(
          (automation) =>
            automation._id !== id
        )
      );
      toast.success(
        "Automation deleted"
      );
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed to delete automation"
      );
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Automations"
        description="Create simple rules that move work forward automatically"
      />

      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-[380px_1fr]
        gap-6
      "
      >
        <section className="bg-[#0A0A0F] border border-white/10 rounded-2xl p-6 h-fit">
          <div className="flex items-center gap-2">
            <Workflow size={20} />
            <h2 className="text-lg font-semibold">
              New Rule
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-5 space-y-4"
          >
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Qualified lead follow-up"
              className="w-full border border-white/10 rounded-xl px-4 py-3"
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <select
                name="fromStatus"
                value={
                  formData.fromStatus
                }
                onChange={handleChange}
                className="border border-white/10 rounded-xl px-4 py-3"
              >
                {statuses.map(
                  (status) => (
                    <option
                      key={
                        status || "any"
                      }
                      value={status}
                    >
                      {status ||
                        "Any from"}
                    </option>
                  )
                )}
              </select>

              <select
                name="toStatus"
                value={
                  formData.toStatus
                }
                onChange={handleChange}
                className="border border-white/10 rounded-xl px-4 py-3"
                required
              >
                {statuses
                  .filter(Boolean)
                  .map((status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  ))}
              </select>
            </div>

            <select
              name="actionType"
              value={formData.actionType}
              onChange={handleChange}
              className="w-full border border-white/10 rounded-xl px-4 py-3"
            >
              <option value="create_task">Create Task</option>
              <option value="send_email">Send Email</option>
            </select>

            {formData.actionType === "create_task" ? (
              <>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Task to create"
                  className="w-full border border-white/10 rounded-xl px-4 py-3"
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="border border-white/10 rounded-xl px-4 py-3"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <input
                    type="number"
                    min="0"
                    name="dueInDays"
                    value={formData.dueInDays}
                    onChange={handleChange}
                    className="border border-white/10 rounded-xl px-4 py-3"
                  />
                </div>
              </>
            ) : (
              <>
                <input
                  name="emailSubject"
                  value={formData.emailSubject}
                  onChange={handleChange}
                  placeholder="Email Subject"
                  className="w-full border border-white/10 rounded-xl px-4 py-3"
                  required
                />
                <textarea
                  name="emailBody"
                  value={formData.emailBody}
                  onChange={handleChange}
                  placeholder="Email Body (use {{leadName}} for their name)"
                  rows={4}
                  className="w-full border border-white/10 rounded-xl px-4 py-3 resize-none"
                  required
                />
              </>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-xl font-medium"
            >
              <Play size={18} />
              Create Rule
            </button>
          </form>
        </section>

        <section className="bg-[#0A0A0F] border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-white/10">
            <h2 className="text-lg font-semibold">
              Active Workflow Rules
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-slate-400">
              Loading automations...
            </div>
          ) : automations.length ===
            0 ? (
            <div className="p-8 text-center text-slate-400">
              No automations yet.
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {automations.map(
                (automation) => (
                  <div
                    key={automation._id}
                    className="p-5 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`
                          h-2
                          w-2
                          rounded-full
                          ${
                            automation.isActive
                              ? "bg-emerald-500"
                              : "bg-slate-300"
                          }
                        `}
                        />
                        <h3 className="font-semibold">
                          {
                            automation.name
                          }
                        </h3>
                      </div>
                      <p className="mt-2 text-sm text-slate-400">
                        When status changes{" "}
                        {automation.conditions?.fromStatus ? `from ${automation.conditions.fromStatus} ` : ""}
                        to {automation.conditions?.toStatus}, 
                        {automation.action === "create_task" 
                          ? ` create task "${automation.actionConfig.title}".` 
                          : ` send email "${automation.actionConfig.emailSubject}".`}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          handleToggle(
                            automation
                          )
                        }
                        className="px-3 py-2 rounded-xl border border-white/10 text-sm"
                      >
                        {automation.isActive
                          ? "Pause"
                          : "Activate"}
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            automation._id
                          )
                        }
                        className="p-2 rounded-xl text-red-500 hover:bg-red-500/10"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default AutomationsPage;
