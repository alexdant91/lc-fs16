import { createSlice } from '@reduxjs/toolkit'
import { internalMemory } from '../../utilities/memory';

const authSlice = () => {
  const auth = internalMemory.get('auth');

  return createSlice({
    name: 'auth',
    initialState: {
      // Se sono presenti a riga 5 se no 'null'
      user: auth?.user || null,
      token: auth?.token || null
    },
    reducers: {
      // dati generici (payload) presi da axios o fetch
      login: (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;

        internalMemory.set('auth', { ...payload });
      },
      logout: (state) => {
        state.user = null;
        state.token = null;

        internalMemory.remove('auth');
      }
    }
  })
}

export const { login, logout } = authSlice().actions;

export default authSlice().reducer;