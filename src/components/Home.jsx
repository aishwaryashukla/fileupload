import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Menu, LogOut, HelpCircle, User } from "lucide-react";
import { Outlet } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const logo = "./vite.svg"; // Add your logo URL here

const Home = () => {
   const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const validateLogin = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
        }
        setUsername(localStorage.getItem("userName") || "Admin");
        navigate("/dashboard"); // Redirect to dashboard
      } catch (err) {
        console.error("Error during login validation:", err);
        navigate("/login");
      }
    };
    validateLogin();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="d-flex vh-100 vw-100">
  {/* Sidebar */}
  <div
    className="bg-light text-dark"
    style={{
      transition: "width 0.3s",
      width: isSidebarOpen ? "300px" : "80px", // Dynamic width for sidebar
      boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)", // Subtle shadow for separation
    }}
  >
    <Navbar className="flex-column align-items-start p-3 h-100">
      {/* Logo */}
      <Navbar.Brand
        href="/"
        className={`text-center mb-4 ${!isSidebarOpen && "d-none"}`}
      >
        <img
          src={logo}
          alt="PE Partners"
          className="img-fluid"
          style={{ maxWidth: "120px" }}
        />
      </Navbar.Brand>

      {/* Menu Items */}
      <Nav className="flex-column w-100">
        <Nav.Link
          href="/dashboard"
          className={`d-flex align-items-center px-3 py-2 ${
            location.pathname === "/dashboard"
              ? "bg-primary text-white fw-bold"
              : "text-dark"
          }`}
          style={{
            borderRadius: "5px",
            transition: "background-color 0.3s",
          }}
        >
          <i className="bi bi-speedometer2 me-2"></i>
          {isSidebarOpen && <span>Dashboard</span>}
        </Nav.Link>
        {/* Add more links here as needed */}
      </Nav>
    </Navbar>
  </div>

  {/* Main Content */}
  <div className="d-flex flex-column flex-grow-1">
    {/* Header */}
    <header className="d-flex justify-content-between align-items-center px-4 py-3 bg-white shadow-sm">
      <div className="d-flex align-items-center">
        <Button
          variant="light"
          className="me-3"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <Menu size={24} />
        </Button>
        <h1 className="h5 mb-0 text-primary">PE Partners Portal</h1>
      </div>
      <div className="d-flex align-items-center">
        <a href="/help" className="d-flex align-items-center text-secondary me-4">
          <HelpCircle size={18} />
          <span className="ms-2">Help</span>
        </a>
        <div className="d-flex align-items-center text-secondary me-4">
          <User size={20} />
          <span className="ms-2">{username}</span>
        </div>
        <Button variant="outline-danger" onClick={handleLogout}>
          <LogOut size={18} />
          <span className="ms-2">Logout</span>
        </Button>
      </div>
    </header>

    {/* Page Content */}
     <main
      className="flex-grow-1 d-flex align-items-stretch"
      style={{
        minHeight: "0", // Prevent content from shrinking
        overflow: "auto", // Enable scrolling if content overflows
      }}
    >
         <div className="w-100 p-4 ">
          <Outlet />
        </div>
      </main>

    {/* Footer */}
    <footer className="text-center py-3 bg-white text-muted border-top">
      <small>&copy; 2025 PE Partners. All Rights Reserved.</small>
    </footer>
  </div>
</div>

  );
};
export default Home
