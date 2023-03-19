import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Nicknames } from "@/types";

interface UserData {
  favoriteChannels: string[];
  nicknames: Nicknames;
  photoURL: UserInfo["photoURL"];
  uid: UserInfo["uid"];
  email: UserInfo["email"];
  displayName: UserInfo["displayName"];
}

interface UserState {
  favoriteChannels: string[];
  nicknames: Nicknames;
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
  nicknames: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<UserData>) => {
      state.isInitialized = true;
      state.isSignedIn = true;
      state.favoriteChannels = action.payload.favoriteChannels;
      state.nicknames = action.payload.nicknames;
      state.photoURL = action.payload.photoURL;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
    },
    signOut: (state) => {
      state.isInitialized = true;
      state.isSignedIn = false;
      state.favoriteChannels = [];
      state.nicknames = {};
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
    updateNickname: (
      state,
      action: PayloadAction<{ nickname: string; channelId: string }>
    ) => {
      if (
        !state.isInitialized ||
        !state.isSignedIn ||
        state.uid === undefined
      ) {
        return;
      }

      const { channelId, nickname } = action.payload;
      const { nicknames, uid } = state;

      const scoreDocRef = doc(db, "channels", channelId, "scores", uid);
      getDoc(scoreDocRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          updateDoc(scoreDocRef, {
            nickname,
          });
        }
      });

      const newNicknames = { ...nicknames, [channelId]: nickname };
      updateDoc(doc(db, "users", uid), {
        nicknames: newNicknames,
      });
      state.nicknames = newNicknames;
    },
  },
});

export const { actions: userActions } = userSlice;

export default userSlice;
