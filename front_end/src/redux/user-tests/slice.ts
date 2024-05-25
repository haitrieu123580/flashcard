import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  data: [],
}

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
    },
    saveUserAnswerSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload.data;
    },
    saveUserAnswerFailedAction: (state) => {
      state.isLoading = false;
      state.data = [];
    },
  },

})

export const {
  createQuestionsBySetIdAction,
  createQuestionsBySetIdSuccessAction,
  createQuestionsBySetIdFailedAction,
  saveUserAnswerAction,
  saveUserAnswerSuccessAction,
  saveUserAnswerFailedAction,

} = userTestSlice.actions

export default userTestSlice.reducer