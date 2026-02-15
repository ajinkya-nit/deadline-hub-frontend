import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register, clearError } from "../store/authSlice";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Student fields
    rollNumber: "",
    branch: "CSE",
    group: "A1",
    subgroup: "",
    // Professor fields
    department: "",
    designation: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (role === "student") {
      if (!formData.rollNumber) newErrors.rollNumber = "Roll number is required";
    } else {
      if (!formData.department) newErrors.department = "Department is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    if (!validateForm()) return;

    const registrationData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role,
      ...(role === "student" && {
        rollNumber: formData.rollNumber,
        branch: formData.branch,
        group: formData.group,
        subgroup: formData.subgroup,
      }),
      ...(role === "professor" && {
        department: formData.department,
        designation: formData.designation,
      }),
    };

    console.log("Submitting registration data:", registrationData);
    const result = await dispatch(register(registrationData));
    console.log("Registration result:", result);
    if (result.payload && result.payload.user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container register">
        <div className="auth-card">
          <div className="auth-header">
            <h1>📅 Join DeadlineHub</h1>
            <p>Create your account to manage deadlines</p>
          </div>

          <div className="role-selector">
            <button
              type="button"
              className={`role-btn ${role === "student" ? "active" : ""}`}
              onClick={() => setRole("student")}
            >
              👨‍🎓 Student
            </button>
            <button
              type="button"
              className={`role-btn ${role === "professor" ? "active" : ""}`}
              onClick={() => setRole("professor")}
            >
              👨‍🏫 Professor
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  className="input"
                  required
                />
                {errors.username && <span className="form-error">{errors.username}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="input"
                  required
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              {role === "student" ? (
                <>
                  <div className="form-group">
                    <label className="form-label">Roll Number</label>
                    <input
                      type="text"
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleChange}
                      placeholder="e.g., 2023001"
                      className="input"
                      required
                    />
                    {errors.rollNumber && <span className="form-error">{errors.rollNumber}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Branch</label>
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="CSE">Computer Science Engineering</option>
                      <option value="ECE">Electronics & Communication</option>
                      <option value="ME">Mechanical Engineering</option>
                      <option value="CE">Civil Engineering</option>
                      <option value="EEE">Electrical Engineering</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Group</label>
                    <select
                      name="group"
                      value={formData.group}
                      onChange={handleChange}
                      className="input"
                    >
                      {["A1", "A2", "A3", "A4", "A5", "A6", "B1", "B2", "B3", "B4", "B5", "B6"].map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subgroup (if applicable)</label>
                    <input
                      type="text"
                      name="subgroup"
                      value={formData.subgroup}
                      onChange={handleChange}
                      placeholder="e.g., A4a or A4b"
                      className="input"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      placeholder="Your department"
                      className="input"
                      required
                    />
                    {errors.department && <span className="form-error">{errors.department}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Designation</label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="e.g., Associate Professor"
                      className="input"
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="password-input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                    className="input"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <span className="form-error">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="password-input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="input"
                    required
                  />
                </div>
                {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
