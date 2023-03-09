import { useChannelDatasWithoutVideosContext } from "@/context/ChannelDatasWithoutVideosContext";
import ChannelList from "./ChannelList";

const AllTab = () => {
  const channelDatasWithoutVideos = useChannelDatasWithoutVideosContext();

  if (channelDatasWithoutVideos === null) {
    return null;
  }

  return <ChannelList channelDatasWithoutVideos={channelDatasWithoutVideos} />;
};

export default AllTab;
