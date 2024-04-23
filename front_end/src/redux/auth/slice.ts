import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  token: localStorage.getItem("access_token") || "",
  refresh_token: localStorage.getItem("refresh_token") || "",
  loggedIn: localStorage.getItem("access_token") ? true : false,
  profile: null
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

    loginActionError: (state) => {
      state.isLoading = false;
      state.loggedIn = false;
    },

    getProfileAction: (state, { payload }) => {
      state.isLoading = true;
    },

    getProfileActionSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.profile = payload.data;
    },

    getProfileActionError: (state) => {
      state.isLoading = false;
      state.profile = null;
    },

    getAccessTokenByRefreshTokenAction: (state, { payload }) => {
      state.isLoading = true;
      state.profile = payload.data;
    },

    getAccessTokenByRefreshTokenActionSuccess: (state, { payload }) => {
    },

    registerAction: (state, { payload }) => {
      state.isLoading = true;
    },

    registerActionSuccess: (state, { payload }) => {
      state.isLoading = false;
    },

    registerActionError: (state) => {
      state.isLoading = false;
    },

    loginSuccessWithOauthAction: (state) => {

    },

    logoutAction: (state, { payload }) => {
      state.loggedIn = true;
      // localStorage.removeItem("access_token");
      // localStorage.removeItem("refresh_token");
    },
    logoutSuccessAction: (state) => {
      state.loggedIn = false;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
    logoutErrorsAction: (state) => {
      state.loggedIn = false;
    },
  },

})

export const {
  loginAction,
  loginActionSuccess,
  loginActionError,
  getProfileAction,
  getProfileActionSuccess,
  getProfileActionError,
  getAccessTokenByRefreshTokenAction,
  getAccessTokenByRefreshTokenActionSuccess,
  registerAction,
  registerActionSuccess,
  registerActionError,
  loginSuccessWithOauthAction,
  logoutAction,
  logoutSuccessAction,
  logoutErrorsAction,
} = authSlice.actions

export default authSlice.reducer