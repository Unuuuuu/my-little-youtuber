import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  isDialogOpen: boolean;
  inputValue: string;
  query: string | null;
}

const initialState: SearchState = {
  isDialogOpen: false,
  inputValue: "",
  query: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    openDialog: (state) => {
      state.isDialogOpen = true;
    },
    closeDialog: (state) => {
      state.isDialogOpen = false;
    },
    submit: (state) => {
      state.query = state.inputValue;
    },
    updateInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
  },
});

export const { actions: searchSliceActions } = searchSlice;

export default searchSlice;
