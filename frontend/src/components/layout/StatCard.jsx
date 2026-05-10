const StatCard = ({
  title,
  value,
  icon: Icon,
}) => {
  return (
    <div
      className="
      bg-[#0A0A0F]
      rounded-2xl
      p-6
      border
      border-white/10
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
            text-slate-400
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
          bg-white/10
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