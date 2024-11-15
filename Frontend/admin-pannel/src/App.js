// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Update for v6
import './App.css';
import Login from './component/login/Login';
import Admin from './component/admin/Admin'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Update with element prop */}
        <Route path="/admin" element={<Admin />} /> {/* Update with element prop */}
      </Routes>
    </Router>
  );
}

export default App;
