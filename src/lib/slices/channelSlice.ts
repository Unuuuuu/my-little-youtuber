import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ChannelState
  extends Partial<Pick<ChannelData, "id" | "thumbnail" | "title">> {}

const initialState: ChannelState = {};

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    initialize: (
      state,
      action: PayloadAction<Pick<ChannelData, "id" | "thumbnail" | "title">>
    ) => {
      state.id = action.payload.id;
      state.thumbnail = action.payload.thumbnail;
      state.title = action.payload.title;
    },
    finalize: (state) => {
      state.id = undefined;
      state.thumbnail = undefined;
      state.title = undefined;
    },
  },
});

export const { actions: channelSliceActions } = channelSlice;

export default channelSlice;
