import { createSlice } from "@reduxjs/toolkit";
import internalMemory from "../../utilities/memory";

const authSlice = () => {
  const auth = internalMemory.get("auth");

  return createSlice({
    name: "auth",
    initialState: {
      user: auth?.user || null,
      token: auth?.token || null,
    },
    reducers: {
      login: (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        internalMemory.set("auth", action.payload);
      },
      logout: (state) => {
        state.user = null;
        state.token = null;
        internalMemory.remove("auth");
      },
    },
  });
};

export const { login, logout } = authSlice().actions;

export default authSlice().reducer;
