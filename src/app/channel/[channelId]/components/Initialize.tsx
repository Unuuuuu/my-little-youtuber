"use client";

import { useAppDispatch } from "@/lib/hooks";
import { channelSliceActions } from "@/lib/slices/channelSlice";
import { useEffect } from "react";
import { useChannelContext } from "./ChannelContext";

export default function Initialize() {
  const { id, thumbnail, title } = useChannelContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(channelSliceActions.initialize({ id, thumbnail, title }));

    return () => {
      dispatch(channelSliceActions.finalize());
    };
  }, [dispatch, id, thumbnail, title]);

  return null;
}
