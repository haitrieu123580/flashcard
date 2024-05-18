import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  data: [],
}

const userProfile = createSlice({
  name: 'user-profile',
  initialState,
  reducers: {

    editUserAction: (state, action) => {
    },

    editUserSuccessAction: (state, action) => {
    },

    editUserErrorAction: (state) => {
    },



  },
})

export const {
  editUserSuccessAction,
  editUserAction,
  editUserErrorAction,
} = userProfile.actions

export default userProfile.reducer