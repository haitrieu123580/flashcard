import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  data: [],
}

const pendingSet = createSlice({
  name: 'pending-set',
  initialState,
  reducers: {
    getPendingSetsListAction: (state, action) => {
      state.isLoading = true
    },
    getPendingSetsListSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload?.data
    },
    getPendingSetsListErrorAction: (state) => {
      state.isLoading = false;
    },

    getSetByAdminAction: (state, action) => {
      state.isLoading = true
    },
    getSetByAdminSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload?.data
    },
    getSetByAdminErrorAction: (state) => {
      state.isLoading = false;
    },

    approveSetAction: (state, action) => {
      state.isLoading = true
    },
    approveSetSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload?.data
    },
    approveSetErrorAction: (state) => {
      state.isLoading = false;
    },

    rejectSetAction: (state, action) => {
      state.isLoading = true
    },
    rejectSetSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload?.data
    },
    rejectSetErrorAction: (state) => {
      state.isLoading = false;
    },

  },
})

export const {
  getPendingSetsListAction,
  getPendingSetsListErrorAction,
  getPendingSetsListSuccessAction,

  getSetByAdminAction,
  getSetByAdminErrorAction,
  getSetByAdminSuccessAction,

  approveSetAction,
  approveSetErrorAction,
  approveSetSuccessAction,

  rejectSetAction,
  rejectSetErrorAction,
  rejectSetSuccessAction,
} = pendingSet.actions

export default pendingSet.reducer