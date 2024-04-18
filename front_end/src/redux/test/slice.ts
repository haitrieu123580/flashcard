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

    submitAnswersAction: (state, { payload }) => {
      state.isLoading = true;
    },
    submitAnswersActionSuccess: (state, { payload }) => {
      console.log("payload", payload.data)
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
} = testSlice.actions

export default testSlice.reducer