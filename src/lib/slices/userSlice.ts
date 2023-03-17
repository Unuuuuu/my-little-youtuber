import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserInfo } from "firebase/auth";

interface UserState {
  isInitialized: boolean;
  isSignedIn: boolean;
  id?: UserInfo["uid"];
  email?: UserInfo["email"];
  photoURL?: UserInfo["photoURL"];
  displayName?: UserInfo["displayName"];
}

const initialState: UserState = {
  isInitialized: false,
  isSignedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (
      state,
      action: PayloadAction<{
        photoURL: User["photoURL"];
        uid: User["uid"];
        email: User["email"];
        displayName: User["displayName"];
      }>
    ) => {
      state.isInitialized = true;
      state.isSignedIn = true;
      state.id = action.payload.uid;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
      state.displayName = action.payload.displayName;
    },
    signOut: (state) => {
      state.isInitialized = true;
      state.isSignedIn = false;
      state.id = undefined;
      state.email = undefined;
      state.photoURL = undefined;
      state.displayName = undefined;
    },
  },
});

export const { actions: userSliceActions } = userSlice;

export default userSlice;
