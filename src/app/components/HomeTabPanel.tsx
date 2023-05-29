"use client";

import Box from "@mui/material/Box";
import TabPanel, { Props as TabPanelProps } from "./TabPanel";
import { useChannelsContext } from "./ChannelsContext";
import { useTagsContext } from "./TagsContext";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import CaretRightIcon from "../../components/CaretRightIcon";
import ChannelList from "./ChannelList";
import { useMemo } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { homeTabsSliceActions } from "@/lib/slices/homeTabsSlice";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface Props extends Omit<TabPanelProps, "children"> {}

export default function HomeTabPanel(props: Props) {
  const { selectedValue, value } = props;
  const { generalTags } = useTagsContext();
  const { channels } = useChannelsContext();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  const handleTagTitleClick = (tagId: string) => {
    dispatch(homeTabsSliceActions.updateValue(tagId));
  };

  const generalTagsWithChannels = useMemo(() => {
    return generalTags.map((tag) => ({
      ...tag,
      channels: channels
        .filter((channel) => tag.channelIds.includes(channel.id))
        .sort((a, b) => b.totalPlayCount - a.totalPlayCount)
        .slice(0, isLg ? 12 : isMd ? 8 : 4),
    }));
  }, [channels, generalTags, isLg, isMd]);

  return (
    <TabPanel value={value} selectedValue={selectedValue}>
      <Box
        sx={{
          px: "24px",
          py: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        {generalTagsWithChannels.map((tag) => (
          <Box key={tag.id}>
            <Box
              sx={{
                display: {
                  sm: "flex",
                  md: "inline-flex",
                },
                justifyContent: "space-between",
                alignItems: "flex-end",
                mb: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleTagTitleClick(tag.id)}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Typography variant="h2">{tag.label} 유튜버</Typography>
                <CaretRightIcon />
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: grey[500],
                  mb: "2px",
                  display: { sm: "block", md: "none" },
                }}
              >
                더보기
              </Typography>
            </Box>
            <ChannelList tag={tag} channels={tag.channels} />
          </Box>
        ))}
      </Box>
    </TabPanel>
  );
}
