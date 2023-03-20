"use client";

import { createContext, useContext } from "react";

export const ChannelContext = createContext<Pick<
  ChannelData,
  "id" | "thumbnail" | "title" | "videos"
> | null>(null);

export const useChannelContext = () => {
  const value = useContext(ChannelContext);
  if (value === null) {
    throw new Error("Should be wrapped in channel context provider.");
  }
  return value;
};

interface Props {
  children?: React.ReactNode;
  value: Pick<ChannelData, "id" | "thumbnail" | "title" | "videos">;
}

export function ChannelContextProvider(props: Props) {
  return (
    <ChannelContext.Provider value={props.value}>
      {props.children}
    </ChannelContext.Provider>
  );
}
