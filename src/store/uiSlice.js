import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: localStorage.getItem("darkMode") === "true" || false,
  sidebarOpen: window.innerWidth > 768,
  selectedFilter: "all",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("darkMode", state.isDarkMode);
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSelectedFilter: (state, action) => {
      state.selectedFilter = action.payload;
    },
  },
});

export const { toggleDarkMode, setSidebarOpen, toggleSidebar, setSelectedFilter } = uiSlice.actions;
export default uiSlice.reducer;
