import Box from "@mui/material/Box";
import { useMemo } from "react";
import TabPanel, { Props as TabPanelProps } from "./TabPanel";
import { useChannelsContext } from "./ChannelsContext";
import Typography from "@mui/material/Typography";
import ChannelList from "./ChannelList";

interface Props extends Omit<TabPanelProps, "children"> {
  tag: TagData;
}

export default function TagTabPanel(props: Props) {
  const { selectedValue, value, tag } = props;
  const { channelsSortedByPlayCount } = useChannelsContext();

  const filteredChannels = useMemo(() => {
    return channelsSortedByPlayCount.filter((channel) =>
      tag.channelIds.includes(channel.id)
    );
  }, [channelsSortedByPlayCount, tag.channelIds]);

  return (
    <TabPanel value={value} selectedValue={selectedValue}>
      <Box sx={{ px: "24px", py: "40px" }}>
        <Box>
          <Box
            sx={{
              mb: "10px",
            }}
          >
            <Typography sx={{ typography: { sm: "h2", md: "h1" } }}>
              {tag.label} 유튜버
            </Typography>
          </Box>
          <ChannelList tag={tag} channels={filteredChannels} />
        </Box>
      </Box>
    </TabPanel>
  );
}
