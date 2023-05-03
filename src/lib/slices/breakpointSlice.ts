import { Breakpoint } from "@mui/material/styles";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface BreakpointState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const initialState: BreakpointState = {
  isMobile: false,
  isTablet: false,
  isDesktop: false,
};

export const breakpointSlice = createSlice({
  name: "breakpoint",
  initialState,
  reducers: {
    update: (
      state,
      action: PayloadAction<{ breakpoint: Breakpoint; value: boolean }>
    ) => {
      switch (action.payload.breakpoint) {
        case "mobile":
          state.isMobile = action.payload.value;
          break;
        case "tablet":
          state.isTablet = action.payload.value;
          break;
        case "desktop":
          state.isDesktop = action.payload.value;
          break;
      }
    },
  },
});

export const { actions: breakpointSliceActions } = breakpointSlice;

export default breakpointSlice;
