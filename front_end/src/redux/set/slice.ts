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

    createSetAction: (state, { payload }) => {
      state.isLoading = true;
    },
    createSetSuccessAction: (state, { payload }) => {
      state.isLoading = false
    },

    editSetAction: (state, { payload }) => {
      state.isLoading = true;
    },

    editSetSuccessAction: (state, { payload }) => {
      state.isLoading = false
    }
  },
})

export const {
  getSetByIdAction,
  getSetByIdSuccessAction,
  createSetAction,
  createSetSuccessAction,
  editSetAction,
  editSetSuccessAction,
} = Set.actions

export default Set.reducer