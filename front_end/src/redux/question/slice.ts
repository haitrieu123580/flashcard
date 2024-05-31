import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  message: "",
  data: [],
}

const questionSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    getQuestionsListBySetIdAction: (state, { payload }) => {
      state.isLoading = true;
    },
    getQuestionsListBySetIdSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload.data;
    },
    getQuestionsListBySetIdFailedAction: (state) => {
      state.isLoading = false;
      state.data = [];
    },

    editQuestionAction: (state, { payload }) => {
      state.isLoading = true;
    },
    editQuestionSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload.data;
    },

    deleteQuestionAction: (state, { payload }) => {
      state.isLoading = true;
    },
    deleteQuestionSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload.data;
    },
    deleteQuestionErrorAction: (state) => {
      state.isLoading = false;
    },

    createQuestionAction: (state, { payload }) => {
      state.isLoading = true;
    },
    createQuestionSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload.data;
    },
    createQuestionErrorAction: (state) => {
      state.isLoading = false;
    },

    createTestKitAction: (state, { payload }) => {
      state.isLoading = true;
    },
    createTestKitSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload.data;
    },
    createTestKitErrorAction: (state) => {
      state.isLoading = false;
    },

  },

})

export const {
  getQuestionsListBySetIdAction,
  getQuestionsListBySetIdSuccessAction,
  getQuestionsListBySetIdFailedAction,
  editQuestionAction,
  editQuestionSuccessAction,
  deleteQuestionAction,
  deleteQuestionSuccessAction,
  deleteQuestionErrorAction,
  createQuestionAction,
  createQuestionSuccessAction,
  createQuestionErrorAction,
  createTestKitAction,
  createTestKitSuccessAction,
  createTestKitErrorAction,
} = questionSlice.actions

export default questionSlice.reducer