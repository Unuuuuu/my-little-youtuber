import { createSlice } from "@reduxjs/toolkit";

interface SnackbarState {
  isLoginRequestSnackbarOpen: boolean;
}

const initialState: SnackbarState = {
  isLoginRequestSnackbarOpen: false,
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openLoginRequestSnackbar: (state) => {
      state.isLoginRequestSnackbarOpen = true;
    },
    closeLoginRequestSnackbar: (state) => {
      state.isLoginRequestSnackbarOpen = false;
    },
  },
});

export const { actions: snackbarSliceActions } = snackbarSlice;

export default snackbarSlice;
