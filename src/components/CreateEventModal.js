import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../store/eventSlice";
import { X, AlertCircle } from "lucide-react";
import "./CreateEventModal.css";

const CreateEventModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.events);
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    eventDate: "",
    location: "",
    category: "academic",
  });
  const [errors, setErrors] = useState({});

  const categories = [
    { value: "technical", label: "Technical" },
    { value: "cultural", label: "Cultural" },
    { value: "sports", label: "Sports" },
    { value: "academic", label: "Academic" },
    { value: "other", label: "Other" },
  ];

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

    if (!formData.subject.trim()) newErrors.subject = "Event subject is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.eventDate) newErrors.eventDate = "Event date is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result = await dispatch(createEvent(formData));
    if (result.payload && result.payload._id) {
      setFormData({
        subject: "",
        description: "",
        eventDate: "",
        location: "",
        category: "academic",
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content create-event-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Event</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-event-form">
          {error && (
            <div className="error-banner">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {/* Event Subject */}
          <div className="form-group">
            <label>Event Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g., Tech Talks: AI & Machine Learning"
              className="input"
            />
            {errors.subject && <span className="form-error">{errors.subject}</span>}
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us about your event..."
              rows="4"
              className="input"
            />
            {errors.description && <span className="form-error">{errors.description}</span>}
          </div>

          <div className="form-row">
            {/* Event Date */}
            <div className="form-group">
              <label>Event Date & Time *</label>
              <input
                type="datetime-local"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className="input"
              />
              {errors.eventDate && <span className="form-error">{errors.eventDate}</span>}
            </div>

            {/* Category */}
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div className="form-group">
            <label>Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Auditorium, Convention Center"
              className="input"
            />
            {errors.location && <span className="form-error">{errors.location}</span>}
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
              {isLoading ? "Creating..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;
