import { createSlice } from "@reduxjs/toolkit";

interface LoginRequestSnackbarState {
  isOpen: boolean;
}

const initialState: LoginRequestSnackbarState = {
  isOpen: false,
};

const loginRequestSnackbarSlice = createSlice({
  name: "loginRequestSnackbar",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
  },
});

export const { actions: loginRequestSnackbarActions } =
  loginRequestSnackbarSlice;

export default loginRequestSnackbarSlice;
