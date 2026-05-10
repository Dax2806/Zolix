import {
  Search,
} from "lucide-react";

const LeadsToolbar = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div
      className="
      bg-[#0A0A0F]
      border
      border-white/10
      rounded-2xl
      p-4
      mb-6
      flex
      flex-col
      lg:flex-row
      gap-4
      lg:items-center
      lg:justify-between
    "
    >
      {/* Search */}

      <div
        className="
        relative
        w-full
        lg:max-w-md
      "
      >
        <Search
          size={18}
          className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-400
        "
        />

        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
          w-full
          border
          border-white/10
          rounded-xl
          pl-11
          pr-4
          py-3
          outline-none
          focus:ring-2
          focus:ring-black
        "
        />
      </div>

      {/* Filters */}

      <div
        className="
        flex
        gap-3
      "
      >
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="
          border
          border-white/10
          rounded-xl
          px-4
          py-3
          outline-none
          focus:ring-2
          focus:ring-black
        "
        >
          <option value="">
            All Status
          </option>

          <option value="new">
            New
          </option>

          <option value="contacted">
            Contacted
          </option>

          <option value="qualified">
            Qualified
          </option>

          <option value="converted">
            Converted
          </option>

          <option value="lost">
            Lost
          </option>
        </select>
      </div>
    </div>
  );
};

export default LeadsToolbar;