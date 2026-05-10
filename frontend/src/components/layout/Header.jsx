import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import NotificationBell from "./NotificationBell";

const Header = ({ setSidebarOpen }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-20 bg-[#0A0A0F]/60 backdrop-blur-2xl border-b border-white/10/50 px-4 lg:px-8 flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 -ml-2 rounded-xl hover:bg-white/10 transition-colors"
        >
          <Menu size={22} className="text-slate-400" />
        </button>

        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            Welcome back <span className="animate-wave origin-bottom-right inline-block">👋</span>
          </h2>
          <p className="text-sm font-medium text-slate-400 hidden sm:block">
            Manage your operations with precision
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <div className="hidden sm:block">
          <NotificationBell />
        </div>

        <div className="h-8 w-px bg-white/20/60 hidden sm:block"></div>

        {/* User Menu Trigger / Avatar */}
        <Link to="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-bold text-white">{user?.name}</span>
            <span className="text-xs font-medium text-slate-400 capitalize">{user?.role}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-indigo-500/20 ring-2 ring-white">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
