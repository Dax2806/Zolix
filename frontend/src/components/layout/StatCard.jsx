const StatCard = ({
  title,
  value,
  icon: Icon,
}) => {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      p-6
      border
      border-slate-200
    "
    >
      <div
        className="
        flex
        items-center
        justify-between
      "
      >
        <div>
          <p
            className="
            text-sm
            text-slate-500
          "
          >
            {title}
          </p>

          <h3
            className="
            text-3xl
            font-bold
            mt-2
          "
          >
            {value}
          </h3>
        </div>

        <div
          className="
          w-12
          h-12
          rounded-xl
          bg-slate-100
          flex
          items-center
          justify-center
        "
        >
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;