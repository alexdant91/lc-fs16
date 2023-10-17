import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";

export default configureStore({
  reducer: {
    auth: authSlice
  }
})