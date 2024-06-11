import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  data: [],
};

const userProfile = createSlice({
  name: 'user-profile',
  initialState,
  reducers: {
    editUserAction: (state, action) => {
      state.isLoading = true;
    },

    editUserSuccessAction: (state, action) => {
      state.isLoading = false;
    },

    editUserErrorAction: (state) => {
      state.isLoading = false;
    },
  },
});

export const { editUserSuccessAction, editUserAction, editUserErrorAction } =
  userProfile.actions;

export default userProfile.reducer;
