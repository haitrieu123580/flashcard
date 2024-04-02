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
      state.isLoading = false,
        state.data = payload?.data
    },
  },
})

export const {
  getSetByIdAction,
  getSetByIdSuccessAction,
} = Set.actions

export default Set.reducer