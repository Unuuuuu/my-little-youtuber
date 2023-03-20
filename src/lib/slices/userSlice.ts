import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserInfo } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

interface UserState {
  isInitialized: boolean;
  isSignedIn: boolean;
  id?: UserInfo["uid"];
  email?: UserInfo["email"];
  photoURL?: UserInfo["photoURL"];
  displayName?: UserInfo["displayName"];
  favoriteChannelIds: string[];
  nicknames: Nicknames;
}

const initialState: UserState = {
  isInitialized: false,
  isSignedIn: false,
  favoriteChannelIds: [],
  nicknames: {},
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
        favoriteChannelIds: string[];
        email: User["email"];
        displayName: User["displayName"];
        nicknames: Nicknames;
      }>
    ) => {
      state.isInitialized = true;
      state.isSignedIn = true;
      state.id = action.payload.uid;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
      state.displayName = action.payload.displayName;
      state.favoriteChannelIds = action.payload.favoriteChannelIds;
      state.nicknames = action.payload.nicknames;
    },
    signOut: (state) => {
      state.isInitialized = true;
      state.isSignedIn = false;
      state.id = undefined;
      state.email = undefined;
      state.photoURL = undefined;
      state.displayName = undefined;
      state.favoriteChannelIds = [];
      state.nicknames = {};
    },
    updateFavoriteChannel: (
      state,
      action: PayloadAction<{ checked: boolean; channelId: string }>
    ) => {
      const { channelId, checked } = action.payload;
      const { isInitialized, isSignedIn, favoriteChannelIds, id } = state;

      if (!isInitialized || !isSignedIn || id === undefined) {
        return;
      }

      const docRef = doc(db, "users", id);
      if (checked) {
        const newFavoriteChannelIds = [...favoriteChannelIds, channelId];
        updateDoc(docRef, {
          favoriteChannels: newFavoriteChannelIds,
        });
        state.favoriteChannelIds = newFavoriteChannelIds;
      } else {
        const newFavoriteChannelIds = favoriteChannelIds.filter(
          (value) => value !== channelId
        );
        updateDoc(docRef, {
          favoriteChannels: newFavoriteChannelIds,
        });
        state.favoriteChannelIds = newFavoriteChannelIds;
      }
    },
    updateNickname: (
      state,
      action: PayloadAction<{ nickname: string; channelId: string }>
    ) => {
      const { isSignedIn, id, nicknames } = state;

      if (!isSignedIn || id === undefined) {
        return;
      }

      const { channelId, nickname } = action.payload;

      const newNicknames = { ...nicknames, [channelId]: nickname };
      state.nicknames = newNicknames;

      updateDoc(doc(db, "users", id), {
        nicknames: newNicknames,
      });

      const scoreDocRef = doc(db, "channels", channelId, "scores", id);
      getDoc(scoreDocRef).then((scoreDocSnapshot) => {
        if (scoreDocSnapshot.exists()) {
          updateDoc(scoreDocRef, {
            nickname,
          });
        }
      });
    },
  },
});

export const { actions: userSliceActions } = userSlice;

export default userSlice;
