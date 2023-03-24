import Box from "@mui/material/Box";
import { useMemo } from "react";
import { useAllChannelsContext } from "./AllChannelsContext";
import ChannelGrid from "./ChannelGrid";
import Search from "./Search";
import TabPanel, { Props as TabPanelProps } from "./TabPanel";

interface Props extends Omit<TabPanelProps, "children"> {
  channelIds: TagData["channelIds"];
}

export default function TagTabPanel(props: Props) {
  const { selectedValue, value, channelIds } = props;
  const allChannels = useAllChannelsContext();

  const tagChannels = useMemo(() => {
    return allChannels.filter((channel) => channelIds.includes(channel.id));
  }, [allChannels, channelIds]);

  return (
    <TabPanel value={value} selectedValue={selectedValue}>
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <Search channels={tagChannels} />
        <ChannelGrid channels={tagChannels} />
      </Box>
    </TabPanel>
  );
}
