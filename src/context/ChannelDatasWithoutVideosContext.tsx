import { ChannelDataWithoutVideos } from "@/types";
import { createContext, useContext } from "react";

export const ChannelDatasWithoutVideosContext = createContext<
  ChannelDataWithoutVideos[] | null
>(null);

export const useChannelDatasWithoutVideosContext = () => {
  const value = useContext(ChannelDatasWithoutVideosContext);
  return value;
};
