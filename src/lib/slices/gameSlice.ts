import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getRandomNickname from "../getRandomNickname";

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

type GameStatus = "IDLE" | "PENDING" | "FAILED" | "SUCCEEDED";

interface GameState {
  id: string;
  title: string;
  videos: VideoData[];
  isInitialized: boolean;
  gameMode: GameMode;
  gameStatus: GameStatus;
  originalVideos?: VideoData[];
  manipulatedVideos?: VideoData[];
  randomVideos?: VideoData[];
  higherRandomVideo?: VideoData;
  selectedVideoId: string | null;
  score: number;
  nickname: string;

  // TIME_ATTACK MODE
  time: number;
}

const TIME = 10;

const initialState: GameState = {
  id: "",
  title: "",
  videos: [],
  isInitialized: false,
  gameMode: "GENERAL",
  gameStatus: "IDLE",
  selectedVideoId: null,
  score: 0,
  nickname: getRandomNickname(),

  // TIME_ATTACK MODE
  time: TIME,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateGameMode: (state, action: PayloadAction<GameMode>) => {
      state.gameMode = action.payload;
    },
    initialize: (state, action: PayloadAction<ChannelDataForGamePage>) => {
      const { id, title, videos } = action.payload;

      state.id = id;
      state.title = title;
      state.videos = videos;

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
      state.score = 0;

      if (state.gameMode === "TIME_ATTACK") {
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
      state.score = 0;

      if (state.gameMode === "TIME_ATTACK") {
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
        // score,
        isInitialized,
        gameStatus,
        selectedVideoId,
        higherRandomVideo,
        gameMode,
        score,
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
        state.score++;
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

      if (state.gameMode === "TIME_ATTACK") {
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
      state.score = 0;

      if (state.gameMode === "TIME_ATTACK") {
        state.time = TIME;
      }
    },

    // TIME_ATTACK MODE
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

    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
  },
});

export const { actions: gameSliceActions } = gameSlice;

export default gameSlice;
