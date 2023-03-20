import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isKakaotalkGuideModalOpen: boolean;
  isYoutuberAddRequestModalOpen: boolean;
  isYoutubePlayerModalOpen: boolean;
  youtubePlayerVideoId?: string;
  isGameModeModalOpen: boolean;
  gameModeModalChannelId?: string;
  gameModeModalChannelUpdateTime?: string;
}

const initialState: ModalState = {
  isKakaotalkGuideModalOpen: false,
  isYoutuberAddRequestModalOpen: false,
  isYoutubePlayerModalOpen: false,
  isGameModeModalOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openKakaotalkGuideModal: (state) => {
      state.isKakaotalkGuideModalOpen = true;
    },
    closeKakaotalkGuideModal: (state) => {
      state.isKakaotalkGuideModalOpen = false;
    },
    openYoutuberAddRequestModal: (state) => {
      state.isYoutuberAddRequestModalOpen = true;
    },
    closeYoutuberAddRequestModal: (state) => {
      state.isYoutuberAddRequestModalOpen = false;
    },
    openYoutubePlayerModal: (state, action: PayloadAction<string>) => {
      state.isYoutubePlayerModalOpen = true;
      state.youtubePlayerVideoId = action.payload;
    },
    closeYoutubePlayerModal: (state) => {
      state.isYoutubePlayerModalOpen = false;
      state.youtubePlayerVideoId = undefined;
    },
    openGameModeModal: (
      state,
      action: PayloadAction<{ channelId: string; channelUpdateTime: string }>
    ) => {
      state.isGameModeModalOpen = true;
      state.gameModeModalChannelId = action.payload.channelId;
      state.gameModeModalChannelUpdateTime = action.payload.channelUpdateTime;
    },
    closeGameModeModal: (state) => {
      state.isGameModeModalOpen = false;
      state.gameModeModalChannelId = undefined;
      state.gameModeModalChannelUpdateTime = undefined;
    },
  },
});

export const { actions: modalSliceActions } = modalSlice;

export default modalSlice;
