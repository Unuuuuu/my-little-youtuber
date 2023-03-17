"use client";

import { auth } from "@/lib/firebase";
import { useAppDispatch } from "@/lib/hooks";
import { userSliceActions } from "@/lib/slices/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function Initialize() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const { photoURL, uid, displayName, email } = user;

        dispatch(
          userSliceActions.signIn({
            photoURL,
            uid,
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
