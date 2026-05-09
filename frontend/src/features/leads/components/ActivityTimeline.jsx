import {
  CheckCircle2,
  Circle,
  ClipboardList,
  FileText,
  RefreshCw,
  Trash2,
} from "lucide-react";

const activityIcons = {
  created: Circle,
  updated: RefreshCw,
  deleted: Trash2,
  status_changed: RefreshCw,
  note_added: FileText,
  task_created: ClipboardList,
  task_updated: ClipboardList,
  task_completed: CheckCircle2,
  task_reopened: RefreshCw,
  task_deleted: Trash2,
};

const formatActor = (activity) =>
  activity.performedBy?.name ||
  activity.performedBy?.email ||
  "Team member";

const ActivityTimeline = ({
  activities = [],
  loading,
}) => {
  return (
    <div className="mt-10">
      <h4
        className="
        text-lg
        font-semibold
        mb-4
      "
      >
        Activity
      </h4>

      {loading ? (
        <div
          className="
          border
          border-slate-200
          rounded-xl
          p-4
          text-slate-500
        "
        >
          Loading activity...
        </div>
      ) : activities.length === 0 ? (
        <div
          className="
          border
          border-dashed
          border-slate-300
          rounded-xl
          p-5
          text-center
          text-slate-500
        "
        >
          No activity yet.
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map(
            (activity) => {
              const Icon =
                activityIcons[
                  activity.action
                ] || Circle;

              return (
                <div
                  key={activity._id}
                  className="
                  relative
                  pl-9
                  pb-4
                  border-l
                  border-slate-200
                  last:pb-0
                "
                >
                  <span
                    className="
                    absolute
                    -left-4
                    top-0
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    border
                    border-slate-200
                    text-slate-700
                  "
                  >
                    <Icon size={16} />
                  </span>

                  <p className="font-medium">
                    {
                      activity.description
                    }
                  </p>

                  {activity.metadata
                    ?.text && (
                    <p
                      className="
                      mt-1
                      text-sm
                      text-slate-600
                    "
                    >
                      {
                        activity.metadata
                          .text
                      }
                    </p>
                  )}

                  <p
                    className="
                    mt-1
                    text-xs
                    text-slate-500
                  "
                  >
                    {formatActor(
                      activity
                    )}{" "}
                    •{" "}
                    {new Date(
                      activity.createdAt
                    ).toLocaleString()}
                  </p>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityTimeline;
