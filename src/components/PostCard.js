import React from "react";
import { Clock, AlertCircle, CheckCircle, Trash2, Edit } from "lucide-react";
import moment from "moment";
import "./PostCard.css";

const PostCard = ({ post, onEdit, onDelete }) => {
  const calculateTimeRemaining = () => {
    const deadline = moment(post.deadline);
    const now = moment();
    const duration = moment.duration(deadline.diff(now));

    if (duration.asHours() < 0) return "Overdue";
    if (duration.asDays() < 1) return `${Math.floor(duration.asHours())}h remaining`;
    if (duration.asDays() < 3) return `${Math.floor(duration.asDays())}d ${Math.floor(duration.asHours() % 24)}h`;
    return `${Math.floor(duration.asDays())} days`;
  };

  const getStatusColor = () => {
    const deadline = moment(post.deadline);
    const now = moment();
    const hoursLeft = deadline.diff(now, "hours");

    if (hoursLeft < 0) return "danger";
    if (hoursLeft < 24) return "danger";
    if (hoursLeft < 72) return "warning";
    return "success";
  };

  const getStatusIcon = () => {
    const statusColor = getStatusColor();
    if (statusColor === "danger") return <AlertCircle size={16} />;
    if (statusColor === "warning") return <Clock size={16} />;
    return <CheckCircle size={16} />;
  };

  const getPostTypeColor = () => {
    switch (post.postType) {
      case "assignment":
        return "badge-primary";
      case "notes":
        return "badge-info";
      case "quiz":
        return "badge-danger";
      default:
        return "badge-primary";
    }
  };

  return (
    <div className="post-card card">
      <div className="post-card-header">
        <div className="post-meta">
          <span className={`badge ${getPostTypeColor()}`}>{post.postType}</span>
          <span className={`priority priority-${post.priority}`}>
            {post.priority.charAt(0).toUpperCase() + post.priority.slice(1)}
          </span>
        </div>
        <div className="post-actions">
          {onEdit && <button className="btn-icon sm" onClick={onEdit} title="Edit">
            <Edit size={16} />
          </button>}
          {onDelete && <button className="btn-icon sm danger" onClick={onDelete} title="Delete">
            <Trash2 size={16} />
          </button>}
        </div>
      </div>

      <h3 className="post-title">{post.title}</h3>

      <p className="post-description">{post.description}</p>

      <div className="post-metadata">
        <span className="meta-item">Posted by {post.createdBy?.username}</span>
        {post.targetGroups && post.targetGroups.length > 0 && (
          <span className="meta-item">Target: {post.targetGroups.join(", ")}</span>
        )}
      </div>

      <div className={`post-deadline ${getStatusColor()}`}>
        <div className="deadline-icon">{getStatusIcon()}</div>
        <div className="deadline-info">
          <span className="deadline-label">Due In</span>
          <span className="deadline-time">{calculateTimeRemaining()}</span>
          <span className="deadline-date">{moment(post.deadline).format("MMM DD, YYYY HH:mm")}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
