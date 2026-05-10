import {
  NavLink,
} from "react-router-dom";

import { navigationItems }
  from "../../utils/navigation";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();
  return (
    <aside
      className="
      hidden
      lg:flex
      w-64
      bg-white
      border-r
      border-slate-200
      h-screen
      fixed
      left-0
      top-0
      p-5
      flex-col
    "
    >
      {/* Brand */}

      <div className="mb-10">
        <h1
          className="
          text-2xl
          font-bold
          tracking-tight
        "
        >
          Zolix
        </h1>

        <p
          className="
          text-sm
          text-slate-500
          mt-1
        "
        >
          Simplify operations
        </p>
      </div>

      {/* Nav */}

      <nav
        className="
        flex
        flex-col
        gap-2
      "
      >
        {navigationItems.filter((item) => !item.allowedRoles || item.allowedRoles.includes(user?.role)).map(
          (item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({
                  isActive,
                }) =>
                  `
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  transition-all

                  ${
                    isActive
                      ? "bg-black text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }
                `
                }
              >
                <Icon size={18} />

                <span
                  className="
                  font-medium
                "
                >
                  {item.title}
                </span>
              </NavLink>
            );
          }
        )}
      </nav>

      {/* Bottom */}

      <div className="mt-auto">
        <div
          className="
          rounded-2xl
          bg-slate-100
          p-4
        "
        >
          <h3
            className="
            font-semibold
            text-sm
          "
          >
            Zolix Pro
          </h3>

          <p
            className="
            text-xs
            text-slate-500
            mt-1
          "
          >
            AI automation features
            coming soon.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;