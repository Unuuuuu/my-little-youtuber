import { configureStore } from "@reduxjs/toolkit";
import higherLowerGameSlice from "./slices/higherLowerGameSlice";
import loginRequestSnackbarSlice from "./slices/loginRequestSnackbarSlice";
import kakaotalkGuideModalSlice from "./slices/kakaotalkGuideModalSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    higherLowerGame: higherLowerGameSlice.reducer,
    user: userSlice.reducer,
    loginRequestSnackbar: loginRequestSnackbarSlice.reducer,
    kakaotalkGuideModal: kakaotalkGuideModalSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
