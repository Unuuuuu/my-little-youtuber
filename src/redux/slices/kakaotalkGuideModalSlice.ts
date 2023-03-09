import { createSlice } from "@reduxjs/toolkit";

interface KakaotalkGuideModalState {
  isOpen: boolean;
}

const initialState: KakaotalkGuideModalState = {
  isOpen: false,
};

const kakaotalkGuideModalSlice = createSlice({
  name: "kakaotalkGuideModal",
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

export const { actions: kakaotalkGuideModalActions } = kakaotalkGuideModalSlice;

export default kakaotalkGuideModalSlice;
