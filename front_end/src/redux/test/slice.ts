import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  message: "",
  examData: [],
}

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    getTestBySetIdAction: (state, { payload }) => {
      state.isLoading = true;
    },
    getTestBySetIdActionSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.examData = payload.data;
    },
    getTestBySetIdErrorAction: (state) => {
      state.isLoading = false;
    },

    submitAnswersAction: (state, { payload }) => {
      state.isLoading = true;
    },
    submitAnswersActionSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.examData = payload.data;
    },
  },

})

export const {
  getTestBySetIdAction,
  getTestBySetIdActionSuccess,
  submitAnswersAction,
  submitAnswersActionSuccess,
  getTestBySetIdErrorAction,
} = testSlice.actions

export default testSlice.reducer