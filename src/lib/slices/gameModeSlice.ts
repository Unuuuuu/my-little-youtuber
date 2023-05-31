import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

interface GameModeState {
  isOpen: boolean;
}

const initialState: GameModeState = {
  isOpen: false,
};

export const gameModeSlice = createSlice({
  name: "gameMode",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
    // complete: (state, action: PayloadAction<CompleteType>) => {
    //   state.isComplete = true;
    //   state.completeType = action.payload;
    // },
  },
});

export const { actions: gameModeSliceActions } = gameModeSlice;

export default gameModeSlice;
