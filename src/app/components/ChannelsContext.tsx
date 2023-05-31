"use client";

import { createContext, useContext } from "react";

export interface ChannelsContextValue {
  channelsSortedByPlayCount: ChannelDataWithTotalPlayCount[];
  channelsSortedByTitle: ChannelDataWithTotalPlayCount[];
}

const ChannelsContext = createContext<ChannelsContextValue | null>(null);

export const useChannelsContext = () => {
  const value = useContext(ChannelsContext);
  if (value === null) {
    throw new Error("ChannelsContext의 Provider로 감싸야합니다.");
  }
  return value;
};

interface Props {
  children?: React.ReactNode;
  value: ChannelsContextValue;
}

export function ChannelsContextProvider(props: Props) {
  return (
    <ChannelsContext.Provider value={props.value}>
      {props.children}
    </ChannelsContext.Provider>
  );
}
