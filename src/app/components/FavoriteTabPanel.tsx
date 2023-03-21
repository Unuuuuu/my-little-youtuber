import { useAppSelector } from "@/lib/hooks";
import { useMemo } from "react";
import { useAllChannelsContext } from "./AllChannelsContext";
import ChannelGrid from "./ChannelGrid";
import TabPanel, { Props as TabPanelProps } from "./TabPanel";

interface Props extends Omit<TabPanelProps, "children"> {}

export default function FavoriteTabPanel(props: Props) {
  const { selectedValue, value } = props;
  const allChannels = useAllChannelsContext();
  const { isSignedIn, favoriteChannelIds } = useAppSelector((state) => ({
    isSignedIn: state.user.isSignedIn,
    favoriteChannelIds: state.user.favoriteChannelIds,
  }));

  const favoriteChannels = useMemo(() => {
    return allChannels.filter((channel) =>
      favoriteChannelIds.includes(channel.id)
    );
  }, [allChannels, favoriteChannelIds]);

  if (!isSignedIn) {
    return null;
  }

  return (
    <TabPanel value={value} selectedValue={selectedValue}>
      <ChannelGrid channels={favoriteChannels} />
    </TabPanel>
  );
}
