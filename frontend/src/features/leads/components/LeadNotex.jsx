import {
  useState,
} from "react";

import toast
  from "react-hot-toast";

import {
  addLeadNote,
} from "../services/lead.service";

const LeadNotes = ({
  lead,
  onNoteAdded,
}) => {
  const [note, setNote] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (!note.trim())
        return;

      try {
        setLoading(true);

        const updatedLead =
          await addLeadNote(
            lead._id,
            note
          );

        onNoteAdded(
          updatedLead
        );

        setNote("");

        toast.success(
          "Note added"
        );
      }  finally {
        setLoading(false);
      }
    };

  return (
    <div className="mt-10">
      <h4
        className="
        text-lg
        font-semibold
        mb-4
      "
      >
        Notes
      </h4>

      {/* Form */}

      <form
        onSubmit={
          handleSubmit
        }
        className="
        flex
        flex-col
        gap-3
      "
      >
        <textarea
          rows={4}
          value={note}
          onChange={(e) =>
            setNote(
              e.target.value
            )
          }
          placeholder="Write a note..."
          className="
          border
          border-white/10
          rounded-2xl
          p-4
          outline-none
          focus:ring-2
          focus:ring-black
          resize-none
        "
        />

        <button
          type="submit"
          disabled={loading}
          className="
          self-end
          bg-black
          text-white
          px-5
          py-3
          rounded-xl
          font-medium
          disabled:opacity-60
        "
        >
          {loading
            ? "Saving..."
            : "Add Note"}
        </button>
      </form>

      {/* Notes List */}

      <div
        className="
        mt-6
        space-y-4
      "
      >
        {lead.notes
          ?.length > 0 ? (
          lead.notes.map(
            (
              note,
              index
            ) => (
              <div
                key={index}
                className="
                border
                border-white/10
                rounded-2xl
                p-4
                bg-[#030014]
              "
              >
                <p>
                  {note.text}
                </p>

                <p
                  className="
                  text-xs
                  text-slate-400
                  mt-2
                "
                >
                  {new Date(
                    note.createdAt
                  ).toLocaleString()}
                </p>
              </div>
            )
          )
        ) : (
          <div
            className="
            border
            border-white/10
            rounded-2xl
            p-5
            bg-[#030014]
            text-slate-400
          "
          >
            No notes yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadNotes;