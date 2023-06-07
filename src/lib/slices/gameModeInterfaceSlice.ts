import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

interface GameModeState {
  isOpen: boolean;
}

const initialState: GameModeState = {
  isOpen: false,
};

export const gameModeInterfaceSlice = createSlice({
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

export const { actions: gameModeInterfaceSliceActions } =
  gameModeInterfaceSlice;

export default gameModeInterfaceSlice;
