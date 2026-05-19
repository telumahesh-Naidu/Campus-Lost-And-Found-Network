import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Dummy login: no API call required
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Accept any email/password — treat as successful login
      localStorage.setItem("token", "dummy-token");
      localStorage.setItem("userEmail", formData.email || "user@example.com");
      alert("Login Successful ✅ ");
      navigate("/");
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-blue-950/40 to-black px-4 pt-20 pb-10 relative overflow-hidden text-white">

      {/* Floating Animated Orbs */}
      <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full animate-float pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full animate-float-delayed pointer-events-none"></div>

      {/* Login Card */}
      <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-3xl w-full max-w-sm p-6 md:p-8 animate-fade-in-up z-10">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <FiLogIn className="text-2xl text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold mb-2 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-300 font-medium">
            Login to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block mb-1.5 text-xs font-semibold text-gray-300">
              University Email
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-cyan-400 transition-colors">
                <FiMail className="text-base" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="example@college.edu"
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/60 transition-all text-white"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1.5 text-xs font-semibold text-gray-300">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-cyan-400 transition-colors">
                <FiLock className="text-base" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
                className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/60 transition-all text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-2.5 text-gray-400 hover:text-cyan-400 transition-colors"
              >
                {showPassword ? <FiEyeOff className="text-base" /> : <FiEye className="text-base" />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end pt-1">
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 text-sm rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 mt-2"
          >
            <span>Login to Account</span>
            <FiLogIn className="text-lg" />
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
          >
            Create one now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;