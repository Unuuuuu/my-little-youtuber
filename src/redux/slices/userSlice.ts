import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

interface UserData {
  favoriteChannels: string[];
  photoURL: UserInfo["photoURL"];
  uid: UserInfo["uid"];
  email: UserInfo["email"];
  displayName: UserInfo["displayName"];
}

interface UserState {
  favoriteChannels: string[];
  isInitialized: boolean;
  isSignedIn: boolean;
  photoURL?: UserInfo["photoURL"];
  uid?: UserInfo["uid"];
  email?: UserInfo["email"];
  displayName?: UserInfo["displayName"];
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
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
    },
    signOut: (state) => {
      state.isInitialized = true;
      state.isSignedIn = false;
      state.favoriteChannels = [];
      state.uid = undefined;
      state.photoURL = undefined;
      state.email = undefined;
      state.displayName = undefined;
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
      const { favoriteChannels, uid } = state;

      const docRef = doc(db, "users", uid);
      if (checked) {
        const newFavoriteChannels = [...favoriteChannels, channelId];
        updateDoc(docRef, {
          favoriteChannels: newFavoriteChannels,
        });
        state.favoriteChannels = newFavoriteChannels;
      } else {
        const newFavoriteChannels = favoriteChannels.filter(
          (cid) => cid !== channelId
        );
        updateDoc(docRef, {
          favoriteChannels: newFavoriteChannels,
        });
        state.favoriteChannels = newFavoriteChannels;
      }
    },
  },
});

export const { actions: userActions } = userSlice;

export default userSlice;
