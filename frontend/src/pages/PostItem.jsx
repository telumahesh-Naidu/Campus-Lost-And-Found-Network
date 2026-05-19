import { useState } from "react";
import API from "../services/api";
import { FiImage, FiType, FiAlignLeft, FiTag, FiMapPin, FiCalendar, FiPlusCircle, FiList } from "react-icons/fi";

function PostItem() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "lost",
    category: "",
    location: "",
    date: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];

      setFormData({
        ...formData,
        image: file,
      });

      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("type", formData.type);
      data.append("category", formData.category);
      data.append("location", formData.location);
      data.append("date", formData.date);
      data.append("image", formData.image);

      const res = await API.post("/items/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message || "Item Posted Successfully ✅");

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/40 to-black flex items-center justify-center px-4 py-28 relative overflow-hidden text-white">

      {/* Glow Effects */}
      <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full animate-float pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full animate-float-delayed pointer-events-none"></div>

      {/* Form Card */}
      <div className="relative w-full max-w-2xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-8 md:p-10 animate-fade-in-up z-10">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <FiPlusCircle className="text-3xl text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">
            Post Found Item
          </h1>
          <p className="text-gray-400 font-medium">
            Help return lost belongings safely across campus
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-300">
              Upload Item Photo
            </label>
            <label className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-cyan-400/50 rounded-2xl cursor-pointer bg-white/5 hover:bg-white/10 hover:border-cyan-400 transition-all duration-300 group overflow-hidden relative">
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-medium flex items-center gap-2">
                      <FiImage /> Change Photo
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center transition-transform duration-300 group-hover:scale-105">
                  <FiImage className="text-5xl text-cyan-400/70 mb-3 mx-auto group-hover:text-cyan-400 transition-colors" />
                  <p className="text-gray-300 font-medium">
                    Click to upload item image
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    PNG, JPG, JPEG up to 5MB
                  </p>
                </div>
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Title */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-300">
              Item Title
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-cyan-400 transition-colors">
                <FiType className="text-lg" />
              </div>
              <input
                type="text"
                name="title"
                placeholder="Ex: Black Leather Wallet"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all text-white"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-300">
              Description
            </label>
            <div className="relative group">
              <div className="absolute top-4 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-cyan-400 transition-colors">
                <FiAlignLeft className="text-lg" />
              </div>
              <textarea
                name="description"
                placeholder="Describe the item in detail..."
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all text-white resize-none"
              ></textarea>
            </div>
          </div>

          {/* Type + Category */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Type */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-300">
                Item Type
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-cyan-400 transition-colors z-10">
                  <FiList className="text-lg" />
                </div>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all text-white appearance-none"
                >
                  <option value="lost">Lost</option>
                  <option value="found">Found</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-300">
                Category
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-cyan-400 transition-colors">
                  <FiTag className="text-lg" />
                </div>
                <input
                  type="text"
                  name="category"
                  placeholder="Electronics, ID Card..."
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all text-white"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-300">
              Location Found/Lost
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-cyan-400 transition-colors">
                <FiMapPin className="text-lg" />
              </div>
              <input
                type="text"
                name="location"
                placeholder="Library, Cafeteria..."
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all text-white"
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-300">
              Date
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-cyan-400 transition-colors z-10">
                <FiCalendar className="text-lg" />
              </div>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all text-white [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 mt-6"
          >
            <span>Post Item to Network</span>
            <FiPlusCircle className="text-xl" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostItem;