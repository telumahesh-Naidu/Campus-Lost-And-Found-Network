import { Link, useLocation } from "react-router-dom";
import { FiHome, FiLogIn, FiUserPlus, FiPlusCircle } from "react-icons/fi";

function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 group">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition duration-300"></div>
            <img
              src="/logo.png"
              alt="Logo"
              className="relative w-14 h-14 rounded-2xl shadow-lg object-cover bg-white p-1 transform group-hover:scale-105 transition duration-300"
            />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Lost<span className="text-cyan-400"> & </span>Found
            </h1>
            <p className="text-[10px] text-cyan-400/80 tracking-[0.3em] uppercase font-semibold">
              Campus Network
            </p>
          </div>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
          
          <Link
            to="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
              isActive("/") 
                ? "bg-white/10 text-cyan-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" 
                : "text-gray-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <FiHome className="text-lg" />
            Home
          </Link>

          <Link
            to="/login"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
              isActive("/login") 
                ? "bg-white/10 text-cyan-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" 
                : "text-gray-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <FiLogIn className="text-lg" />
            Login
          </Link>

          <Link
            to="/register"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
              isActive("/register") 
                ? "bg-white/10 text-cyan-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" 
                : "text-gray-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <FiUserPlus className="text-lg" />
            Register
          </Link>

          <Link
            to="/post-item"
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-2.5 rounded-full font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-300 hover:-translate-y-0.5 ml-2"
          >
            <FiPlusCircle className="text-xl" />
            Post Item
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;