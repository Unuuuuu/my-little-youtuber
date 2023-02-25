import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Video } from "@/types";
import { HigherLowerGameChannelIdProps } from "@/pages/higher-lower-game/[channelId]";

const getRamdomIndexOfArray = (lengthOfArray: number) => {
  return Math.floor(Math.random() * lengthOfArray);
};

const getRandomVideos = (
  videos: Video[]
): { manipulatedVideos: Video[]; randomVideos: Video[] } => {
  const copiedVideos = [...videos];

  const randomIndex = getRamdomIndexOfArray(copiedVideos.length);
  const [randomVideo] = copiedVideos.splice(randomIndex, 1);
  const anotherRandomIndex = getRamdomIndexOfArray(copiedVideos.length);
  const [anotherRandomVideo] = copiedVideos.splice(anotherRandomIndex, 1);

  if (Number(randomVideo.viewCount) === Number(anotherRandomVideo.viewCount)) {
    return getRandomVideos(videos);
  }

  return {
    manipulatedVideos: copiedVideos,
    randomVideos: [randomVideo, anotherRandomVideo],
  };
};

const calculateVideos = (
  videos: Video[]
): {
  manipulatedVideos: Video[];
  randomVideos: Video[];
  higherRandomVideo: Video;
} => {
  const { manipulatedVideos, randomVideos } = getRandomVideos(videos);
  const [leftRandomVideo, rightRandomVideo] = randomVideos;

  let higherRandomVideo: Video;
  if (Number(leftRandomVideo.viewCount) > Number(rightRandomVideo.viewCount)) {
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
  originalVideos?: Video[];
  manipulatedVideos?: Video[];
  randomVideos?: Video[];
  higherRandomVideo?: Video;
  selectedVideoId: string | null;
  count: number;

  // youtube modal
  isYoutubeModalOpen: boolean;
  youtubeModalVideoId?: string;
}

const initialState: HigherLowerGameState = {
  isInitialized: false,
  status: "IDLE",
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
      state.count = 0;
      state.isYoutubeModalOpen = false;
      state.youtubeModalVideoId = undefined;
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
        state.count++;
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
      state.count = 0;
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

      let targetVideos: Video[];
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
  },
});

export const { actions: higherLowerGameActions } = higherLowerGameSlice;

export default higherLowerGameSlice;
