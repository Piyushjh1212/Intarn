import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import TransectionDashboard from "./Pages/TransectionDashboard/TransectionDashboard";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/transection-dashboard"
          element={<TransectionDashboard />}
        />
      </Routes>
    </>
  );
}

export default App;
