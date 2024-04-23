import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  message: "",
  examData: [],
  result: [],
}

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    getTestBySetIdAction: (state, { payload }) => {
      state.isLoading = true;
      state.result = [];
    },
    getTestBySetIdActionSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.examData = payload.data;
      state.result = [];
    },
    getTestBySetIdErrorAction: (state) => {
      state.isLoading = false;
      state.result = [];
    },

    submitAnswersAction: (state, { payload }) => {
      state.isLoading = true;
    },
    submitAnswersActionSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.result = payload.data;
      state.examData = [];
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