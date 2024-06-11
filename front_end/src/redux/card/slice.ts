import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  data: [],
};

const Card = createSlice({
  name: 'card',
  initialState,
  reducers: {
    editCardAction: (state, action) => {},

    editCardSuccessAction: (state, action) => {},

    createCardAction: (state, action) => {},

    createCardSuccessAction: (state, action) => {},

    deleteCardAction: (state, action) => {},

    deleteCardSuccessAction: (state, action) => {},
  },
});

export const {
  editCardAction,
  editCardSuccessAction,
  createCardAction,
  createCardSuccessAction,
  deleteCardAction,
  deleteCardSuccessAction,
} = Card.actions;

export default Card.reducer;
