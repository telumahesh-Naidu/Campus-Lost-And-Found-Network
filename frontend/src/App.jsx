import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostItem from "./pages/PostItem";
import Navbar from "./components/Navbar";
import ItemDetails from "./pages/ItemDetails";
import ForgotPassword from "./pages/ForgotPassword";
import ReportLostItem from "./pages/ReportLostItem";
import VerifyOTP from "./pages/VerifyOtp";

function App() {
  const isAuth = () => {
    try {
      return !!localStorage.getItem("token");
    } catch (e) {
      return false;
    }
  };
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={isAuth() ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post-item" element={<PostItem />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/report-lost" element={<ReportLostItem/>}/>
        <Route path="/verify-otp" element={<VerifyOTP/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;