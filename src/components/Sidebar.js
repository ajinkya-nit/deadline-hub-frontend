import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  User,
  ChevronRight,
  FileText,
  BarChart3,
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const { sidebarOpen } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);

  const navigationItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      roles: ["student", "professor"],
    },
    {
      title: "Academic Deadlines",
      icon: BookOpen,
      href: "/deadlines",
      roles: ["student"],
    },
    {
      title: "Campus Events",
      icon: Calendar,
      href: "/events",
      roles: ["student", "professor"],
    },
    {
      title: "My Posts",
      icon: FileText,
      href: "/my-posts",
      roles: ["professor"],
    },
    {
      title: "Analytics",
      icon: BarChart3,
      href: "/analytics",
      roles: ["professor"],
    },
    {
      title: "Profile",
      icon: User,
      href: "/profile",
      roles: ["student", "professor"],
    },
  ];

  const filteredItems = navigationItems.filter((item) =>
    item.roles.includes(user?.role)
  );

  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <nav className="sidebar-nav">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.title}
              to={item.href}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              <Icon size={20} />
              <span>{item.title}</span>
              <ChevronRight size={16} className="nav-arrow" />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
