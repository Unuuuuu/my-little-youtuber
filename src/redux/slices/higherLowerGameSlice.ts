import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ChannelData, HigherLowerGameMode, VideoData } from "@/types";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

const updateScores = (channelId: string, userId: string, score: number) => {
  const docRef = doc(db, "channels", channelId);
  getDoc(docRef).then((docSnapshot) => {
    const { scores } = docSnapshot.data() as ChannelData;
    const targetIndex = scores.findIndex((value) => value.score < score);
    let newScores: ChannelData["scores"];
    if (targetIndex === -1) {
      newScores = [...scores, { userId, score }];
    } else {
      newScores = [
        ...scores.slice(0, targetIndex),
        { userId, score },
        ...scores.slice(targetIndex, scores.length),
      ];
    }
    updateDoc(docRef, {
      scores: newScores,
    });
  });
};

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

const TIME = 10;

interface HigherLowerGameState {
  channelId?: string;
  isInitialized: boolean;
  mode: HigherLowerGameMode;
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
    initialize: (
      state,
      action: PayloadAction<{ channelId: string; videos: VideoData[] }>
    ) => {
      const { channelId, videos } = action.payload;
      const {
        manipulatedVideos: newManipulatedVideos,
        randomVideos: newRandomVideos,
        higherRandomVideo: newHigherRandomVideo,
      } = calculateVideos(videos);

      state.channelId = channelId;
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
      state.channelId = undefined;
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
    compare: (state, action: PayloadAction<string | undefined>) => {
      const userId = action.payload;
      const { score, channelId } = state;
      if (
        state.isInitialized === false ||
        state.status !== "PENDING" ||
        state.selectedVideoId === null ||
        state.higherRandomVideo === undefined ||
        channelId === undefined
      ) {
        return;
      }

      if (state.selectedVideoId === state.higherRandomVideo.id) {
        state.status = "SUCCEEDED";
        state.streak++;

        if (state.mode === "RANK") {
          state.score = score + state.time;
        }
      } else {
        state.status = "FAILED";

        if (state.mode === "RANK" && score > 0 && userId !== undefined) {
          updateScores(channelId, userId, score);
        }
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
    updateMode: (state, action: PayloadAction<HigherLowerGameMode>) => {
      state.mode = action.payload;
    },
    updateTime: (state) => {
      if (state.isInitialized === false) {
        return;
      }

      state.time--;
    },
    fail: (state, action: PayloadAction<string | undefined>) => {
      const userId = action.payload;
      const { score, channelId } = state;

      if (state.isInitialized === false || channelId === undefined) {
        return;
      }

      state.status = "FAILED";

      if (state.mode === "RANK" && score > 0 && userId !== undefined) {
        updateScores(channelId, userId, score);
      }
    },
  },
});

export const { actions: higherLowerGameActions } = higherLowerGameSlice;

export default higherLowerGameSlice;
