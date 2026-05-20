import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import {
  FiUser,
  FiMail,
  FiLock,
  FiBook,
  FiUserPlus,
} from "react-icons/fi";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // SEND OTP
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      // Send OTP to Email
      const res = await API.post(
        "/auth/send-otp",
        {
          email: formData.email,
        }
      );

      alert(res.data.message);

      // Store User Data Temporarily
      localStorage.setItem(
        "registerData",
        JSON.stringify(formData)
      );

      // Navigate OTP Page
      navigate("/verify-otp");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to Send OTP"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950/40 to-black px-4 pt-20 pb-10 relative overflow-hidden text-white">

      {/* Floating Animated Orbs */}
      <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full animate-float pointer-events-none"></div>

      <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-cyan-600/20 blur-[120px] rounded-full animate-float-delayed pointer-events-none"></div>

      {/* Register Card */}
      <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-3xl w-full max-w-sm p-6 md:p-8 animate-fade-in-up z-10">

        {/* Heading */}
        <div className="text-center mb-8">

          <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <FiUserPlus className="text-2xl text-white" />
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold mb-2 tracking-tight">
            Create Account
          </h1>

          <p className="text-sm text-gray-300 font-medium">
            Join Campus Lost & Found
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block mb-1.5 text-xs font-semibold text-gray-300">
              Full Name
            </label>

            <div className="relative group">

              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-cyan-400 transition-colors">
                <FiUser className="text-base" />
              </div>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/60 transition-all text-white"
              />
            </div>
          </div>

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
                placeholder="example@university.edu"
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
                type="password"
                name="password"
                placeholder="Create a strong password"
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/60 transition-all text-white"
              />
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="block mb-1.5 text-xs font-semibold text-gray-300">
              Department
            </label>

            <div className="relative group">

              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-cyan-400 transition-colors">
                <FiBook className="text-base" />
              </div>

              <input
                type="text"
                name="department"
                placeholder="CSE / ECE / MBA ..."
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/60 transition-all text-white"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-3 text-sm rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 mt-2 disabled:opacity-60"
          >
            {loading ? "Sending OTP..." : "Register Account"}

            <FiUserPlus className="text-lg" />
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">

          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;