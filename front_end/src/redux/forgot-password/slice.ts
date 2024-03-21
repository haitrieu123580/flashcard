import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  email: "",
}

const passwordResetSlice = createSlice({
  name: 'password-reset',
  initialState,
  reducers: {

    forgotPasswordAction: (state, { payload }) => {
      state.isLoading = true;
    },

    forgotPasswordActionSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.email = payload.data.email;
    },

    resetPasswordAction: (state, { payload }) => {
      state.isLoading = true;
    },

    resetPasswordActionSuccess: (state) => {
      state.email = "";
      state.isLoading = false;
    },
  },

})

export const {
  forgotPasswordAction,
  forgotPasswordActionSuccess,
  resetPasswordAction,
  resetPasswordActionSuccess,
} = passwordResetSlice.actions

export default passwordResetSlice.reducer