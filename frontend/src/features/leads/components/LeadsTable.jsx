import StatusBadge
  from "../../../components/ui/StatusBadge";

const LeadsTable = ({
  leads,
  onLeadClick,
}) => {
  return (
    <div
      className="
      bg-[#0A0A0F]
      border
      border-white/10
      rounded-2xl
      overflow-hidden
    "
    >
      <div
        className="
        overflow-x-auto
      "
      >
        <table
          className="
          w-full
        "
        >
          <thead
            className="
            bg-[#030014]
            border-b
            border-white/10
          "
          >
            <tr>
              <th
                className="
                text-left
                p-4
                text-sm
                font-semibold
              "
              >
                Name
              </th>

              <th
                className="
                text-left
                p-4
                text-sm
                font-semibold
              "
              >
                Email
              </th>

              <th
                className="
                text-left
                p-4
                text-sm
                font-semibold
              "
              >
                Phone
              </th>

              <th
                className="
                text-left
                p-4
                text-sm
                font-semibold
              "
              >
                Status
              </th>

              <th
                className="
                text-left
                p-4
                text-sm
                font-semibold
              "
              >
                Source
              </th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead._id}
                onClick={() =>
                  onLeadClick(lead)
                }
                className="
                border-b
                border-white/5
                hover:bg-[#030014]
                transition-colors
                cursor-pointer
              "
              >
                <td className="p-4">
                  <div>
                    <p
                      className="
                      font-medium
                    "
                    >
                      {lead.name}
                    </p>
                  </div>
                </td>

                <td
                  className="
                  p-4
                  text-slate-400
                "
                >
                  {lead.email ||
                    "-"}
                </td>

                <td
                  className="
                  p-4
                  text-slate-400
                "
                >
                  {lead.phone ||
                    "-"}
                </td>

                <td className="p-4">
                  <StatusBadge
                    status={
                      lead.status
                    }
                  />
                </td>

                <td
                  className="
                  p-4
                  capitalize
                  text-slate-400
                "
                >
                  {lead.source}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsTable;