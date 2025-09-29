import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import LatestManager from "./pages/LatestManager";
import EditProduct from "./pages/EditProduct";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  if (!token) return <Login setToken={setToken} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      <Navbar setToken={setToken} />
      <div className="flex w-full">
        <Sidebar />
        <div className="w-[70%] mx-auto my-8">
          <Routes>
            <Route path="/" element={<Navigate to="/add" />} />
            <Route path="/add" element={<Add token={token} />} />
            <Route path="/list" element={<List token={token} />} />
            <Route path="/latest" element={<LatestManager token={token} />} />
            <Route path="/edit-product" element={<EditProduct token={token} />} />
            <Route path="/orders" element={<Orders token={token} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
