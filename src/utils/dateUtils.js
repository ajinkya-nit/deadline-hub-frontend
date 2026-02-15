export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getTimeRemaining = (deadline) => {
  const now = new Date();
  const diff = new Date(deadline) - now;

  if (diff < 0) return "Overdue";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);

  if (days > 0) {
    return `${days}d ${hours}h`;
  }
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

export const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "#dc2626";
    case "medium":
      return "#f59e0b";
    case "low":
      return "#10b981";
    default:
      return "#4f46e5";
  }
};

export const getStatusClass = (deadline) => {
  const now = new Date();
  const diff = new Date(deadline) - now;
  const hoursLeft = diff / (1000 * 60 * 60);

  if (hoursLeft < 0) return "danger";
  if (hoursLeft < 24) return "danger";
  if (hoursLeft < 72) return "warning";
  return "success";
};
