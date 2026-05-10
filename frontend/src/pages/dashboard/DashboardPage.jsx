import {
  useEffect,
  useState,
} from "react";

import {
  Users,
  CheckSquare,
  AlertTriangle,
  Target,
} from "lucide-react";

import DashboardLayout
  from "../../layouts/DashboardLayout";

import PageHeader
  from "../../components/layout/PageHeader";

import StatCard
  from "../../components/layout/StatCard";

import {
  getDashboardStats,
  getRecentActivities,
} from "../../services/dashboard.service";

const DashboardPage = () => {
  const [stats, setStats] =
    useState(null);

  const [activities, setActivities] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchDashboardData =
      async () => {
        try {
          const statsData =
            await getDashboardStats();

          const activityData =
            await getRecentActivities();

          setStats(statsData);

          setActivities(activityData);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div>Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}

      <PageHeader
        title="Dashboard"
        description="Overview of your business operations"
      />

      {/* Stats Grid */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-6
      "
      >
        <StatCard
          title="Total Leads"
          value={
            stats?.leads
              ?.totalLeads || 0
          }
          icon={Users}
        />

        <StatCard
          title="Converted Leads"
          value={
            stats?.leads
              ?.convertedLeads || 0
          }
          icon={Target}
        />

        <StatCard
          title="Pending Tasks"
          value={
            stats?.tasks
              ?.pendingTasks || 0
          }
          icon={CheckSquare}
        />

        <StatCard
          title="Overdue Tasks"
          value={
            stats?.tasks
              ?.overdueTasks || 0
          }
          icon={AlertTriangle}
        />
      </div>

      {/* Bottom Section */}

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
        mt-8
      "
      >
        {/* Activity Feed */}

        <div
          className="
          xl:col-span-2
          bg-[#0A0A0F]
          border
          border-white/10
          rounded-2xl
          p-6
        "
        >
          <div
            className="
            flex
            items-center
            justify-between
            mb-6
          "
          >
            <h2
              className="
              text-xl
              font-semibold
            "
            >
              Recent Activity
            </h2>
          </div>

          <div
            className="
            space-y-4
          "
          >
            {activities.length === 0 ? (
              <p
                className="
                text-slate-400
              "
              >
                No recent activity
              </p>
            ) : (
              activities.map(
                (activity) => (
                  <div
                    key={activity._id}
                    className="
                    flex
                    items-start
                    justify-between
                    border-b
                    border-white/5
                    pb-4
                  "
                  >
                    <div>
                      <p
                        className="
                        font-medium
                      "
                      >
                        {
                          activity.description
                        }
                      </p>

                      <p
                        className="
                        text-sm
                        text-slate-400
                        mt-1
                      "
                      >
                        {
                          activity
                            ?.performedBy
                            ?.name
                        }
                      </p>
                    </div>

                    <span
                      className="
                      text-xs
                      text-slate-400
                    "
                    >
                      {
                        new Date(
                          activity.createdAt
                        ).toLocaleDateString()
                      }
                    </span>
                  </div>
                )
              )
            )}
          </div>
        </div>

        {/* Quick Insights */}

        <div
          className="
          bg-[#0A0A0F]
          border
          border-white/10
          rounded-2xl
          p-6
        "
        >
          <h2
            className="
            text-xl
            font-semibold
            mb-6
          "
          >
            Quick Insights
          </h2>

          <div
            className="
            space-y-4
          "
          >
            <div
              className="
              p-4
              rounded-xl
              bg-white/10
            "
            >
              <p
                className="
                text-sm
                text-slate-400
              "
              >
                Conversion Rate
              </p>

              <h3
                className="
                text-2xl
                font-bold
                mt-2
              "
              >
                24%
              </h3>
            </div>

            <div
              className="
              p-4
              rounded-xl
              bg-white/10
            "
            >
              <p
                className="
                text-sm
                text-slate-400
              "
              >
                Active Tasks
              </p>

              <h3
                className="
                text-2xl
                font-bold
                mt-2
              "
              >
                {
                  stats?.tasks
                    ?.pendingTasks || 0
                }
              </h3>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;