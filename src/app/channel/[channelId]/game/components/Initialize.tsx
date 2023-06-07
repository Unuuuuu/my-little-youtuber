"use client";

import { analytics } from "@/lib/firebase";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logEvent } from "firebase/analytics";
import { useChannelContext } from "./ChannelContext";
import { useEffect } from "react";
import { gameSliceActions } from "@/lib/slices/gameSlice";

export default function Initialize() {
  const { channel } = useChannelContext();
  const dispatch = useAppDispatch();
  const { gameMode, title } = useAppSelector((state) => ({
    gameMode: state.game.gameMode,
    title: state.game.title,
  }));

  useEffect(() => {
    if (analytics === null) {
      return;
    }
    logEvent(analytics, "v2_game", {
      channelTitle: title,
    });
    if (gameMode === "GENERAL") {
      logEvent(analytics, "v2_general_game", {
        channelTitle: title,
      });
    } else if (gameMode === "TIME_ATTACK") {
      logEvent(analytics, "v2_timeattack_game", {
        channelTitle: title,
      });
    }
  }, [gameMode, title]);

  useEffect(() => {
    dispatch(gameSliceActions.initialize(channel));

    return () => {
      dispatch(gameSliceActions.finalize());
    };
  }, [channel, dispatch]);

  return null;
}
