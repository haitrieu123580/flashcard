import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  mySets: [],
  set: [],
}

const UserSets = createSlice({
  name: 'user-sets',
  initialState,
  reducers: {
    getUserSetsListAction: (state) => {
      state.isLoading = true
    },
    getUserSetsListSuccessAction: (state, { payload }) => {
      console.log("payload: ", payload.data)
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

    getUserSetByIdAction: (state) => {
      state.isLoading = true
    },
    getUserSetByIdSuccessAction: (state, { payload }) => {
      state.isLoading = false
      state.set = payload.data
    },
    getUserSetByIdFailureAction: (state) => {
      state.isLoading = false
    },
    createUserSetAction: (state, { payload }) => {
      state.isLoading = true;
    },
    createUserSetSuccessAction: (state, { payload }) => {
      state.isLoading = false
    },
    editUserSetAction: (state, { payload }) => {
      state.isLoading = true;
    },

    editUserSetSuccessAction: (state, { payload }) => {
      state.isLoading = false
    },

    deleteUserSetAction: (state, { payload }) => {
      state.isLoading = true;
    },

    deleteUserSetSuccessAction: (state, { payload }) => {
      state.isLoading = false;
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
  getUserSetByIdAction,
  getUserSetByIdSuccessAction,
  getUserSetByIdFailureAction,
  createUserSetAction,
  createUserSetSuccessAction,
  editUserSetAction,
  editUserSetSuccessAction,
  deleteUserSetAction,
  deleteUserSetSuccessAction,
} = UserSets.actions

export default UserSets.reducer