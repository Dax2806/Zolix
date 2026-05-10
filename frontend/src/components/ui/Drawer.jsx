import {
  X,
} from "lucide-react";

const Drawer = ({
  open,
  onClose,
  title,
  children,
}) => {
  return (
    <>
      {/* Overlay */}

      <div
        className={`
        fixed
        inset-0
        bg-black/40
        backdrop-blur-sm
        z-40
        transition-opacity

        ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }
      `}
        onClick={onClose}
      />

      {/* Drawer */}

      <div
        className={`
        fixed
        top-0
        right-0
        h-screen
        w-full
        sm:w-125
        bg-[#0A0A0F]
        z-50
        border-l
        border-white/10
        shadow-2xl
        transition-transform
        duration-300

        ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }
      `}
      >
        {/* Header */}

        <div
          className="
          flex
          items-center
          justify-between
          p-6
          border-b
          border-white/5
        "
        >
          <h2
            className="
            text-xl
            font-semibold
          "
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
            p-2
            rounded-lg
            hover:bg-white/10
          "
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}

        <div
          className="
          h-[calc(100vh-80px)]
          overflow-y-auto
          p-6
        "
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;