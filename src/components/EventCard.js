import React from "react";
import { Heart, MessageCircle, User, Clock } from "lucide-react";
import moment from "moment";
import parseHtml from "html-react-parser";
import "./EventCard.css";

const EventCard = ({ event, onLike, onComment, onDelete }) => {
  const [liked, setLiked] = React.useState(false);

  const handleLike = () => {
    setLiked(!liked);
    if (onLike) onLike();
  };

  return (
    <div className="event-card">
      {event.imageUrl && (
        <div className="event-image">
          <img src={event.imageUrl} alt={event.subject} />
          <div className="event-category">{event.category}</div>
        </div>
      )}

      <div className="event-content">
        <h3 className="event-title">{event.subject}</h3>

        <p className="event-description">
          {event.description.length > 150
            ? event.description.substring(0, 150) + "..."
            : event.description}
        </p>

        <div className="event-meta">
          <div className="meta-item">
            <Clock size={14} />
            {moment(event.eventDate).format("MMM DD, YYYY")}
          </div>
          {event.location && (
            <div className="meta-item">
              📍 {event.location}
            </div>
          )}
        </div>

        <div className="event-footer">
          <div className="event-author">
            <img
              src={event.createdBy?.avatar || "https://via.placeholder.com/32"}
              alt={event.createdBy?.username}
              className="author-avatar"
            />
            <span className="author-name">{event.createdBy?.username}</span>
          </div>

          <div className="event-actions">
            <button className={`action-btn ${liked ? "liked" : ""}`} onClick={handleLike}>
              <Heart size={16} fill={liked ? "currentColor" : "none"} />
              <span>{event.likes}</span>
            </button>
            <button className="action-btn" onClick={onComment}>
              <MessageCircle size={16} />
              <span>{event.comments?.length || 0}</span>
            </button>
            {onDelete && (
              <button className="action-btn danger" onClick={onDelete}>
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
