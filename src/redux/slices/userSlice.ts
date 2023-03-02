import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "firebase/auth";

interface UserData {
  photoURL: UserInfo["photoURL"];
}

interface UserState {
  isInitialized: boolean;
  isSignedIn: boolean;
  photoURL?: string | null;
}

const initialState: UserState = {
  isInitialized: false,
  isSignedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<UserData>) => {
      state.isInitialized = true;
      state.isSignedIn = true;
      state.photoURL = action.payload.photoURL;
    },
    signOut: (state) => {
      state.isInitialized = true;
      state.isSignedIn = false;
    },
  },
});

export const { actions: userActions } = userSlice;

export default userSlice;
