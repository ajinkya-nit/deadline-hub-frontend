import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../store/postSlice";
import { X, AlertCircle } from "lucide-react";
import "./CreatePostModal.css";

const CreatePostModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.posts);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    postType: "assignment",
    deadline: "",
    targetGroups: [],
    priority: "medium",
    attachments: [],
  });
  const [errors, setErrors] = useState({});

  const groups = ["A1", "A2", "A3", "A4", "A5", "A6", "B1", "B2", "B3", "B4", "B5", "B6"];

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

  const handleGroupChange = (group) => {
    setFormData((prev) => ({
      ...prev,
      targetGroups: prev.targetGroups.includes(group)
        ? prev.targetGroups.filter((g) => g !== group)
        : [...prev.targetGroups, group],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.deadline) newErrors.deadline = "Deadline is required";
    if (formData.targetGroups.length === 0) newErrors.targetGroups = "Select at least one group";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result = await dispatch(createPost(formData));
    if (result.payload && result.payload.data) {
      setFormData({
        title: "",
        description: "",
        postType: "assignment",
        deadline: "",
        targetGroups: [],
        priority: "medium",
        attachments: [],
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content create-post-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Post</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-post-form">
          {error && (
            <div className="error-banner">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {/* Title */}
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Assignment - Chapter 5"
              className="input"
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add details about the assignment, quiz, or notes..."
              rows="4"
              className="input"
            />
            {errors.description && <span className="form-error">{errors.description}</span>}
          </div>

          <div className="form-row">
            {/* Post Type */}
            <div className="form-group">
              <label>Post Type</label>
              <select
                name="postType"
                value={formData.postType}
                onChange={handleChange}
                className="input"
              >
                <option value="assignment">Assignment</option>
                <option value="quiz">Quiz</option>
                <option value="notes">Study Notes</option>
              </select>
            </div>

            {/* Priority */}
            <div className="form-group">
              <label>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="input"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Deadline */}
          <div className="form-group">
            <label>Deadline *</label>
            <input
              type="datetime-local"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="input"
            />
            {errors.deadline && <span className="form-error">{errors.deadline}</span>}
          </div>

          {/* Target Groups */}
          <div className="form-group">
            <label>Target Groups *</label>
            <div className="groups-grid">
              {groups.map((group) => (
                <label key={group} className="group-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.targetGroups.includes(group)}
                    onChange={() => handleGroupChange(group)}
                  />
                  {group}
                </label>
              ))}
            </div>
            {errors.targetGroups && <span className="form-error">{errors.targetGroups}</span>}
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
