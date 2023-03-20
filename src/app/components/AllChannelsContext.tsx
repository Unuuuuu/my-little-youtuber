"use client";

import { createContext, useContext } from "react";

export const AllChannelsContext = createContext<
  Pick<
    ChannelData,
    "id" | "scoresSize" | "thumbnail" | "title" | "updateTime"
  >[]
>([]);

export const useAllChannelsContext = () => {
  const value = useContext(AllChannelsContext);
  return value;
};

interface Props {
  children?: React.ReactNode;
  value: Pick<
    ChannelData,
    "id" | "scoresSize" | "thumbnail" | "title" | "updateTime"
  >[];
}

export function AllChannelsContextProvider(props: Props) {
  return (
    <AllChannelsContext.Provider value={props.value}>
      {props.children}
    </AllChannelsContext.Provider>
  );
}
