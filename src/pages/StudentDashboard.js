import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/postSlice";
import { fetchEvents } from "../store/eventSlice";
import PostCard from "../components/PostCard";
import EventCard from "../components/EventCard";
import { Plus, ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const { posts, total } = useSelector((state) => state.posts);
  const { events } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);
  const [upcomingCount, setUpcomingCount] = useState(0);

  useEffect(() => {
    dispatch(fetchPosts({ page: 1, limit: 5 }));
    dispatch(fetchEvents({ page: 1, limit: 4 }));
  }, [dispatch]);

  useEffect(() => {
    const upcoming = posts.filter((post) => {
      const deadline = new Date(post.deadline);
      const now = new Date();
      const daysLeft = (deadline - now) / (1000 * 60 * 60 * 24);
      return daysLeft <= 3 && daysLeft > 0;
    }).length;
    setUpcomingCount(upcoming);
  }, [posts]);

  const urgentPosts = posts.filter((post) => {
    const deadline = new Date(post.deadline);
    const now = new Date();
    const hoursLeft = (deadline - now) / (1000 * 60 * 60);
    return hoursLeft < 24 && hoursLeft > 0;
  });

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user?.username}! 👋</h1>
          <p>Here's your personalized academic hub</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon danger">📌</div>
          <div className="stat-content">
            <div className="stat-value">{urgentPosts.length}</div>
            <div className="stat-label">Urgent (&lt; 24hrs)</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning">⏰</div>
          <div className="stat-content">
            <div className="stat-value">{upcomingCount}</div>
            <div className="stat-label">Due Soon (&lt; 3 days)</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon info">📚</div>
          <div className="stat-content">
            <div className="stat-value">{total}</div>
            <div className="stat-label">Total Deadlines</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">🎉</div>
          <div className="stat-content">
            <div className="stat-value">{events.length}</div>
            <div className="stat-label">Upcoming Events</div>
          </div>
        </div>
      </div>

      {/* Urgent Posts */}
      {urgentPosts.length > 0 && (
        <section className="dashboard-section">
          <div className="section-header">
            <h2>🔴 Urgent Attention Needed</h2>
            <span className="badge danger">Due within 24 hours</span>
          </div>
          <div className="posts-grid">
            {urgentPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Deadlines */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>📅 Your Deadlines</h2>
          <Link to="/deadlines" className="view-all">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        {posts.length > 0 ? (
          <div className="posts-grid">
            {posts.slice(0, 6).map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No deadlines yet. You're all caught up! 🎉</p>
          </div>
        )}
      </section>

      {/* Upcoming Events */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>🎪 Campus Events</h2>
          <Link to="/events" className="view-all">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        {events.length > 0 ? (
          <div className="events-grid">
            {events.slice(0, 4).map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No events upcoming. Check back soon! 📢</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default StudentDashboard;
