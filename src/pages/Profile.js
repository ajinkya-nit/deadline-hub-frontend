import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { LogOut, User, Mail, BookOpen, Users } from "lucide-react";
import "./Profile.css";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar-section">
            <img
              src={user.avatar || "https://via.placeholder.com/120"}
              alt={user.username}
              className="profile-avatar"
            />
            <div className="profile-basic-info">
              <h1 className="profile-username">{user.username}</h1>
              <p className="profile-role">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
            </div>
          </div>
          <button className="btn btn-danger" onClick={handleLogout}>
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="profile-content">
          {/* General Information */}
          <section className="profile-section">
            <h2 className="section-title">
              <User size={20} /> General Information
            </h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Username</label>
                <p>{user.username}</p>
              </div>
              <div className="info-item">
                <label>
                  <Mail size={16} /> Email
                </label>
                <p>{user.email}</p>
              </div>
              <div className="info-item">
                <label>Role</label>
                <p className="role-badge">{user.role}</p>
              </div>
            </div>
          </section>

          {/* Student-Specific Information */}
          {user.role === "student" && (
            <section className="profile-section">
              <h2 className="section-title">
                <BookOpen size={20} /> Academic Information
              </h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Roll Number</label>
                  <p>{user.rollNumber || "Not provided"}</p>
                </div>
                <div className="info-item">
                  <label>Branch</label>
                  <p>{user.branch || "Not provided"}</p>
                </div>
                <div className="info-item">
                  <label>
                    <Users size={16} /> Group
                  </label>
                  <p>{user.group || "Not provided"}</p>
                </div>
                {user.subgroup && (
                  <div className="info-item">
                    <label>Subgroup</label>
                    <p>{user.subgroup}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Professor-Specific Information */}
          {user.role === "professor" && (
            <section className="profile-section">
              <h2 className="section-title">
                <BookOpen size={20} /> Department Information
              </h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Department</label>
                  <p>{user.department || "Not provided"}</p>
                </div>
                {user.designation && (
                  <div className="info-item">
                    <label>Designation</label>
                    <p>{user.designation}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Account Settings */}
          <section className="profile-section">
            <h2 className="section-title">Account Settings</h2>
            <div className="settings-list">
              <button className="settings-btn">Change Password</button>
              <button className="settings-btn">Update Profile Picture</button>
              <button className="settings-btn danger">Delete Account</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
