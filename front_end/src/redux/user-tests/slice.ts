import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  data: [],
  result: [],
  history: [],
};

const userTestSlice = createSlice({
  name: 'user-test',
  initialState,
  reducers: {
    createQuestionsBySetIdAction: (state, { payload }) => {
      state.isLoading = true;
    },
    createQuestionsBySetIdSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload.data;
    },
    createQuestionsBySetIdFailedAction: (state) => {
      state.isLoading = false;
      state.data = [];
    },

    saveUserAnswerAction: (state, { payload }) => {
      state.isLoading = true;
      state.result = [];
    },
    saveUserAnswerSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.result = payload.data;
    },
    saveUserAnswerFailedAction: (state) => {
      state.isLoading = false;
      state.result = [];
    },
    getTestHistoryBySetIdAction: (state, { payload }) => {
      state.isLoading = true;
    },
    getTestHistoryBySetIdSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.history = payload.data;
    },
    getTestHistoryBySetIdFailedAction: (state) => {
      state.isLoading = false;
      state.history = [];
    },

    getUserTestResultAction: (state, { payload }) => {
      state.isLoading = true;
    },
    getUserTestResultSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.result = payload.data;
    },
    getUserTestResultFailedAction: (state) => {
      state.isLoading = false;
      state.result = [];
    },
  },
});

export const {
  createQuestionsBySetIdAction,
  createQuestionsBySetIdSuccessAction,
  createQuestionsBySetIdFailedAction,
  saveUserAnswerAction,
  saveUserAnswerSuccessAction,
  saveUserAnswerFailedAction,
  getTestHistoryBySetIdAction,
  getTestHistoryBySetIdSuccessAction,
  getTestHistoryBySetIdFailedAction,
  getUserTestResultAction,
  getUserTestResultSuccessAction,
  getUserTestResultFailedAction,
} = userTestSlice.actions;

export default userTestSlice.reducer;
