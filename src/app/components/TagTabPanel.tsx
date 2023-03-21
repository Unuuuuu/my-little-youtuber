import { useMemo } from "react";
import { useAllChannelsContext } from "./AllChannelsContext";
import ChannelGrid from "./ChannelGrid";
import TabPanel, { Props as TabPanelProps } from "./TabPanel";

interface Props extends Omit<TabPanelProps<HomeTabsValue>, "children"> {
  tagName: string;
}

export default function TagTabPanel(props: Props) {
  const { selectedValue, value, tagName } = props;
  const allChannels = useAllChannelsContext();

  const tagChannels = useMemo(() => {
    return allChannels.filter((channel) => channel.tags.includes(tagName));
  }, [allChannels, tagName]);

  return (
    <TabPanel<HomeTabsValue> value={value} selectedValue={selectedValue}>
      <ChannelGrid channels={tagChannels} />
    </TabPanel>
  );
}
