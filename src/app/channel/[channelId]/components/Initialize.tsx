"use client";

import { useAppDispatch } from "@/lib/hooks";
import { channelSliceActions } from "@/lib/slices/channelSlice";
import { useEffect } from "react";

interface Props {
  channel: Pick<ChannelData, "id" | "thumbnail" | "title">;
}

export default function Initialize(props: Props) {
  const { channel } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(channelSliceActions.initialize(channel));

    return () => {
      dispatch(channelSliceActions.finalize());
    };
  }, [channel, dispatch]);

  return null;
}
