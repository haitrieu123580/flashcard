import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  data: [],
  pagination: {

  }
}

const publicSet = createSlice({
  name: 'public-set',
  initialState,
  reducers: {
    getAllSetsAction: (state, action) => {
      state.isLoading = true
    },
    getAllSetsSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload?.data;
      state.pagination = payload?.pagination;
    },
    getAllSetsFailedAction: (state) => {
      state.isLoading = false;
      state.data = [];
      state.pagination = {};
    },
  },
})

export const {
  getAllSetsAction,
  getAllSetsSuccessAction,
  getAllSetsFailedAction
} = publicSet.actions

export default publicSet.reducer