const PageHeader = ({
  title,
  description,
  action,
}) => {
  return (
    <div
      className="
      flex
      flex-col
      sm:flex-row
      sm:items-center
      sm:justify-between
      gap-4
      mb-8
    "
    >
      <div>
        <h1
          className="
          text-3xl
          font-bold
          tracking-tight
        "
        >
          {title}
        </h1>

        <p
          className="
          text-slate-500
          mt-2
        "
        >
          {description}
        </p>
      </div>

      {action}
    </div>
  );
};

export default PageHeader;