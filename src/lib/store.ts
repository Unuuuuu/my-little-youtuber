import { configureStore } from "@reduxjs/toolkit";
import channelSlice from "./slices/channelSlice";
import gameSlice from "./slices/gameSlice";
import modalSlice from "./slices/modalSlice";
import snackbarSlice from "./slices/snackbarSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    channel: channelSlice.reducer,
    user: userSlice.reducer,
    snackbar: snackbarSlice.reducer,
    modal: modalSlice.reducer,
    game: gameSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
