import {
  useState,
} from "react";

import toast
  from "react-hot-toast";

import Modal
  from "../../../components/ui/Modal";

import {
  createLead,
} from "../services/lead.service";

const AddLeadModal = ({
  open,
  onClose,
  onLeadCreated,
}) => {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      source: "website",
      status: "new",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const newLead =
          await createLead(
            formData
          );

        toast.success(
          "Lead created successfully"
        );

        onLeadCreated(newLead);

        onClose();

        setFormData({
          name: "",
          email: "",
          phone: "",
          source: "website",
          status: "new",
        });
      } catch (error) {
        toast.error(
          error.message ||
            "Failed to create lead"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add New Lead"
    >
      <form
        onSubmit={
          handleSubmit
        }
        className="
        space-y-5
      "
      >
        {/* Name */}

        <div>
          <label
            className="
            text-sm
            font-medium
            block
            mb-2
          "
          >
            Name
          </label>

          <input
            type="text"
            name="name"
            value={
              formData.name
            }
            onChange={
              handleChange
            }
            placeholder="Lead name"
            className="
            w-full
            border
            border-white/10
            rounded-xl
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-black
          "
            required
          />
        </div>

        {/* Email */}

        <div>
          <label
            className="
            text-sm
            font-medium
            block
            mb-2
          "
          >
            Email
          </label>

          <input
            type="email"
            name="email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            placeholder="Lead email"
            className="
            w-full
            border
            border-white/10
            rounded-xl
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-black
          "
          />
        </div>

        {/* Phone */}

        <div>
          <label
            className="
            text-sm
            font-medium
            block
            mb-2
          "
          >
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={
              formData.phone
            }
            onChange={
              handleChange
            }
            placeholder="Phone number"
            className="
            w-full
            border
            border-white/10
            rounded-xl
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-black
          "
          />
        </div>

        {/* Source */}

        <div>
          <label
            className="
            text-sm
            font-medium
            block
            mb-2
          "
          >
            Source
          </label>

          <select
            name="source"
            value={
              formData.source
            }
            onChange={
              handleChange
            }
            className="
            w-full
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
            <option value="website">
              Website
            </option>

            <option value="whatsapp">
              WhatsApp
            </option>

            <option value="facebook">
              Facebook
            </option>

            <option value="instagram">
              Instagram
            </option>

            <option value="referral">
              Referral
            </option>
          </select>
        </div>

        {/* Footer */}

        <div
          className="
          flex
          justify-end
          gap-3
          pt-4
        "
        >
          <button
            type="button"
            onClick={onClose}
            className="
            px-5
            py-3
            rounded-xl
            border
            border-white/10
            font-medium
          "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="
            px-5
            py-3
            rounded-xl
            bg-black
            text-white
            font-medium
            disabled:opacity-60
          "
          >
            {loading
              ? "Creating..."
              : "Create Lead"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddLeadModal;