import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/postSlice";
import PostCard from "../components/PostCard";
import { Filter, Plus } from "lucide-react";
import "./Deadlines.css";

const Deadlines = () => {
  const dispatch = useDispatch();
  const { posts, pages, currentPage } = useSelector((state) => state.posts);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("deadline");

  useEffect(() => {
    dispatch(fetchPosts({ page: currentPage, limit: 15 }));
  }, [dispatch, currentPage]);

  const filters = [
    { value: "all", label: "All Deadlines" },
    { value: "assignment", label: "Assignments" },
    { value: "notes", label: "Notes" },
    { value: "quiz", label: "Quizzes" },
  ];

  const filteredPosts = filter !== "all"
    ? posts.filter((post) => post.postType === filter)
    : posts;

  return (
    <div className="deadlines-page">
      <div className="page-header">
        <h1>📚 Academic Deadlines</h1>
        <p>All posts targeted for your group</p>
      </div>

      <div className="deadlines-controls">
        <div className="filter-group">
          <Filter size={18} />
          {filters.map((f) => (
            <button
              key={f.value}
              className={`filter-btn ${filter === f.value ? "active" : ""}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="deadlines-grid">
          {filteredPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No deadlines found for this filter. 🎉</p>
        </div>
      )}
    </div>
  );
};

export default Deadlines;
