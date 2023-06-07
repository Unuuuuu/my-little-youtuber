import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface YoutubePlayerModalSliceState {
  isOpen: boolean;
  videoId?: string;
}

const initialState: YoutubePlayerModalSliceState = {
  isOpen: false,
};

export const youtubePlayerModalSliceSlice = createSlice({
  name: "youtubePlayerModalSlice",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.videoId = action.payload;
    },
    close: (state) => {
      state.isOpen = false;
      state.videoId = undefined;
    },
  },
});

export const { actions: youtubePlayerModalSliceSliceActions } =
  youtubePlayerModalSliceSlice;

export default youtubePlayerModalSliceSlice;
