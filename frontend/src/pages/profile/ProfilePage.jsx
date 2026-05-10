import { LogOut, User, Mail, Shield, Building2, Key } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import DashboardLayout from "../../components/layout/DashboardLayout";

const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Your Profile</h1>
          <p className="text-slate-400 mt-1">Manage your account settings and preferences.</p>
        </div>

        {/* Profile Header Card */}
        <div className="bg-[#0A0A0F] rounded-2xl border border-white/10/60 shadow-[0_0_15px_rgba(0,0,0,0.5)] p-6 sm:p-10 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-10"></div>
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-4xl shadow-xl shadow-indigo-500/30 ring-4 ring-white">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold text-white">{user?.name}</h2>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-sm font-medium border border-indigo-500/20">
                  <Shield size={14} />
                  <span className="capitalize">{user?.role}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#030014] text-slate-400 text-sm font-medium border border-white/10">
                  <Mail size={14} />
                  {user?.email}
                </span>
              </div>
            </div>

            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-100 font-medium transition-colors border border-red-500/20"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-[#0A0A0F] rounded-2xl border border-white/10/60 shadow-[0_0_15px_rgba(0,0,0,0.5)] p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <User className="text-indigo-500" size={20} />
              Personal Information
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-slate-400">Full Name</label>
                <div className="mt-1.5 font-medium text-white bg-[#030014] px-4 py-3 rounded-xl border border-white/5">{user?.name}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-400">Email Address</label>
                <div className="mt-1.5 font-medium text-white bg-[#030014] px-4 py-3 rounded-xl border border-white/5">{user?.email}</div>
              </div>
            </div>
          </div>

          <div className="bg-[#0A0A0F] rounded-2xl border border-white/10/60 shadow-[0_0_15px_rgba(0,0,0,0.5)] p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Building2 className="text-purple-500" size={20} />
              Workspace Details
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-slate-400">Workspace ID</label>
                <div className="mt-1.5 font-mono text-sm text-white bg-[#030014] px-4 py-3 rounded-xl border border-white/5 flex items-center gap-2">
                  <Key size={14} className="text-slate-400" />
                  {user?.tenantId}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-400">Account Role</label>
                <div className="mt-1.5 font-medium text-white bg-[#030014] px-4 py-3 rounded-xl border border-white/5 capitalize">{user?.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
