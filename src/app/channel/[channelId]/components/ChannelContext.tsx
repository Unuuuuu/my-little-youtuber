"use client";

import { createContext, useContext } from "react";

export const ChannelContext = createContext<{
  id: ChannelData["id"];
  thumbnail: ChannelData["thumbnail"];
  title: ChannelData["title"];
  updateTime: ChannelData["updateTime"];
  video: VideoData;
} | null>(null);

export const useChannelContext = () => {
  const value = useContext(ChannelContext);
  if (value === null) {
    throw new Error("Should be wrapped in channel context provider.");
  }
  return value;
};

interface Props {
  children?: React.ReactNode;
  value: {
    id: ChannelData["id"];
    thumbnail: ChannelData["thumbnail"];
    title: ChannelData["title"];
    updateTime: ChannelData["updateTime"];
    video: VideoData;
  };
}

export function ChannelContextProvider(props: Props) {
  return (
    <ChannelContext.Provider value={props.value}>
      {props.children}
    </ChannelContext.Provider>
  );
}
