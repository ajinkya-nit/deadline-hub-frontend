import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, createEvent } from "../store/eventSlice";
import EventCard from "../components/EventCard";
import CreateEventModal from "../components/CreateEventModal";
import { Plus, Search } from "lucide-react";
import "./Events.css";

const Events = () => {
  const dispatch = useDispatch();
  const { events, pages, currentPage } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    dispatch(fetchEvents({ page: currentPage, limit: 12, category: category !== "all" ? category : undefined }));
  }, [dispatch, currentPage, category]);

  const categories = [
    { value: "all", label: "All Events" },
    { value: "technical", label: "Technical" },
    { value: "cultural", label: "Cultural" },
    { value: "sports", label: "Sports" },
    { value: "academic", label: "Academic" },
  ];

  const filteredEvents = events.filter((event) =>
    event.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="events-page">
      <div className="page-header">
        <div>
          <h1>🎉 Campus Events</h1>
          <p>Discover and attend amazing campus events</p>
        </div>
        {user?.role === "student" && (
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={18} /> Post Event
          </button>
        )}
      </div>

      <div className="events-controls">
        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="category-filter">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`category-btn ${category === cat.value ? "active" : ""}`}
              onClick={() => setCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="events-masonry">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No events found. 📢</p>
        </div>
      )}

      {/* Create Event Modal */}
      <CreateEventModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </div>
  );
};

export default Events;
