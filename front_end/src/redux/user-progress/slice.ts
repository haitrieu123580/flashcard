import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  data: [],
  progress: 0,
};

const userProgress = createSlice({
  name: 'user-progress',
  initialState,
  reducers: {
    updateUserProgressAction: (state, action) => {
      state.isLoading = true;
    },

    updateUserProgressSuccessAction: (state, action) => {
      state.isLoading = false;
    },

    updateUserProgressErrorAction: (state) => {
      state.isLoading = false;
    },

    getUserLearningSetProgressAction: (state, action) => {
      state.isLoading = true;
    },

    getUserLearningSetProgressSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.progress = payload.data;
    },

    getUserLearningSetProgressErrorAction: (state) => {
      state.isLoading = false;
    },

    getUserProgressAction: (state, action) => {
      state.isLoading = true;
    },

    getUserProgressSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload.data;
    },

    getUserProgressErrorAction: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  updateUserProgressAction,
  updateUserProgressSuccessAction,
  updateUserProgressErrorAction,
  getUserLearningSetProgressAction,
  getUserLearningSetProgressSuccessAction,
  getUserLearningSetProgressErrorAction,
  getUserProgressAction,
  getUserProgressSuccessAction,
  getUserProgressErrorAction,
} = userProgress.actions;

export default userProgress.reducer;
