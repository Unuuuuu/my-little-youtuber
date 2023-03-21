"use client";

import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AllTabPanel from "./AllTabPanel";
import FavoriteTabPanel from "./FavoriteTabPanel";
import { useAppSelector } from "@/lib/hooks";
import TagTabPanel from "./TagTabPanel";

interface Props {
  allTags: TagData[];
}

export default function HomeTabs(props: Props) {
  const { allTags } = props;
  const { isInitialized, isSignedIn } = useAppSelector((state) => ({
    isInitialized: state.user.isInitialized,
    isSignedIn: state.user.isSignedIn,
  }));
  const [selectedValue, setSelectedValue] = useState(
    isInitialized && isSignedIn ? "favorite" : "all"
  );
  const targetElementRef = useRef<HTMLDivElement>(null);

  const handleChange: TabsProps["onChange"] = (_, newValue) => {
    if (document.querySelector("main")!.scrollTop > 270) {
      targetElementRef.current!.scrollIntoView();
    }
    setSelectedValue(newValue);
  };

  useEffect(() => {
    if (!isSignedIn && selectedValue === "favorite") {
      setSelectedValue("all");
    }
  }, [isSignedIn, selectedValue]);

  return (
    <Box ref={targetElementRef} sx={{ flex: 1 }}>
      <Tabs
        value={selectedValue}
        onChange={handleChange}
        variant="scrollable"
        sx={{
          position: "sticky",
          top: 0,
          bgcolor: "white",
          zIndex: 10,
        }}
      >
        {isSignedIn && <Tab value={"favorite"} label="즐겨찾기" />}
        <Tab value={"all"} label="전체" />
        {allTags.map((tag) => (
          <Tab key={tag.id} value={tag.id} label={tag.label} />
        ))}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "1px",
            bgcolor: "divider",
          }}
        />
      </Tabs>
      <FavoriteTabPanel value={"favorite"} selectedValue={selectedValue} />
      <AllTabPanel value={"all"} selectedValue={selectedValue} />
      {allTags.map((tag) => (
        <TagTabPanel
          key={tag.id}
          value={tag.id}
          selectedValue={selectedValue}
          channelIds={tag.channelIds}
        />
      ))}
    </Box>
  );
}
