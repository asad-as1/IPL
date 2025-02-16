import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";
import logo from "../images/logo.jpeg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = Cookies.get("user");
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("user");
    alert("logout successfully");
    setIsMenuOpen(false);
  };

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Venues", path: "/venues" },
    { label: "Players", path: "/players" },
    { label: "Teams", path: "/teams" },
    { label: "Search", path: "/search" },
    { label: "Battle", path: "/battle" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full bg-blue-950 fixed top-0 left-0 right-0 z-50">
      {/* Desktop and Tablet Header */}
      <div className="h-full w-full p-4 flex items-center justify-between">
        {/* Logo on the Left */}
        <Link 
          to="/" 
          className="text-white flex items-center"
          onClick={closeMenu}
        >
          <img
            className="h-12 w-12 rounded-full mr-4"
            src={logo}
            alt="IplCrux Logo"
          />
          <span className="text-xl font-semibold">IplCrux</span>
        </Link>
  
        {/* Centered Navigation Links */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-6 text-white">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              className="text-md hover:text-blue-300 transition-colors"
              to={item.path}
            >
              {item.label}
            </Link>
          ))}
          {token ? (
            <Link
              onClick={handleLogout}
              className="text-md hover:text-blue-300 transition-colors"
              to="/login"
            >
              Logout
            </Link>
          ) : (
            <Link
              className="text-md hover:text-blue-300 transition-colors"
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
  
        {/* Hamburger Menu Button for Mobile */}
        <button
          className="lg:hidden text-white p-2"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
  
      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-blue-950 shadow-lg transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-col py-4 px-6 space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              className="text-white text-lg hover:text-blue-300 transition-colors"
              to={item.path}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
          {token ? (
            <Link
              onClick={handleLogout}
              className="text-white text-lg hover:text-blue-300 transition-colors"
              to="/login"
            >
              Logout
            </Link>
          ) : (
            <Link
              className="text-white text-lg hover:text-blue-300 transition-colors"
              to="/login"
              onClick={closeMenu}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
  
};

export default Header;