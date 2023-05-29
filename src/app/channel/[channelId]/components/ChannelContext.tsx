"use client";

import { createContext, useContext } from "react";

export interface ChannelContextValue {
  channel: ChannelDataForChannelPage;
}

const ChannelContext = createContext<ChannelContextValue | null>(null);

export const useChannelContext = () => {
  const value = useContext(ChannelContext);
  if (value === null) {
    throw new Error("ChannelContext의 Provider로 감싸야합니다.");
  }
  return value;
};

interface Props {
  children?: React.ReactNode;
  value: ChannelContextValue;
}

export function ChannelContextProvider(props: Props) {
  return (
    <ChannelContext.Provider value={props.value}>
      {props.children}
    </ChannelContext.Provider>
  );
}
