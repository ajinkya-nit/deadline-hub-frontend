import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/postSlice";
import { Plus, BarChart3 } from "lucide-react";
import PostCard from "../components/PostCard";
import CreatePostModal from "../components/CreatePostModal";
import "./Dashboard.css";

const ProfessorDashboard = () => {
  const dispatch = useDispatch();
  const { posts, total } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts({ page: 1, limit: 10 }));
  }, [dispatch]);

  const statisticsData = {
    totalPosts: posts.length,
    totalViews: posts.reduce((sum, post) => sum + post.views, 0),
    assignmentCount: posts.filter((p) => p.postType === "assignment").length,
    quizCount: posts.filter((p) => p.postType === "quiz").length,
    notesCount: posts.filter((p) => p.postType === "notes").length,
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, Prof. {user?.username}! 👨‍🏫</h1>
          <p>Manage your academic posts and track student engagement</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={18} /> Create Post
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary">📝</div>
          <div className="stat-content">
            <div className="stat-value">{statisticsData.totalPosts}</div>
            <div className="stat-label">Total Posts</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon info">👁️</div>
          <div className="stat-content">
            <div className="stat-value">{statisticsData.totalViews}</div>
            <div className="stat-label">Total Views</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning">📋</div>
          <div className="stat-content">
            <div className="stat-value">{statisticsData.assignmentCount}</div>
            <div className="stat-label">Assignments</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon danger">✓</div>
          <div className="stat-content">
            <div className="stat-value">{statisticsData.quizCount}</div>
            <div className="stat-label">Quizzes</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">📚</div>
          <div className="stat-content">
            <div className="stat-value">{statisticsData.notesCount}</div>
            <div className="stat-label">Study Notes</div>
          </div>
        </div>
      </div>

      {/* Your Posts */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>📋 Your Posts</h2>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={16} /> New Post
          </button>
        </div>

        {posts.length > 0 ? (
          <div className="posts-list">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>You haven't created any posts yet.</p>
            <button
              className="btn btn-primary"
              onClick={() => setShowCreateModal(true)}
            >
              Create Your First Post
            </button>
          </div>
        )}
      </section>

      {/* Create Post Modal */}
      <CreatePostModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </div>
  );
};

export default ProfessorDashboard;
