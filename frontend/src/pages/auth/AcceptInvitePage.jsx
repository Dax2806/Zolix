import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getInviteDetails, acceptInvite } from "../../services/auth.service";

const AcceptInvitePage = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getInviteDetails(token);
        setEmail(data.data.email);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Invalid or expired invitation link.");
        setLoading(false);
      }
    };
    fetchDetails();
  }, [token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await acceptInvite(token, formData);
      toast.success("Account setup complete! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Failed to set up account");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030014]">
        <p className="text-slate-400">Loading invitation details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030014] px-4">
        <div className="w-full max-w-md bg-[#0A0A0F] p-8 rounded-2xl border border-red-500/20 shadow-[0_0_15px_rgba(0,0,0,0.5)] text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-2">Invitation Error</h1>
          <p className="text-slate-400 mb-6">{error}</p>
          <Link to="/login" className="text-white font-medium underline">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030014] px-4">
      <div className="w-full max-w-md bg-[#0A0A0F] p-8 rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight mb-2">Join Workspace</h1>
          <p className="text-slate-400">
            You've been invited as <strong>{email}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium block mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              minLength={6}
              className="w-full border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "Setting up..." : "Complete Setup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AcceptInvitePage;
