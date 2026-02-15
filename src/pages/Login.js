import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login, clearError } from "../store/authSlice";
import { Eye, EyeOff } from "lucide-react";
import "./AuthPage.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    const result = await dispatch(login(formData));
    if (result.payload && result.payload.user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>📅 DeadlineHub</h1>
            <p>Welcome back to your deadline manager</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="password-input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
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
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="auth-link">
                Register here
              </Link>
            </p>
          </div>
        </div>

        <div className="auth-illustration">
          <div className="illustration-content">
            <h2>Stay Organized</h2>
            <p>Never miss a deadline. Stay on top of your academic journey.</p>
            <ul className="features-list">
              <li>✓ Real-time deadline notifications</li>
              <li>✓ Campus event feed</li>
              <li>✓ Group-based posts</li>
              <li>✓ Easy tracking dashboard</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
