function SearchBar({ search, setSearch }) {
  return (
    <div className="flex justify-center w-full">
      
      {/* Premium Glass Search Bar */}
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl px-6 py-4 flex items-center gap-4 transition duration-300 hover:scale-[1.01] hover:border-cyan-300">

        {/* Search Icon */}
        <div className="text-cyan-300 text-2xl">
          🔍
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Search lost items, wallets, phones..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent outline-none text-lg text-white placeholder-gray-300"
        />

        {/* Animated Dot */}
        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>

      </div>
    </div>
  );
}

export default SearchBar;