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
      state.isLoading = false
      state.mySets = payload.data
    },
    getUserSetsListFailureAction: (state) => {
      state.isLoading = false
    },

    addCardToMySetAction: (state) => {
      state.isLoading = true
    },
    addCardToMySetSuccessAction: (state, { payload }) => {
      state.isLoading = false
      // state.data = payload.data
    },
    addCardToMySetFailureAction: (state) => {
      state.isLoading = false
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
    editUserSetFailureAction: (state) => {
      state.isLoading = false
    },

    deleteUserSetAction: (state, { payload }) => {
      state.isLoading = true;
    },

    deleteUserSetSuccessAction: (state, { payload }) => {
      state.isLoading = false;
    },
    deleteUserSetFailureAction: (state, { payload }) => {
      state.isLoading = false
    },

    quickAddNewSetAction: (state, { payload }) => {
      // state.isLoading = true;
    },
    quickAddNewSetSuccessAction: (state, { payload }) => {
      // state.isLoading = false;
    },
    quickAddNewSetFailureAction: (state) => {
      // state.isLoading = false;
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
  editUserSetFailureAction,
  deleteUserSetAction,
  deleteUserSetSuccessAction,
  deleteUserSetFailureAction,
  quickAddNewSetAction,
  quickAddNewSetSuccessAction,
  quickAddNewSetFailureAction,
} = UserSets.actions

export default UserSets.reducer