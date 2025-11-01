import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
