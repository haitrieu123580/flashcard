import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  data: [],
}

const Set = createSlice({
  name: 'set',
  initialState,
  reducers: {
    getSetByIdAction: (state, action) => {
      state.isLoading = true
    },
    getSetByIdSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload?.data
    },
    getSetByIdFailedAction: (state) => {
      state.isLoading = false;
    },
    createSetAction: (state, { payload }) => {
      state.isLoading = true;
    },
    createSetSuccessAction: (state, { payload }) => {
      state.isLoading = false
    },
    createSetSFailedAction: (state) => {
      state.isLoading = false;
    },

    editSetAction: (state, { payload }) => {
      state.isLoading = true;
    },

    editSetSuccessAction: (state, { payload }) => {
      state.isLoading = false
    },
    editSetFailedAction: (state) => {
      state.isLoading = false;
    },


    deleteSetAction: (state, { payload }) => {
      state.isLoading = true;
    },

    deleteSetSuccessAction: (state, { payload }) => {
      state.isLoading = false;
    },

    deleteFailedAction: (state) => {
      state.isLoading = true;
    },
  },
})

export const {
  getSetByIdAction,
  getSetByIdSuccessAction,
  getSetByIdFailedAction,
  createSetAction,
  createSetSuccessAction,
  createSetSFailedAction,
  editSetAction,
  editSetSuccessAction,
  editSetFailedAction,
  deleteSetAction,
  deleteSetSuccessAction,
  deleteFailedAction,
} = Set.actions

export default Set.reducer