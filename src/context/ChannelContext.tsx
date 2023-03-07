import { ChannelDataWithoutVideos } from "@/types";
import { createContext, useContext } from "react";

export const ChannelDataWithoutVideosContext =
  createContext<ChannelDataWithoutVideos | null>(null);

export const useChannelDataWithoutVideosContext = () => {
  const value = useContext(ChannelDataWithoutVideosContext);
  return value;
};
