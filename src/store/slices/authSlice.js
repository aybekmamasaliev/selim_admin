import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: '',
    refreshToken: sessionStorage.getItem('refreshToken') || '',
    isLoggedIn: false,
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.accessToken = payload.access;
      state.refreshToken = payload.refresh;
      state.isLoggedIn = true;
    },
    logOut: (state, action) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.isLoggedIn = false;
    },
    updateAccessToken: (state, { payload }) => {
      state.accessToken = payload.access;
    },
  },
  extraReducers: (builder) => {},
});

export const { setCredentials, logOut, updateAccessToken } = authSlice.actions;

export default authSlice.reducer;
