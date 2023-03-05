import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { VideoData } from "@/types";

const getRamdomIndexOfArray = (lengthOfArray: number) => {
  return Math.floor(Math.random() * lengthOfArray);
};

const getRandomVideos = (
  videos: VideoData[]
): { manipulatedVideos: VideoData[]; randomVideos: VideoData[] } => {
  const copiedVideos = [...videos];

  const randomIndex = getRamdomIndexOfArray(copiedVideos.length);
  const [randomVideo] = copiedVideos.splice(randomIndex, 1);
  const anotherRandomIndex = getRamdomIndexOfArray(copiedVideos.length);
  const [anotherRandomVideo] = copiedVideos.splice(anotherRandomIndex, 1);

  if (randomVideo.viewCount === anotherRandomVideo.viewCount) {
    return getRandomVideos(videos);
  }

  return {
    manipulatedVideos: copiedVideos,
    randomVideos: [randomVideo, anotherRandomVideo],
  };
};

const calculateVideos = (
  videos: VideoData[]
): {
  manipulatedVideos: VideoData[];
  randomVideos: VideoData[];
  higherRandomVideo: VideoData;
} => {
  const { manipulatedVideos, randomVideos } = getRandomVideos(videos);
  const [leftRandomVideo, rightRandomVideo] = randomVideos;

  let higherRandomVideo: VideoData;
  if (leftRandomVideo.viewCount > rightRandomVideo.viewCount) {
    higherRandomVideo = leftRandomVideo;
  } else {
    higherRandomVideo = rightRandomVideo;
  }

  return {
    manipulatedVideos,
    randomVideos,
    higherRandomVideo,
  };
};

type Status = "IDLE" | "PENDING" | "FAILED" | "SUCCEEDED";

type Mode = "GENERAL" | "RANK";

const TIME = 10;

interface HigherLowerGameState {
  isInitialized: boolean;
  mode: Mode;
  status: Status;
  originalVideos?: VideoData[];
  manipulatedVideos?: VideoData[];
  randomVideos?: VideoData[];
  higherRandomVideo?: VideoData;
  selectedVideoId: string | null;
  streak: number;

  // youtube modal
  isYoutubeModalOpen: boolean;
  youtubeModalVideoId?: string;

  // rank game
  score: number;
  time: number;
}

const initialState: HigherLowerGameState = {
  isInitialized: false,
  mode: "GENERAL",
  status: "IDLE",
  selectedVideoId: null,
  streak: 0,

  // youtube modal
  isYoutubeModalOpen: false,

  // rank game
  score: 0,
  time: TIME,
};

const higherLowerGameSlice = createSlice({
  name: "higherLowerGame",
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<VideoData[]>) => {
      const videos = action.payload;
      const {
        manipulatedVideos: newManipulatedVideos,
        randomVideos: newRandomVideos,
        higherRandomVideo: newHigherRandomVideo,
      } = calculateVideos(videos);

      state.isInitialized = true;
      state.status = "IDLE";
      state.originalVideos = videos;
      state.manipulatedVideos = newManipulatedVideos;
      state.randomVideos = newRandomVideos;
      state.higherRandomVideo = newHigherRandomVideo;
      state.selectedVideoId = null;
      state.streak = 0;

      // youtube modal
      state.isYoutubeModalOpen = false;
      state.youtubeModalVideoId = undefined;

      // rank game
      state.score = 0;
      state.time = TIME;
    },
    finalize: (state) => {
      state.isInitialized = false;
      state.status = "IDLE";
      state.originalVideos = undefined;
      state.manipulatedVideos = undefined;
      state.randomVideos = undefined;
      state.higherRandomVideo = undefined;
      state.selectedVideoId = null;
      state.streak = 0;

      // youtube modal
      state.isYoutubeModalOpen = false;
      state.youtubeModalVideoId = undefined;

      // rank game
      state.score = 0;
      state.time = TIME;
    },
    click: (state, action: PayloadAction<string>) => {
      if (state.isInitialized === false || state.status !== "IDLE") {
        return;
      }

      state.selectedVideoId = action.payload;
      state.status = "PENDING";
    },
    compare: (state) => {
      if (
        state.isInitialized === false ||
        state.status !== "PENDING" ||
        state.selectedVideoId === null ||
        state.higherRandomVideo === undefined
      ) {
        return;
      }

      if (state.selectedVideoId === state.higherRandomVideo.id) {
        state.status = "SUCCEEDED";
        state.streak++;

        if (state.mode === "RANK") {
          state.score = state.score + state.time;
        }
      } else {
        state.status = "FAILED";
      }
    },
    reset: (state) => {
      if (state.isInitialized === false || state.originalVideos === undefined) {
        return;
      }

      const {
        manipulatedVideos: newManipulatedVideos,
        randomVideos: newRandomVideos,
        higherRandomVideo: newHigherRandomVideo,
      } = calculateVideos(state.originalVideos);

      state.status = "IDLE";
      state.manipulatedVideos = newManipulatedVideos;
      state.randomVideos = newRandomVideos;
      state.higherRandomVideo = newHigherRandomVideo;
      state.selectedVideoId = null;
      state.streak = 0;

      // rank game
      if (state.mode === "RANK") {
        state.score = 0;
        state.time = TIME;
      }
    },
    next: (state) => {
      if (
        state.isInitialized === false ||
        state.manipulatedVideos === undefined ||
        state.originalVideos === undefined
      ) {
        return;
      }

      let targetVideos: VideoData[];
      if (state.manipulatedVideos.length < 2) {
        targetVideos = state.originalVideos;
      } else {
        targetVideos = state.manipulatedVideos;
      }

      const {
        manipulatedVideos: newManipulatedVideos,
        randomVideos: newRandomVideos,
        higherRandomVideo: newHigherRandomVideo,
      } = calculateVideos(targetVideos);

      state.status = "IDLE";
      state.manipulatedVideos = newManipulatedVideos;
      state.randomVideos = newRandomVideos;
      state.higherRandomVideo = newHigherRandomVideo;
      state.selectedVideoId = null;

      // rank game
      if (state.mode === "RANK") {
        state.time = TIME;
      }
    },

    // youtube modal
    openYoutubeModal: (state, action: PayloadAction<string>) => {
      if (state.isInitialized === false) {
        return;
      }

      state.isYoutubeModalOpen = true;
      state.youtubeModalVideoId = action.payload;
    },
    closeYoutubeModal: (state) => {
      if (state.isInitialized === false) {
        return;
      }

      state.isYoutubeModalOpen = false;
    },

    // rank game
    updateMode: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.mode = "RANK";
      } else {
        state.mode = "GENERAL";
      }
    },
    updateTime: (state) => {
      state.time--;
    },
    fail: (state) => {
      if (state.isInitialized === false) {
        return;
      }

      state.status = "FAILED";
    },
  },
});

export const { actions: higherLowerGameActions } = higherLowerGameSlice;

export default higherLowerGameSlice;
