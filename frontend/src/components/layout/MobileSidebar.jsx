import {
  X,
} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";

import { navigationItems } from "../../utils/navigation";
import useAuth from "../../hooks/useAuth";

const MobileSidebar = ({
  open,
  setOpen,
}) => {
  const { user } = useAuth();
  return (
    <>
      {/* Overlay */}

      {open && (
        <div
          onClick={() =>
            setOpen(false)
          }
          className="
          fixed
          inset-0
          bg-black/40
          z-40
          lg:hidden
        "
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
        fixed
        top-0
        left-0
        h-screen
        w-72
        bg-white
        z-50
        p-5
        transform
        transition-transform
        duration-300

        ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }

        lg:hidden
      `}
      >
        {/* Top */}

        <div
          className="
          flex
          items-center
          justify-between
          mb-10
        "
        >
          <div>
            <h1
              className="
              text-2xl
              font-bold
            "
            >
              Zolix
            </h1>

            <p
              className="
              text-sm
              text-slate-500
            "
            >
              Operations OS
            </p>
          </div>

          <button
            onClick={() =>
              setOpen(false)
            }
          >
            <X size={22} />
          </button>
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
              const Icon =
                item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() =>
                    setOpen(false)
                  }
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

                    ${
                      isActive
                        ? "bg-black text-white"
                        : "hover:bg-slate-100 text-slate-600"
                    }
                  `
                  }
                >
                  <Icon size={18} />

                  {item.title}
                </NavLink>
              );
            }
          )}
        </nav>
      </aside>
    </>
  );
};

export default MobileSidebar;