import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  data: [],
}

const publicSet = createSlice({
  name: 'public-set',
  initialState,
  reducers: {
    getAllSetsAction: (state, action) => {
      state.isLoading = true
      // console.log('getAllSetsAction', action.payload)
    },
    getAllSetsSuccessAction: (state, { payload }) => {
      state.isLoading = false,
        state.data = payload?.data
    },
  },
})

export const {
  getAllSetsAction,
  getAllSetsSuccessAction,
} = publicSet.actions

export default publicSet.reducer