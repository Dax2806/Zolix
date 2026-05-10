import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { getDashboardStats } from "../services/dashboard.service";

const StatCard = ({ label, value }) => {
  return (
    <div className="bg-[#0A0A0F] border border-white/10 rounded-2xl p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
};

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">
        Dashboard
      </h1>

      {loading ? (
        <div>Loading analytics...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatCard label="Total Leads" value={stats.totalLeads} />
          <StatCard label="New Leads" value={stats.newLeads} />
          <StatCard label="Contacted" value={stats.contacted} />
          <StatCard label="Qualified" value={stats.qualified} />
          <StatCard label="Converted" value={stats.converted} />
          <StatCard label="Conversion Rate (%)" value={stats.conversionRate} />
        </div>
      )}
    </DashboardLayout>
  );
};

export default DashboardPage;