import { Menu } from "lucide-react";

import useAuth
  from "../../hooks/useAuth";

import NotificationBell
  from "./NotificationBell";

const Header = ({
  setSidebarOpen,
}) => {
  const { user } = useAuth();

  return (
    <header
      className="
      sticky
      top-0
      z-30
      h-16
      bg-white/90
      backdrop-blur
      border-b
      border-slate-200
      px-4
      lg:px-8
      flex
      items-center
      justify-between
    "
    >
      {/* Left */}

      <div
        className="
        flex
        items-center
        gap-4
      "
      >
        <button
          onClick={() =>
            setSidebarOpen(true)
          }
          className="
          lg:hidden
        "
        >
          <Menu size={22} />
        </button>

        <div>
          <h2
            className="
            text-lg
            font-semibold
          "
          >
            Welcome back 👋
          </h2>

          <p
            className="
            text-sm
            text-slate-500
            hidden
            sm:block
          "
          >
            Manage your operations
          </p>
        </div>
      </div>

      {/* Right */}

      <div
        className="
        flex
        items-center
        gap-4
      "
      >
        <NotificationBell />

        {/* Avatar */}

        <div
          className="
          w-10
          h-10
          rounded-full
          bg-black
          text-white
          flex
          items-center
          justify-center
          font-semibold
        "
        >
          {user?.name?.charAt(0)}
        </div>
      </div>
    </header>
  );
};

export default Header;
