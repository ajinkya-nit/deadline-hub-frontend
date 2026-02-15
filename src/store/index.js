import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import postReducer from "./postSlice";
import eventReducer from "./eventSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    events: eventReducer,
    ui: uiReducer,
  },
});

export default store;
