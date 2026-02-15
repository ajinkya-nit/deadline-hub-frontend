import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "./store/authSlice";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import ProfessorDashboard from "./pages/ProfessorDashboard";
import Deadlines from "./pages/Deadlines";
import Events from "./pages/Events";
import Profile from "./pages/Profile";

// Components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

// Styles
import "./styles/globals.css";
import "./styles/utilities.css";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, user } = useSelector((state) => state.auth);
  const { isDarkMode } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [isDarkMode]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "var(--bg-primary-light)",
        }}
      >
        <div className="spinner" />
      </div>
    );
  }

  const ProtectedRoute = ({ component }) => {
    return isAuthenticated ? (
      <div className="app-layout">
        <Header />
        <div className="app-container">
          <Sidebar />
          <main className="main-content container">{component}</main>
        </div>
      </div>
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              component={
                user?.role === "professor" ? (
                  <ProfessorDashboard />
                ) : (
                  <StudentDashboard />
                )
              }
            />
          }
        />

        {/* Student Routes */}
        <Route
          path="/deadlines"
          element={
            user?.role === "student" ? (
              <ProtectedRoute component={<Deadlines />} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* Shared Routes */}
        <Route
          path="/events"
          element={<ProtectedRoute component={<Events />} />}
        />

        {/* Profile Route */}
        <Route
          path="/profile"
          element={<ProtectedRoute component={<Profile />} />}
        />

        {/* Redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
