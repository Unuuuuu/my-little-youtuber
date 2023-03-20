"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { channelSliceActions } from "@/lib/slices/channelSlice";
import { gameSliceActions } from "@/lib/slices/gameSlice";
import { snackbarSliceActions } from "@/lib/slices/snackbarSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useChannelContext } from "./ChannelContext";

export default function Initialize() {
  const { id, thumbnail, title, videos } = useChannelContext();
  const dispatch = useAppDispatch();
  const { isSignedIn, gameMode } = useAppSelector((state) => ({
    isSignedIn: state.user.isSignedIn,
    gameMode: state.game.gameMode,
  }));
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn && gameMode === "RANK") {
      router.push(`/channel/${id}`);
      dispatch(snackbarSliceActions.openLoginRequestSnackbar());
    }
  }, [dispatch, gameMode, id, isSignedIn, router]);

  useEffect(() => {
    dispatch(channelSliceActions.initialize({ id, thumbnail, title }));
    dispatch(gameSliceActions.initialize(videos));

    return () => {
      dispatch(channelSliceActions.finalize());
      dispatch(gameSliceActions.finalize());
    };
  }, [dispatch, id, thumbnail, title, videos]);

  return null;
}
