import { useAllChannelsContext } from "./AllChannelsContext";
import ChannelGrid from "./ChannelGrid";
import TabPanel, { Props as TabPanelProps } from "./TabPanel";

interface Props extends Omit<TabPanelProps, "children"> {}

export default function AllTabPanel(props: Props) {
  const { selectedValue, value } = props;
  const allChannels = useAllChannelsContext();

  return (
    <TabPanel value={value} selectedValue={selectedValue}>
      <ChannelGrid channels={allChannels}></ChannelGrid>
    </TabPanel>
  );
}
