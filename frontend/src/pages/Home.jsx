import { useEffect, useState } from "react";
import API from "../services/api";
import ItemCard from "../components/ItemCard";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { FiPlusCircle, FiAlertTriangle, FiSearch } from "react-icons/fi";

function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await API.get("/items/all");
      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/40 to-black text-white overflow-hidden relative">

      {/* Background Glow with Animations */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full animate-float pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 blur-[150px] rounded-full animate-float-delayed pointer-events-none"></div>
      <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full animate-float pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 animate-fade-in-up z-10">

        <div className="max-w-7xl mx-auto text-center">

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-6">
            Campus
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent inline-block animate-fade-in-up-delay-1 px-3">
              Lost & Found
            </span>
            Network
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delay-1 mb-12">
            A smart, secure, and intuitive platform helping students reconnect
            with their lost belongings across the campus quickly and safely.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-14 animate-fade-in-up-delay-2 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative">
              <SearchBar
                search={search}
                setSearch={setSearch}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-6 animate-fade-in-up-delay-2">
            <Link
              to="/post-item"
              className="group relative flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-300 hover:-translate-y-1"
            >
              <FiPlusCircle className="text-2xl group-hover:rotate-90 transition-transform duration-300" />
              <span>Post Found Item</span>
            </Link>

            <Link
              to="/report-lost"
              className="group flex items-center gap-3 border-2 border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              <FiAlertTriangle className="text-xl text-amber-400 group-hover:scale-110 transition-transform duration-300" />
              <span>Report Lost Item</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Recently Added Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 z-10 animate-fade-in-up-delay-2">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-5 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Recently Added Items
            </h2>
            <p className="text-cyan-400/80 mt-2 font-medium tracking-wide text-sm uppercase">
              Browse the latest lost and found items
            </p>
          </div>

          <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2.5 rounded-full transition-all duration-300 hover:border-white/20 text-sm font-semibold">
            View All Collection
          </button>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-20 text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                <FiSearch className="text-4xl text-cyan-400 opacity-80" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">
                No Items Found
              </h3>
              <p className="text-gray-400 max-w-md mx-auto">
                We couldn't find any items matching your current search criteria. Try adjusting your keywords.
              </p>
            </div>
          </div>
        ) : (
          /* Items Grid */
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item, index) => (
              <div
                key={item._id}
                className="transform hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.2)]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ItemCard item={item} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-black/50 backdrop-blur-xl py-12 mt-20 z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-extrabold tracking-tight">
              Lost<span className="text-cyan-400"> & </span>Found
            </h2>
            <p className="mt-2 text-gray-400 text-sm">
              Making campuses smarter, safer, and more connected.
            </p>
          </div>
          <p className="text-sm text-gray-500 font-medium">
            © 2026 Campus Lost & Found Network. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;