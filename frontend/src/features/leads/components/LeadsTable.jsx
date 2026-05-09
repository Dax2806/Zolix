import StatusBadge
  from "../../../components/ui/StatusBadge";

const LeadsTable = ({
  leads,
  onLeadClick,
}) => {
  return (
    <div
      className="
      bg-white
      border
      border-slate-200
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
            bg-slate-50
            border-b
            border-slate-200
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
                border-slate-100
                hover:bg-slate-50
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
                  text-slate-600
                "
                >
                  {lead.email ||
                    "-"}
                </td>

                <td
                  className="
                  p-4
                  text-slate-600
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
                  text-slate-600
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