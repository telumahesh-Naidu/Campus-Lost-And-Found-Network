import { useEffect, useState } from "react";
import API from "../services/api";
import ItemCard from "../components/ItemCard";
import SearchBar from "../components/SearchBar";
import { FiSearch, FiAlertTriangle } from "react-icons/fi";

function LostItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLostItems();
  }, []);

  const fetchLostItems = async () => {
    try {
      const res = await API.get("/items/lost");
      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950/30 to-black text-white px-6 pt-28 pb-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-red-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-5 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Lost Items
            </h2>
            <p className="text-red-400/80 mt-2 font-medium tracking-wide text-sm uppercase">
              Browse reported lost items on campus
            </p>
          </div>

          <div className="w-full md:w-96 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-orange-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative">
              <SearchBar search={search} setSearch={setSearch} />
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-20 text-center shadow-2xl relative overflow-hidden group mt-10">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                <FiAlertTriangle className="text-4xl text-red-400 opacity-80" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">No Lost Items Found</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                {search ? "We couldn't find any lost items matching your search." : "No lost items have been reported yet."}
              </p>
            </div>
          </div>
        ) : (
          /* Items Grid */
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item, index) => (
              <div
                key={item._id}
                className="transform hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(239,68,68,0.2)]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ItemCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LostItems;
