import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async ({ page = 1, limit = 12, category }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/events`, {
        params: { page, limit, category },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/events`, eventData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${API_URL}/events/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  events: [],
  total: 0,
  pages: 0,
  currentPage: 1,
  isLoading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload.data;
        state.total = action.payload.total;
        state.pages = action.payload.pages;
        state.currentPage = action.payload.currentPage || 1;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch events";
      })
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to create event";
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex((e) => e._id === action.payload._id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((e) => e._id !== action.payload);
        state.total -= 1;
      });
  },
});

export const { clearError } = eventSlice.actions;
export default eventSlice.reducer;
