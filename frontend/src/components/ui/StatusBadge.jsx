import clsx from "clsx";

const statusStyles = {
  new: "bg-blue-100 text-blue-700",

  contacted:
    "bg-yellow-100 text-yellow-700",

  qualified:
    "bg-purple-100 text-purple-700",

  converted:
    "bg-green-100 text-green-700",

  lost: "bg-red-100 text-red-700",
};

const StatusBadge = ({
  status,
}) => {
  return (
    <span
      className={clsx(
        "px-3 py-1 rounded-full text-xs font-medium capitalize",

        statusStyles[
          status
        ] ||
          "bg-slate-100 text-slate-700"
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;