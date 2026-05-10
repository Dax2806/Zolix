import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast
  from "react-hot-toast";

import {
  registerUser,
} from "../../services/auth.service";

const RegisterPage = () => {
  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      businessName: "",
      email: "",
      password: "",
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

        await registerUser(
          formData
        );

        toast.success(
          "Account created successfully"
        );

        navigate("/login");
      } catch (error) {
        toast.error(
          error.message ||
            "Registration failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#030014]
      px-4
    "
    >
      <div
        className="
        w-full
        max-w-md
        bg-[#0A0A0F]
        p-8
        rounded-2xl
        border
        border-white/10
        shadow-[0_0_15px_rgba(0,0,0,0.5)]
      "
      >
        <div className="mb-8">
          <h1
            className="
            text-3xl
            font-bold
          "
          >
            Create account
          </h1>

          <p
            className="
            text-slate-400
            mt-2
          "
          >
            Start managing your business
          </p>
        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="
          space-y-5
        "
        >
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={
              formData.name
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
          "
          />

          <input
            type="text"
            name="businessName"
            placeholder="Business name"
            value={
              formData.businessName
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
          "
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={
              formData.email
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
          "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={
              formData.password
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
          "
          />

          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            bg-black
            text-white
            py-3
            rounded-xl
            font-medium
          "
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>
        </form>

        <p
          className="
          text-sm
          text-center
          text-slate-400
          mt-6
        "
        >
          Already have an account?{" "}

          <Link
            to="/login"
            className="
            text-white
            font-medium
          "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;