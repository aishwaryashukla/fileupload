import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
function App() {
 
  return (
    <div>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Route>

          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
