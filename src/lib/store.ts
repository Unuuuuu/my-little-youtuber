import { configureStore } from "@reduxjs/toolkit";
import youtuberAddRequestInterfaceSlice from "./slices/youtuberAddRequestInterfaceSlice";
import homeTabsSlice from "./slices/homeTabsSlice";
import searchSlice from "./slices/searchSlice";
import gameModeInterfaceSlice from "./slices/gameModeInterfaceSlice";
import gameSlice from "./slices/gameSlice";
import youtubePlayerModalSlice from "./slices/youtubePlayerModalSlice";
import resultDialogSlice from "./slices/resultDialogSlice";

export const store = configureStore({
  reducer: {
    youtuberAddRequestInterface: youtuberAddRequestInterfaceSlice.reducer,
    homeTabs: homeTabsSlice.reducer,
    search: searchSlice.reducer,
    gameModeInterface: gameModeInterfaceSlice.reducer,
    game: gameSlice.reducer,
    youtubePlayerModal: youtubePlayerModalSlice.reducer,
    resultDialog: resultDialogSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
