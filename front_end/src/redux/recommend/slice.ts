import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  data: [],
};

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    getRecommendSetsBySetIdAction: (state, { payload }) => {
      state.isLoading = true;
      state.data = [];
    },
    getRecommendSetsBySetIdActionSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload.data;
    },
    getRecommendSetsBySetIdErrorAction: (state) => {
      state.isLoading = false;
      state.data = [];
    },
  },
});

export const {
  getRecommendSetsBySetIdAction,
  getRecommendSetsBySetIdActionSuccess,
  getRecommendSetsBySetIdErrorAction,
} = recommendSlice.actions;

export default recommendSlice.reducer;
