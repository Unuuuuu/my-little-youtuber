import { configureStore } from "@reduxjs/toolkit";
import youtuberAddRequestSlice from "./slices/youtuberAddRequestSlice";
import homeTabsSlice from "./slices/homeTabsSlice";
// import breakpointSlice from "./slices/breakpointSlice";

export const store = configureStore({
  reducer: {
    youtuberAddRequest: youtuberAddRequestSlice.reducer,
    homeTabs: homeTabsSlice.reducer,
    // breakpoint: breakpointSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
