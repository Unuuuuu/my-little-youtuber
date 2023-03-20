import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

type GameMode = "GENERAL" | "RANK";
type GameStatus = "IDLE" | "PENDING" | "FAILED" | "SUCCEEDED";

interface GameState {
  isInitialized: boolean;
  gameMode: GameMode;
  gameStatus: GameStatus;
  originalVideos?: VideoData[];
  manipulatedVideos?: VideoData[];
  randomVideos?: VideoData[];
  higherRandomVideo?: VideoData;
  selectedVideoId: string | null;
  streak: number;

  // Rank Game
  score: number;
  time: number;
}

const TIME = 10;

const initialState: GameState = {
  isInitialized: false,
  gameMode: "GENERAL",
  gameStatus: "IDLE",
  selectedVideoId: null,
  streak: 0,

  // Rank Game
  score: 0,
  time: TIME,
};

export const gameSlice = createSlice({
  name: "game",
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
      state.gameStatus = "IDLE";
      state.originalVideos = videos;
      state.manipulatedVideos = newManipulatedVideos;
      state.randomVideos = newRandomVideos;
      state.higherRandomVideo = newHigherRandomVideo;
      state.selectedVideoId = null;
      state.streak = 0;

      if (state.gameMode === "RANK") {
        // Rank Game
        state.score = 0;
        state.time = TIME;
      }
    },
    finalize: (state) => {
      state.isInitialized = false;
      state.gameStatus = "IDLE";
      state.originalVideos = undefined;
      state.manipulatedVideos = undefined;
      state.randomVideos = undefined;
      state.higherRandomVideo = undefined;
      state.selectedVideoId = null;
      state.streak = 0;

      if (state.gameMode === "RANK") {
        // Rank Game
        state.score = 0;
        state.time = TIME;
      }
    },
    select: (state, action: PayloadAction<string>) => {
      if (state.isInitialized === false || state.gameStatus !== "IDLE") {
        return;
      }

      state.selectedVideoId = action.payload;
      state.gameStatus = "PENDING";
    },
    compare: (state) => {
      const {
        score,
        isInitialized,
        gameStatus,
        selectedVideoId,
        higherRandomVideo,
        gameMode,
      } = state;
      if (
        isInitialized === false ||
        gameStatus !== "PENDING" ||
        selectedVideoId === null ||
        higherRandomVideo === undefined
      ) {
        return;
      }

      if (selectedVideoId === higherRandomVideo.id) {
        // 성공
        state.gameStatus = "SUCCEEDED";
        state.streak++;

        if (gameMode === "RANK") {
          state.score = score + state.time;
        }
      } else {
        // 실패
        state.gameStatus = "FAILED";
      }
    },
    next: (state) => {
      const { isInitialized, manipulatedVideos, originalVideos } = state;
      if (
        isInitialized === false ||
        manipulatedVideos === undefined ||
        originalVideos === undefined
      ) {
        return;
      }

      let targetVideos: VideoData[];
      if (manipulatedVideos.length < 2) {
        targetVideos = originalVideos;
      } else {
        targetVideos = manipulatedVideos;
      }

      const {
        manipulatedVideos: newManipulatedVideos,
        randomVideos: newRandomVideos,
        higherRandomVideo: newHigherRandomVideo,
      } = calculateVideos(targetVideos);

      state.gameStatus = "IDLE";
      state.manipulatedVideos = newManipulatedVideos;
      state.randomVideos = newRandomVideos;
      state.higherRandomVideo = newHigherRandomVideo;
      state.selectedVideoId = null;

      // Rank Game
      if (state.gameMode === "RANK") {
        state.time = TIME;
      }
    },
    reset: (state) => {
      const { isInitialized, originalVideos } = state;
      if (isInitialized === false || originalVideos === undefined) {
        return;
      }

      const {
        manipulatedVideos: newManipulatedVideos,
        randomVideos: newRandomVideos,
        higherRandomVideo: newHigherRandomVideo,
      } = calculateVideos(originalVideos);

      state.gameStatus = "IDLE";
      state.manipulatedVideos = newManipulatedVideos;
      state.randomVideos = newRandomVideos;
      state.higherRandomVideo = newHigherRandomVideo;
      state.selectedVideoId = null;
      state.streak = 0;

      // Rank Game
      if (state.gameMode === "RANK") {
        state.score = 0;
        state.time = TIME;
      }
    },

    // Rank Game
    updateGameMode: (state, action: PayloadAction<GameMode>) => {
      state.gameMode = action.payload;
    },
    updateTime: (state) => {
      if (state.isInitialized === false) {
        return;
      }

      state.time--;
    },
    fail: (state) => {
      if (state.isInitialized === false) {
        return;
      }

      state.gameStatus = "FAILED";
    },
  },
});

export const { actions: gameSliceActions } = gameSlice;

export default gameSlice;
