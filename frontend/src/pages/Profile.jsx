import { useState, useEffect } from "react";
import { FiUser, FiMail, FiBriefcase, FiBox, FiArrowLeft, FiHash, FiSave, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import API from "../services/api";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    rollNumber: "",
    email: "",
    department: "",
    postCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    rollNumber: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        const token = localStorage.getItem("token");
        
        if (email) {
          setUser(prev => ({ ...prev, email }));
        }

        // Fetch user profile data from backend
        const res = await API.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setUser({
          name: res.data.name || "Not specified",
          rollNumber: res.data.rollNumber || "Not specified",
          email: res.data.email || email,
          department: res.data.department || "Not specified",
          postCount: res.data.postCount || 0,
        });
        setEditData({
          name: res.data.name || "",
          rollNumber: res.data.rollNumber || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Fallback to localStorage if API fails
        const email = localStorage.getItem("userEmail");
        setUser(prev => ({
          ...prev,
          name: "Not specified",
          rollNumber: "Not specified",
          email: email || "Not available",
          department: "Not specified",
          postCount: 0,
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEdit = () => {
    setEditData({
      name: user.name === "Not specified" ? "" : user.name,
      rollNumber: user.rollNumber === "Not specified" ? "" : user.rollNumber,
    });
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      
      const res = await API.put("/auth/profile", {
        name: editData.name,
        rollNumber: editData.rollNumber,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUser(prev => ({
        ...prev,
        name: res.data.name || editData.name,
        rollNumber: res.data.rollNumber || editData.rollNumber,
      }));
      
      setEditing(false);
      alert("Profile updated successfully ✅");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.response?.data?.message || "Failed to update profile ❌");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e) => {
    setEditData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/40 to-black text-white overflow-hidden relative pt-24 pb-12 px-6">
      
      {/* Background Glow */}
      <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full animate-float pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full animate-float-delayed pointer-events-none"></div>

      {/* Profile Card */}
      <div className="relative max-w-2xl mx-auto z-10">
        
        {/* Back Button */}
        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8 group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </Link>

        {/* Profile Header */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-3xl p-8 md:p-10 animate-fade-in-up">
          
          {/* Avatar Section */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-lg opacity-40"></div>
              <div className="relative w-28 h-28 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-cyan-500/30">
                <FiUser className="text-5xl text-white" />
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
                My Profile
              </h1>
              <p className="text-gray-400 text-sm font-medium">
                Manage your account information
              </p>
            </div>
          </div>

          {/* Profile Details */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-400">Loading profile...</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Name */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                    <FiUser className="text-xl text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Full Name
                    </p>
                    {editing ? (
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full px-3 py-2 text-sm rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/60 transition-all text-white"
                      />
                    ) : (
                      <p className="text-lg font-medium text-white">
                        {user.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Roll Number */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <FiHash className="text-xl text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Roll Number
                    </p>
                    {editing ? (
                      <input
                        type="text"
                        name="rollNumber"
                        value={editData.rollNumber}
                        onChange={handleInputChange}
                        placeholder="Enter your roll number"
                        className="w-full px-3 py-2 text-sm rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/60 transition-all text-white"
                      />
                    ) : (
                      <p className="text-lg font-medium text-white">
                        {user.rollNumber}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                    <FiMail className="text-xl text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Email Address
                    </p>
                    <p className="text-lg font-medium text-white break-all">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Department */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <FiBriefcase className="text-xl text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Department
                    </p>
                    <p className="text-lg font-medium text-white">
                      {user.department}
                    </p>
                  </div>
                </div>
              </div>

              {/* Post Count */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <FiBox className="text-xl text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Posted Items
                    </p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-extrabold text-white">
                        {user.postCount}
                      </p>
                      <p className="text-sm text-gray-400">
                        items posted
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-2">
                {editing ? (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 text-sm rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 disabled:opacity-60"
                    >
                      <FiSave className="text-lg" />
                      <span>{saving ? "Saving..." : "Save Changes"}</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={saving}
                      className="flex-1 flex items-center justify-center gap-2 border-2 border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white font-bold py-3 text-sm rounded-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60"
                    >
                      <span>Cancel</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="w-full flex items-center justify-center gap-2 border-2 border-cyan-400/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-bold py-3 text-sm rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <FiEdit2 className="text-lg" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Profile;
