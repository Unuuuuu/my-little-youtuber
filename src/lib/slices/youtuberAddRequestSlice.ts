import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type CompleteType = "WITH_EMAIL" | "WITHOUT_EMAIL";

interface YoutuberAddRequestState {
  isOpen: boolean;
  isComplete: boolean;
  completeType?: CompleteType;
}

const initialState: YoutuberAddRequestState = {
  isOpen: false,
  isComplete: false,
};

export const youtuberAddRequestSlice = createSlice({
  name: "youtuberAddRequest",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
      state.isComplete = false;
    },
    close: (state) => {
      state.isOpen = false;
    },
    complete: (state, action: PayloadAction<CompleteType>) => {
      state.isComplete = true;
      state.completeType = action.payload;
    },
    reset: (state) => {
      state.isComplete = false;
    },
  },
});

export const { actions: youtuberAddRequestSliceActions } =
  youtuberAddRequestSlice;

export default youtuberAddRequestSlice;
