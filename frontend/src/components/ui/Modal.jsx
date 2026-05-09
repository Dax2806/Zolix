import {
  X,
} from "lucide-react";

const Modal = ({
  open,
  onClose,
  title,
  children,
}) => {
  if (!open) return null;

  return (
    <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/40
      backdrop-blur-sm
      p-4
    "
    >
      <div
        className="
        w-full
        max-w-lg
        bg-white
        rounded-2xl
        border
        border-slate-200
        shadow-xl
      "
      >
        {/* Header */}

        <div
          className="
          flex
          items-center
          justify-between
          p-6
          border-b
          border-slate-100
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
            hover:bg-slate-100
          "
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;