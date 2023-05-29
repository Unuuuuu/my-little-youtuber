"use client";

import Tabs, { TabsProps } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useTagsContext } from "./TagsContext";
import { grey } from "@mui/material/colors";
import HomeTabPanel from "./HomeTabPanel";
import TagTabPanel from "./TagTabPanel";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { homeTabsSliceActions } from "@/lib/slices/homeTabsSlice";
import { useEffect, useRef } from "react";

export default function HomeTabs() {
  const { tags, generalTags, etcTags } = useTagsContext();
  const value = useAppSelector((state) => state.homeTabs.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [value]);

  const handleChange: TabsProps["onChange"] = (_, newValue: string) => {
    dispatch(homeTabsSliceActions.updateValue(newValue));
  };

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: {
            sm: 48,
            md: 112,
          },
          bgcolor: "tab",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={true}
          allowScrollButtonsMobile
          sx={{
            maxWidth: "1144px",
            margin: "0 auto",
            minHeight: {
              sm: "48px",
              md: "60px",
            },
            ".MuiTab-root": {
              p: {
                sm: 0,
                md: "0 16px",
              },
              minWidth: "auto",
              minHeight: {
                sm: "47px",
                md: "59px",
              },

              "&:not(.Mui-selected)": {
                color: grey[700],
              },
            },
            ".MuiTabs-flexContainer": {
              gap: "16px",
            },
            ".Mui-selected": {
              fontWeight: 700,
            },
            ".MuiTabScrollButton-root": {
              width: "24px",
              bgcolor: "white",

              "&:last-child": {
                borderLeft: `1px solid`,
                borderColor: "divider",
              },

              "&:first-child": {
                borderRight: `1px solid`,
                borderColor: "divider",
              },
            },
            ".MuiTabs-scroller": {
              zIndex: 1,
            },
            ".MuiTabs-indicator": {
              height: "3px",
            },
          }}
        >
          <Tab value={"home"} label="홈" />
          {generalTags.map((tag) => (
            <Tab key={tag.id} value={tag.id} label={tag.label} />
          ))}
          {etcTags.some((tag) => tag.channelIds.length !== 0) && (
            <Tab value={"etc"} label="기타" />
          )}
        </Tabs>
        <Box
          sx={{
            width: "100%",
            height: "1px",
            bgcolor: "divider",
            position: "absolute",
            bottom: 0,
          }}
        />
      </Box>
      <HomeTabPanel value="home" selectedValue={value} />
      {tags.map((tag) => (
        <TagTabPanel
          key={tag.id}
          tag={tag}
          value={tag.id}
          selectedValue={value}
        />
      ))}
    </>
  );
}
