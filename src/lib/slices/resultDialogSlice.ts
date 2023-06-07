import { createSlice } from "@reduxjs/toolkit";

interface ResultDialogSliceState {
  isOpen: boolean;
  videoId?: string;
}

const initialState: ResultDialogSliceState = {
  isOpen: false,
};

export const resultDialogSlice = createSlice({
  name: "resultDialog",
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

export const { actions: resultDialogSliceActions } = resultDialogSlice;

export default resultDialogSlice;
