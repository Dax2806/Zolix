import {
  useState,
} from "react";

import toast
  from "react-hot-toast";

import {
  updateLeadStatus,
} from "../services/lead.service";

const LeadStatusManager = ({
  lead,
  onStatusUpdated,
}) => {
  const [loading, setLoading] =
    useState(false);

  const handleChange =
    async (e) => {
      try {
        setLoading(true);

        const updatedLead =
          await updateLeadStatus(
            lead._id,
            e.target.value
          );

        onStatusUpdated(
          updatedLead
        );

        toast.success(
          "Status updated"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="mt-6">
      <label
        className="
        text-sm
        font-medium
        block
        mb-2
      "
      >
        Lead Status
      </label>

      <select
        value={lead.status}
        onChange={
          handleChange
        }
        disabled={loading}
        className="
        w-full
        border
        border-slate-200
        rounded-xl
        px-4
        py-3
        outline-none
        focus:ring-2
        focus:ring-black
      "
      >
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
  );
};

export default LeadStatusManager;