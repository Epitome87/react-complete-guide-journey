import { createSlice } from '@reduxjs/toolkit';

const initialUiState = { isCartVisible: false };

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUiState,
  reducers: {
    toggleCart(state) {
      state.isCartVisible = !state.isCartVisible;
    },
  },
});

export const uiActions = uiSlice.actions;