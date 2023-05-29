import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface HomeTabsState {
  value: string;
}

const initialState: HomeTabsState = {
  value: "home",
};

export const homeTabsSlice = createSlice({
  name: "homeTabs",
  initialState,
  reducers: {
    updateValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { actions: homeTabsSliceActions } = homeTabsSlice;

export default homeTabsSlice;
