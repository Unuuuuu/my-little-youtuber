"use client";

import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import RankingTabPanel from "./RankingTabPanel";
import SettingTabPanel from "./SettingTabPanel";
import { useAppSelector } from "@/lib/hooks";

export default function ChannelTabs() {
  const [selectedValue, setSelectedValue] =
    useState<ChannelTabsValue>("ranking");
  const targetElementRef = useRef<HTMLDivElement>(null);
  const { isSignedIn } = useAppSelector((state) => ({
    isSignedIn: state.user.isSignedIn,
  }));

  const handleChange: TabsProps["onChange"] = (_, newValue) => {
    if (document.querySelector("main")!.scrollTop > 395) {
      targetElementRef.current!.scrollIntoView();
    }
    setSelectedValue(newValue);
  };

  useEffect(() => {
    if (!isSignedIn && selectedValue === "setting") {
      setSelectedValue("ranking");
    }
  }, [isSignedIn, selectedValue]);

  return (
    <Box
      ref={targetElementRef}
      sx={{ flex: 1, display: "flex", flexDirection: "column" }}
    >
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
        <Tab value={"ranking"} label="랭킹" />
        {isSignedIn && <Tab value={"setting"} label="설정" />}
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
      <RankingTabPanel value={"ranking"} selectedValue={selectedValue} />
      <SettingTabPanel value={"setting"} selectedValue={selectedValue} />
    </Box>
  );
}
