import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, toggleSidebar } from "../store/uiSlice";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Search, Moon, Sun, LogOut, Menu, X } from "lucide-react";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode, sidebarOpen } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    navigate("/login");
  };

  const handleProfileClick = () => {
    setDropdownOpen(false);
    navigate("/profile");
  };

  const handleSettingsClick = () => {
    setDropdownOpen(false);
    navigate("/settings");
  };

  return (
    <header className="header">
      <div className="header-container">
        <button
          className="sidebar-toggle hidden-desktop"
          onClick={() => dispatch(toggleSidebar())}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="header-brand">
          <h1 className="logo">📅 DeadlineHub</h1>
        </div>

        <div className="header-search">
          <input
            type="text"
            placeholder="Search deadlines, events..."
            className="search-input"
          />
          <Search size={20} className="search-icon" />
        </div>

        <div className="header-actions">
          <button
            className="btn-icon"
            onClick={() => dispatch(toggleDarkMode())}
            title="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div
            className={`user-menu ${dropdownOpen ? "active" : ""}`}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <img
              src={user?.avatar || "https://via.placeholder.com/40"}
              alt={user?.username}
              className="avatar"
            />
            <span className="user-name">{user?.username}</span>
            {dropdownOpen && (
              <div className="dropdown">
                <button className="dropdown-item" onClick={handleProfileClick}>
                  Profile
                </button>
                <button className="dropdown-item" onClick={handleSettingsClick}>
                  Settings
                </button>
                <hr className="dropdown-divider" />
                <button className="dropdown-item danger" onClick={handleLogout}>
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
