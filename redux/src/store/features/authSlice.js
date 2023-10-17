import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null
  },
  reducers: {
                  // dati generici
    login: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    }
  }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;