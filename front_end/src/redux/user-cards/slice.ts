import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  data: [],
}

const userCard = createSlice({
  name: 'user-cards',
  initialState,
  reducers: {

    editUserCardAction: (state, action) => {
    },

    editUserCardSuccessAction: (state, action) => {
    },

    createUserCardAction: (state, action) => {
    },

    createUserCardSuccessAction: (state, action) => {
    },

    deleteUserCardAction: (state, action) => {
    },

    deleteUserCardSuccessAction: (state, action) => {
    },

  },
})

export const {
  editUserCardAction,
  editUserCardSuccessAction,
  createUserCardAction,
  createUserCardSuccessAction,
  deleteUserCardAction,
  deleteUserCardSuccessAction,
} = userCard.actions

export default userCard.reducer