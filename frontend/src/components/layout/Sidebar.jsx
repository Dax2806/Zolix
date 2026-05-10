import { NavLink } from "react-router-dom";
import { Zap } from "lucide-react";
import { navigationItems } from "../../utils/navigation";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();
  
  return (
    <aside className="hidden lg:flex w-64 bg-white/60 backdrop-blur-2xl border-r border-slate-200/50 h-screen fixed left-0 top-0 p-6 flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {/* Brand */}
      <div className="mb-10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Zolix</h1>
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Workspace</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1.5 flex-1">
        {navigationItems
          .filter((item) => !item.allowedRoles || item.allowedRoles.includes(user?.role))
          .map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                    isActive
                      ? "text-indigo-600 bg-indigo-50/80 font-medium shadow-sm border border-indigo-100/50"
                      : "text-slate-600 hover:bg-white hover:shadow-sm hover:text-slate-900 font-medium"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full shadow-[0_0_8px_rgba(79,70,229,0.8)]" />
                    )}
                    <Icon size={18} className={`transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                    <span>{item.title}</span>
                  </>
                )}
              </NavLink>
            );
          })}
      </nav>

      {/* Bottom */}
      <div className="mt-auto pt-6 border-t border-slate-200/50">
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 shadow-xl relative overflow-hidden group hover:shadow-indigo-500/20 transition-all duration-300">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <h3 className="font-semibold text-sm text-white mb-1">Zolix Pro</h3>
          <p className="text-xs text-slate-400 mb-3">Unlock AI automations</p>
          <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg transition-colors backdrop-blur-sm">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;