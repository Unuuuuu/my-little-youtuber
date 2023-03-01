import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ChannelData, VideoData } from "@/types";

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

interface HigherLowerGameState {
  isInitialized: boolean;
  title?: string;
  thumbnail?: {
    url: string;
    blurDataURL: string;
  };
  status: Status;
  originalVideos?: VideoData[];
  manipulatedVideos?: VideoData[];
  randomVideos?: VideoData[];
  higherRandomVideo?: VideoData;
  selectedVideoId: string | null;
  score: number;

  // youtube modal
  isYoutubeModalOpen: boolean;
  youtubeModalVideoId?: string;

  // time limit
  isTimeLimitedMode: boolean;
  time: number;
}

const initialState: HigherLowerGameState = {
  isInitialized: false,
  status: "IDLE",
  selectedVideoId: null,
  score: 0,

  // youtube modal
  isYoutubeModalOpen: false,

  // time limit
  isTimeLimitedMode: false,
  time: 10,
};

const higherLowerGameSlice = createSlice({
  name: "higherLowerGame",
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<ChannelData>) => {
      state.isInitialized = true;
      const { title, thumbnail, videos } = action.payload;
      state.title = title;
      state.thumbnail = thumbnail;
      state.originalVideos = videos;

      const {
        manipulatedVideos: newManipulatedVideos,
        randomVideos: newRandomVideos,
        higherRandomVideo: newHigherRandomVideo,
      } = calculateVideos(videos);
      state.manipulatedVideos = newManipulatedVideos;
      state.randomVideos = newRandomVideos;
      state.higherRandomVideo = newHigherRandomVideo;
    },
    finalize: (state) => {
      state.isInitialized = false;
      state.title = undefined;
      state.thumbnail = undefined;
      state.status = "IDLE";
      state.originalVideos = undefined;
      state.manipulatedVideos = undefined;
      state.randomVideos = undefined;
      state.higherRandomVideo = undefined;
      state.selectedVideoId = null;
      state.score = 0;

      // youtube modal
      state.isYoutubeModalOpen = false;
      state.youtubeModalVideoId = undefined;

      // time limit
      state.time = 10;
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
        if (state.isTimeLimitedMode) {
          state.score = state.score + state.time;
        } else {
          state.score++;
        }
      } else {
        state.status = "FAILED";
      }
    },
    reset: (state) => {
      if (state.isInitialized === false || state.originalVideos === undefined) {
        return;
      }

      state.status = "IDLE";

      const {
        manipulatedVideos: newManipulatedVideos,
        randomVideos: newRandomVideos,
        higherRandomVideo: newHigherRandomVideo,
      } = calculateVideos(state.originalVideos);
      state.manipulatedVideos = newManipulatedVideos;
      state.randomVideos = newRandomVideos;
      state.higherRandomVideo = newHigherRandomVideo;
      state.selectedVideoId = null;
      state.score = 0;

      // time limit
      if (state.isTimeLimitedMode) {
        state.time = 10;
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

      state.status = "IDLE";

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
      state.manipulatedVideos = newManipulatedVideos;
      state.randomVideos = newRandomVideos;
      state.higherRandomVideo = newHigherRandomVideo;
      state.selectedVideoId = null;

      // time limit
      if (state.isTimeLimitedMode) {
        state.time = 10;
      }
    },
    fail: (state) => {
      if (state.isInitialized === false) {
        return;
      }

      state.status = "FAILED";
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

    // time limit
    toggleTimeLimitedMode: (state) => {
      state.isTimeLimitedMode = !state.isTimeLimitedMode;
    },
    minusTime: (state) => {
      state.time--;
    },
  },
});

export const { actions: higherLowerGameActions } = higherLowerGameSlice;

export default higherLowerGameSlice;
