import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  mySets: [],
}

const UserSets = createSlice({
  name: 'user-sets',
  initialState,
  reducers: {
    getUserSetsListAction: (state) => {
      state.isLoading = true
    },
    getUserSetsListSuccessAction: (state, { payload }) => {
      state.isLoading = false
      state.mySets = payload.data
    },
    getUserSetsListFailureAction: (state) => {
      state.isLoading = true
    },

    addCardToMySetAction: (state) => {
      state.isLoading = true
    },
    addCardToMySetSuccessAction: (state, { payload }) => {
      state.isLoading = false
      // state.data = payload.data
    },
    addCardToMySetFailureAction: (state) => {
      state.isLoading = true
    },
  }
})

export const {
  getUserSetsListSuccessAction,
  getUserSetsListFailureAction,
  getUserSetsListAction,
  addCardToMySetAction,
  addCardToMySetSuccessAction,
  addCardToMySetFailureAction,
} = UserSets.actions

export default UserSets.reducer