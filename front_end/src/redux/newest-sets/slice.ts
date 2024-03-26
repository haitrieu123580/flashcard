import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  data: [],
}

const newsetSets = createSlice({
  name: 'newest-set',
  initialState,
  reducers: {
    getNewestSetsAction: (state, action) => {
    },
    getNewestSetsSuccessAction: (state, { payload }) => {
      state.isLoading = false
      state.data = payload?.data
    },
  },
})

export const {
  getNewestSetsAction,
  getNewestSetsSuccessAction,
} = newsetSets.actions

export default newsetSets.reducer