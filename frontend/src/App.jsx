/** @format */

import React from "react";
import SignUp from "./pages/SignUp.jsx";
import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn.jsx";
import Home from "./pages/Home.jsx";

export const serverUrl = "http://localhost:5000";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} /> 
      </Routes>
    </>
  );
}

export default App;
