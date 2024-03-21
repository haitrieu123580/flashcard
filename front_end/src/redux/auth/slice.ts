import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  token: localStorage.getItem("access_token") || "",
  refresh_token: localStorage.getItem("refresh_token") || "",
  loggedIn: localStorage.getItem("access_token") ? true : false,
  profile: {}
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //eslint-disable-next-line
    loginAction: (state, { payload }) => {
      state.isLoading = true;
      state.loggedIn = false;
    },

    loginActionSuccess: (state, { payload }) => {
      state.isLoading = false;
      localStorage.setItem("access_token", String(payload.data.access_token));
      localStorage.setItem("refresh_token", String(payload.data.refresh_token));
      state.token = String(payload.data.access_token);
      state.refresh_token = String(payload.data.refresh_token);
      state.loggedIn = true;
    },

    getProfileAction: (state, { payload }) => {
      state.isLoading = true;
    },

    getProfileActionSuccess: (state, { payload }) => {
      console.log("payload in slice: ", payload.data)
      state.isLoading = false;
      state.profile = payload.data;
    },

    getAccessTokenByRefreshTokenAction: (state, { payload }) => {
      state.isLoading = true;

    },

    getAccessTokenByRefreshTokenActionSuccess: (state, { payload }) => {
    },

    registerAction: (state, { payload }) => {
      state.isLoading = true;
    },

    registerActionSuccess: (state, { payload }) => {
      state.isLoading = false;
    },

    logoutAction: (state) => {
      state.loggedIn = false;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  },

})

export const {
  loginAction,
  loginActionSuccess,
  getProfileAction,
  getProfileActionSuccess,
  getAccessTokenByRefreshTokenAction,
  getAccessTokenByRefreshTokenActionSuccess,
  registerAction,
  registerActionSuccess,
  logoutAction,
} = authSlice.actions

export default authSlice.reducer