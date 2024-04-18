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

    createQuestionAction: (state, { payload }) => {
      state.isLoading = true;
    },
    createQuestionSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload.data;
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
  createQuestionAction,
  createQuestionSuccessAction,
} = questionSlice.actions

export default questionSlice.reducer