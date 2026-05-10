import {
  useEffect,
  useState,
} from "react";

import {
  ShieldCheck,
  Trash2,
  UserPlus,
} from "lucide-react";

import toast from "react-hot-toast";

import DashboardLayout from "../../../layouts/DashboardLayout";
import PageHeader from "../../../components/layout/PageHeader";
import useAuth from "../../../hooks/useAuth";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../services/team.service";

const roleLabels = {
  owner: "Owner",
  admin: "Admin",
  manager: "Manager",
  staff: "Staff",
};

const TeamPage = () => {
  const { user: currentUser } =
    useAuth();

  const [users, setUsers] =
    useState([]);
  const [loading, setLoading] =
    useState(true);
  const [formData, setFormData] =
    useState({
      email: "",
      role: "staff",
    });

  const [inviteLink, setInviteLink] = useState("");

  const currentUserId =
    currentUser?._id || currentUser?.id;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load team"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
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
      const createdUser =
        await createUser(formData);

      setUsers((current) => [
        createdUser,
        ...current,
      ]);

      setFormData({
        email: "",
        role: "staff",
      });

      if (createdUser.inviteToken) {
        setInviteLink(`${window.location.origin}/invite/${createdUser.inviteToken}`);
      }

      toast.success(
        "Team member added"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add user"
      );
    }
  };

  const handleRoleChange =
    async (member, role) => {
      try {
        const updatedUser =
          await updateUser(
            member._id,
            { role }
          );

        setUsers((current) =>
          current.map((item) =>
            item._id === member._id
              ? updatedUser
              : item
          )
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to update role"
        );
      }
    };

  const handleActiveChange =
    async (member) => {
      try {
        const updatedUser =
          await updateUser(
            member._id,
            {
              isActive:
                !member.isActive,
            }
          );

        setUsers((current) =>
          current.map((item) =>
            item._id === member._id
              ? updatedUser
              : item
          )
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to update user"
        );
      }
    };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers((current) =>
        current.filter(
          (member) => member._id !== id
        )
      );
      toast.success("User removed");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to remove user"
      );
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Team"
        description="Manage workspace users and permissions"
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
          <div className="flex items-center gap-2">
            <UserPlus size={20} />
            <h2 className="text-lg font-semibold">
              Add Member
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-5 space-y-4"
          >
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="
              w-full
              border
              border-slate-200
              rounded-xl
              px-4
              py-3
            "
              required
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="
              w-full
              border
              border-slate-200
              rounded-xl
              px-4
              py-3
            "
            >
              <option value="staff">
                Staff
              </option>
              <option value="manager">
                Manager
              </option>
              <option value="admin">
                Admin
              </option>
            </select>

            <button
              type="submit"
              className="
              w-full
              inline-flex
              items-center
              justify-center
              gap-2
              bg-black
              text-white
              px-5
              py-3
              rounded-xl
              font-medium
            "
            >
              <UserPlus size={18} />
              Invite Member
            </button>
          </form>

          {inviteLink && (
            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <p className="text-sm text-emerald-800 font-medium mb-2">Invitation created successfully!</p>
              <p className="text-xs text-emerald-600 mb-2">An email invitation has been automatically sent to the new member.</p>
              <p className="text-xs text-emerald-600 mt-3 mb-2">If they don't receive it, you can share this link directly:</p>
              <input 
                readOnly 
                value={inviteLink} 
                className="w-full text-xs p-2 rounded border border-emerald-200 bg-white" 
                onClick={(e) => e.target.select()}
              />
            </div>
          )}
        </section>

        <section
          className="
          bg-white
          border
          border-slate-200
          rounded-2xl
          overflow-hidden
        "
        >
          <div className="p-5 border-b border-slate-200 flex items-center gap-2">
            <ShieldCheck size={20} />
            <h2 className="text-lg font-semibold">
              Workspace Access
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-slate-500">
              Loading team...
            </div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No team members yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {users.map((member) => {
                const isSelf =
                  member._id ===
                  currentUserId;

                const locked =
                  member.role ===
                    "owner" || isSelf;

                return (
                  <div
                    key={member._id}
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
                    <div>
                      <div className="flex items-center gap-3">
                        <div
                          className="
                          h-10
                          w-10
                          rounded-full
                          bg-slate-900
                          text-white
                          flex
                          items-center
                          justify-center
                          font-semibold
                        "
                        >
                          {member.name?.[0]}
                        </div>

                        <div>
                          <h3 className="font-semibold">
                            {member.name}
                          </h3>
                          <p className="text-sm text-slate-500">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        ${
                          member.isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }
                      `}
                      >
                        {member.isActive
                          ? "Active"
                          : "Disabled"}
                      </span>

                      <select
                        value={member.role}
                        disabled={locked}
                        onChange={(event) =>
                          handleRoleChange(
                            member,
                            event.target.value
                          )
                        }
                        className="
                        border
                        border-slate-200
                        rounded-xl
                        px-3
                        py-2
                        disabled:bg-slate-50
                      "
                      >
                        {Object.entries(
                          roleLabels
                        ).map(
                          ([
                            value,
                            label,
                          ]) => (
                            <option
                              key={value}
                              value={value}
                            >
                              {label}
                            </option>
                          )
                        )}
                      </select>

                      <button
                        disabled={locked}
                        onClick={() =>
                          handleActiveChange(
                            member
                          )
                        }
                        className="
                        px-3
                        py-2
                        rounded-xl
                        border
                        border-slate-200
                        text-sm
                        disabled:opacity-50
                      "
                      >
                        {member.isActive
                          ? "Disable"
                          : "Enable"}
                      </button>

                      <button
                        disabled={locked}
                        onClick={() =>
                          handleDelete(
                            member._id
                          )
                        }
                        className="
                        p-2
                        rounded-xl
                        text-red-500
                        hover:bg-red-50
                        disabled:opacity-50
                      "
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default TeamPage;
