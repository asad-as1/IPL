import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../images/logo.jpeg";
import DehazeIcon from "@mui/icons-material/Dehaze";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Cookies from "js-cookie";

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [isdrop, setIsdrop] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation().pathname;

  // const path = location.split("/")
  const token = Cookies.get("user");
  const navigate = useNavigate();
  function toggleDarkMode() {
    setIsDark((p) => !p);
    const root = document.documentElement;
    root.classList.toggle("dark");
  }
  // useEffect(() => {

  // },[])
  const handleLogout = () => {
    Cookies.remove("user");
    alert("logout successfully");
    // navigate("/");
  };

  return (
    <nav className="h-full w-full bg-blue-950">
      <div className="h-full w-full p-2 flex items-center">
        <div className="flex w-1/3 justify-center items-center gap-8">
          <Link className="text-white flex justify-center items-center" to="/">
            <img
              className="logo h-12 rounded-full mr-4 w-12"
              src={logo}
              alt="logo"
            />
            <span className="text-xl">IplCrux</span>
          </Link>
        </div>

        <div className="flex items-center gap-4 text-white">
          <div className="mb-3 ml-20 mt-2">
            <Link className="text-md mr-4" to="/">
              Home
            </Link>
            <Link className="text-md mr-4" to="/venues">
              Venues
            </Link>
            <Link className="text-md mr-4" to="/players">
              Players
            </Link>
            <Link className="text-md mr-4" to="/Teams">
              Teams
            </Link>
            <Link className="text-md mr-4" to="/search">
              Search
            </Link>
            <Link className="text-md mr-4" to="/Battle">
              Battle
            </Link>
            {token && (
              <Link
              onClick={handleLogout}
              className="text-md mr-4" to="/login"
              >
                Logout
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Header;
