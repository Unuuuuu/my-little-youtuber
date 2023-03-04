import { db } from "@/utils/firebase";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

interface UserData {
  favoriteChannels: string[];
  photoURL: UserInfo["photoURL"];
  uid: UserInfo["uid"];
}

interface UserState {
  favoriteChannels: string[];
  isInitialized: boolean;
  isSignedIn: boolean;
  photoURL?: UserInfo["photoURL"];
  uid?: UserInfo["uid"];
}

const initialState: UserState = {
  isInitialized: false,
  isSignedIn: false,
  favoriteChannels: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<UserData>) => {
      state.isInitialized = true;
      state.isSignedIn = true;
      state.favoriteChannels = action.payload.favoriteChannels;
      state.photoURL = action.payload.photoURL;
      state.uid = action.payload.uid;
    },
    signOut: (state) => {
      state.isInitialized = true;
      state.isSignedIn = false;
      state.favoriteChannels = [];
      state.uid = undefined;
      state.photoURL = undefined;
    },
    updateFavoriteChannel: (
      state,
      action: PayloadAction<{ checked: boolean; channelId: string }>
    ) => {
      if (
        !state.isInitialized ||
        !state.isSignedIn ||
        state.uid === undefined
      ) {
        return;
      }

      const { channelId, checked } = action.payload;
      const { favoriteChannels } = state;

      if (checked) {
        state.favoriteChannels = [...favoriteChannels, channelId];
      } else {
        state.favoriteChannels = favoriteChannels.filter(
          (cid) => cid !== channelId
        );
      }
    },
  },
});

export const { actions: userActions } = userSlice;

export default userSlice;
