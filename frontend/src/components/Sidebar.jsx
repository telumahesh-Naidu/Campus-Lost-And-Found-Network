import { Link, useLocation } from "react-router-dom";
import { FiHome, FiSearch, FiAlertTriangle, FiPlusCircle, FiList } from "react-icons/fi";

function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { name: "Home", path: "/", icon: <FiHome className="text-xl" /> },
    { name: "All Items", path: "/items", icon: <FiList className="text-xl" /> },
    { name: "Report Lost Item", path: "/report-lost", icon: <FiAlertTriangle className="text-xl text-amber-400" /> },
    { name: "Post Found Item", path: "/post-item", icon: <FiPlusCircle className="text-xl text-cyan-400" /> },
  ];

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 bg-slate-950/80 backdrop-blur-xl border-r border-white/10 pt-24 z-40 shadow-[4px_0_30px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col gap-2 px-4 py-6">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-4">Menu</h3>
        
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-semibold text-sm ${
              isActive(item.path)
                ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
      
      {/* Glow Effects inside Sidebar */}
      <div className="absolute bottom-10 left-[-50px] w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none"></div>
    </aside>
  );
}

export default Sidebar;
