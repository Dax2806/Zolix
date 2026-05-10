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
  loginUser,
} from "../../services/auth.service";

import useAuth
  from "../../hooks/useAuth";

const LoginPage = () => {
  const navigate =
    useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

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

        const data =
          await loginUser(
            formData
          );

        login(data);

        toast.success(
          "Login successful"
        );

        navigate("/dashboard");
      } catch (error) {
        toast.error(
          error.message ||
            "Login failed"
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
        {/* Header */}

        <div className="mb-8">
          <h1
            className="
            text-3xl
            font-bold
            tracking-tight
          "
          >
            Welcome back
          </h1>

          <p
            className="
            text-slate-400
            mt-2
          "
          >
            Login to your workspace
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={
            handleSubmit
          }
          className="
          space-y-5
        "
        >
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
              placeholder="Enter your email"
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

          {/* Password */}

          <div>
            <label
              className="
              text-sm
              font-medium
              block
              mb-2
            "
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              placeholder="Enter your password"
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

          {/* Button */}

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
            hover:opacity-90
            transition-all
            disabled:opacity-60
          "
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        {/* Footer */}

        <p
          className="
          text-sm
          text-slate-400
          mt-6
          text-center
        "
        >
          Don’t have an account?{" "}

          <Link
            to="/register"
            className="
            text-white
            font-medium
          "
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;