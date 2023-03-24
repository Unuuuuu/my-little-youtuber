import Box from "@mui/material/Box";
import { useAllChannelsContext } from "./AllChannelsContext";
import ChannelGrid from "./ChannelGrid";
import Search from "./Search";
import TabPanel, { Props as TabPanelProps } from "./TabPanel";

interface Props extends Omit<TabPanelProps, "children"> {}

export default function AllTabPanel(props: Props) {
  const { selectedValue, value } = props;
  const allChannels = useAllChannelsContext();

  return (
    <TabPanel value={value} selectedValue={selectedValue}>
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <Search channels={allChannels} />
        <ChannelGrid channels={allChannels} />
      </Box>
    </TabPanel>
  );
}
