"use client";

import { auth, db } from "@/lib/firebase";
import { useAppDispatch } from "@/lib/hooks";
import { userSliceActions } from "@/lib/slices/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect } from "react";

export default function Initialize() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const { photoURL, uid, displayName, email } = user;
        const userDocumentRef = doc(db, "users", uid);
        const userDocumentSnapshot = await getDoc(userDocumentRef);

        let favoriteChannelIds: string[] = [];
        let nicknames: Nicknames = {};
        if (userDocumentSnapshot.exists()) {
          const data = userDocumentSnapshot.data();
          favoriteChannelIds = data.favoriteChannels;
          nicknames = data.nicknames;
        } else {
          setDoc(userDocumentRef, {
            id: uid,
            displayName,
            email,
            favoriteChannels: [],
            nicknames: {},
          });
        }

        dispatch(
          userSliceActions.signIn({
            photoURL,
            uid,
            favoriteChannelIds,
            nicknames,
            email,
            displayName,
          })
        );
      } else {
        // User is signed out
        dispatch(userSliceActions.signOut());
      }
    });
  }, [dispatch]);

  return null;
}
