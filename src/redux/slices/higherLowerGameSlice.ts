import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Video } from "@/types";
import { HigherLowerGameChannelIdProps } from "@/pages/higher-lower-game/[channelId]";

const getRamdomIndexOfArray = (lengthOfArray: number) => {
  return Math.floor(Math.random() * lengthOfArray);
};

const calculateVideos = (
  videos: Video[]
): { manipulatedVideos: Video[]; selectedVideos: Video[] } => {
  const copiedVideos = [...videos];

  const randomIndex = getRamdomIndexOfArray(copiedVideos.length);
  const [leftSelectedVideo] = copiedVideos.splice(randomIndex, 1);
  const anotherRandomIndex = getRamdomIndexOfArray(copiedVideos.length);
  const [rightSelectedVideo] = copiedVideos.splice(anotherRandomIndex, 1);

  return {
    manipulatedVideos: copiedVideos,
    selectedVideos: [leftSelectedVideo, rightSelectedVideo],
  };
};

type Status = "IDLE" | "PENDING" | "FAILED" | "SUCCEEDED";

interface HigherLowerGameState {
  title?: string;
  thumbnail?: {
    url: string;
    blurDataURL: string;
  };
  isInitialized: boolean;
  status: Status;
  originalVideos: Video[];
  manipulatedVideos: Video[];
  selectedVideos: Video[];
  selectedVideoId: string | null;
  count: number;

  // youtube modal
  isYoutubeModalOpen: boolean;
  youtubeModalVideoId?: string;
}

const initialState: HigherLowerGameState = {
  isInitialized: false,
  status: "IDLE",
  originalVideos: [],
  manipulatedVideos: [],
  selectedVideos: [],
  selectedVideoId: null,
  count: 0,

  // youtube modal
  isYoutubeModalOpen: false,
};

const higherLowerGameSlice = createSlice({
  name: "higherLowerGame",
  initialState,
  reducers: {
    initialize: (
      state,
      action: PayloadAction<HigherLowerGameChannelIdProps>
    ) => {
      const { title, thumbnail, videos } = action.payload;
      state.title = title;
      state.thumbnail = thumbnail;
      state.isInitialized = true;
      state.originalVideos = videos;

      const {
        manipulatedVideos: newManipulatedVideos,
        selectedVideos: newSelectedVideos,
      } = calculateVideos(videos);
      state.manipulatedVideos = newManipulatedVideos;
      state.selectedVideos = newSelectedVideos;
    },
    finalize: (state) => {
      state.isInitialized = false;
      state.status = "IDLE";
      state.originalVideos = [];
      state.manipulatedVideos = [];
      state.selectedVideos = [];
      state.selectedVideoId = null;
      state.count = 0;
      state.isYoutubeModalOpen = false;
    },
    click: (state, action: PayloadAction<string>) => {
      if (state.status !== "IDLE") {
        return;
      }

      state.selectedVideoId = action.payload;
      state.status = "PENDING";
    },
    compare: (state) => {
      const selectedVideos = state.selectedVideos;
      let viewCount: number;
      let oppositeViewCount: number;
      if (selectedVideos[0].id === state.selectedVideoId) {
        viewCount = Number(selectedVideos[0].viewCount);
        oppositeViewCount = Number(selectedVideos[1].viewCount);
      } else {
        viewCount = Number(selectedVideos[1].viewCount);
        oppositeViewCount = Number(selectedVideos[0].viewCount);
      }

      if (viewCount >= oppositeViewCount) {
        state.status = "SUCCEEDED";
        state.count++;
      } else {
        state.status = "FAILED";
      }
    },
    reset: (state) => {
      state.status = "IDLE";

      const {
        manipulatedVideos: newManipulatedVideos,
        selectedVideos: newSelectedVideos,
      } = calculateVideos(state.originalVideos);
      state.manipulatedVideos = newManipulatedVideos;
      state.selectedVideos = newSelectedVideos;
      state.selectedVideoId = null;
      state.count = 0;
    },
    next: (state) => {
      state.status = "IDLE";

      let targetVideos: Video[];
      if (state.manipulatedVideos.length < 2) {
        targetVideos = state.originalVideos;
      } else {
        targetVideos = state.manipulatedVideos;
      }

      const {
        manipulatedVideos: newManipulatedVideos,
        selectedVideos: newSelectedVideos,
      } = calculateVideos(targetVideos);
      state.manipulatedVideos = newManipulatedVideos;
      state.selectedVideos = newSelectedVideos;
      state.selectedVideoId = null;
    },
    openYoutubeModal: (state, action: PayloadAction<string>) => {
      state.isYoutubeModalOpen = true;
      state.youtubeModalVideoId = action.payload;
    },
    closeYoutubeModal: (state) => {
      state.isYoutubeModalOpen = false;
    },
  },
});

export const { actions: higherLowerGameActions } = higherLowerGameSlice;

export default higherLowerGameSlice;
