import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  data: [],
}

const publicSet = createSlice({
  name: 'public-set',
  initialState,
  reducers: {
  },

})

export const {

} = publicSet.actions

export default publicSet.reducer