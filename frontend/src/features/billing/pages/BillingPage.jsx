import {
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";

import {
  CheckCircle2,
} from "lucide-react";

import toast from "react-hot-toast";

import DashboardLayout from "../../../layouts/DashboardLayout";
import PageHeader from "../../../components/layout/PageHeader";
import {
  getBilling,
  createCheckoutSession,
} from "../services/billing.service";

const formatLimit = (limit) =>
  limit === null ? "Unlimited" : limit;

const usageRows = [
  {
    key: "leads",
    label: "Leads",
    limitKey: "leadLimit",
  },
  {
    key: "tasks",
    label: "Tasks",
    limitKey: "taskLimit",
  },
  {
    key: "users",
    label: "Users",
    limitKey: "userLimit",
  },
];

const BillingPage = () => {
  const [billing, setBilling] =
    useState(null);
  const [loading, setLoading] =
    useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Subscription updated successfully!");
      setSearchParams({});
    }
    if (searchParams.get("canceled")) {
      toast.error("Checkout was canceled.");
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  const fetchBilling = async () => {
    try {
      setLoading(true);
      const data = await getBilling();
      setBilling(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load billing"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBilling();
  }, []);

  const handlePlanChange = async (plan) => {
    try {
      setLoading(true);
      const data = await createCheckoutSession(plan);
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to initiate checkout"
      );
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Billing"
        description="Manage plan limits and workspace usage"
      />

      {loading ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-slate-500">
          Loading billing...
        </div>
      ) : (
        <div className="space-y-6">
          <section
            className="
            bg-white
            border
            border-slate-200
            rounded-2xl
            p-6
          "
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">
                  Current Plan
                </p>
                <h2 className="text-2xl font-bold mt-1 capitalize">
                  {billing.tenant.plan}
                </h2>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm capitalize w-fit">
                {billing.tenant.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {usageRows.map((row) => {
                const limit =
                  billing.plan[
                    row.limitKey
                  ];
                const used =
                  billing.usage[
                    row.key
                  ];
                const percent =
                  limit === null
                    ? 12
                    : Math.min(
                        100,
                        Math.round(
                          (used /
                            limit) *
                            100
                        )
                      );

                return (
                  <div
                    key={row.key}
                    className="border border-slate-200 rounded-xl p-4"
                  >
                    <p className="text-sm text-slate-500">
                      {row.label}
                    </p>
                    <p className="text-xl font-semibold mt-1">
                      {used} /{" "}
                      {formatLimit(limit)}
                    </p>
                    <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-black"
                        style={{
                          width: `${percent}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section
            className="
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-5
          "
          >
            {billing.plans.map((plan) => {
              const active =
                billing.tenant.plan ===
                plan.id;

              return (
                <div
                  key={plan.id}
                  className={`
                  bg-white
                  border
                  rounded-2xl
                  p-6
                  ${
                    active
                      ? "border-black"
                      : "border-slate-200"
                  }
                `}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold">
                        {plan.name}
                      </h3>
                      <p className="text-3xl font-bold mt-3">
                        ₹
                        {
                          plan.monthlyPrice
                        }
                        <span className="text-sm font-normal text-slate-500">
                          /mo
                        </span>
                      </p>
                    </div>

                    {active && (
                      <CheckCircle2 className="text-emerald-500" />
                    )}
                  </div>

                  <div className="mt-6 space-y-3 text-sm text-slate-600">
                    <p>
                      {
                        formatLimit(
                          plan.leadLimit
                        )
                      }{" "}
                      leads
                    </p>
                    <p>
                      {
                        formatLimit(
                          plan.taskLimit
                        )
                      }{" "}
                      tasks
                    </p>
                    <p>
                      {
                        formatLimit(
                          plan.userLimit
                        )
                      }{" "}
                      users
                    </p>
                    <p>
                      AI lead insights
                    </p>
                  </div>

                  <button
                    disabled={active}
                    onClick={() =>
                      handlePlanChange(
                        plan.id
                      )
                    }
                    className="
                    mt-6
                    w-full
                    px-5
                    py-3
                    rounded-xl
                    bg-black
                    text-white
                    font-medium
                    disabled:bg-slate-100
                    disabled:text-slate-500
                  "
                  >
                    {active
                      ? "Current Plan"
                      : "Switch Plan"}
                  </button>
                </div>
              );
            })}
          </section>
        </div>
      )}
    </DashboardLayout>
  );
};

export default BillingPage;
