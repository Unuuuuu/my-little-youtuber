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
  const scrollTargetElementRef = useRef<HTMLDivElement>(null);
  const { isSignedIn } = useAppSelector((state) => ({
    isSignedIn: state.user.isSignedIn,
  }));
  const isIntersectingRef = useRef(true);

  const handleChange: TabsProps["onChange"] = (_, newValue) => {
    if (!isIntersectingRef.current) {
      scrollTargetElementRef.current!.scrollIntoView();
    }
    setSelectedValue(newValue);
  };

  useEffect(() => {
    if (!isSignedIn && selectedValue === "setting") {
      setSelectedValue("ranking");
    }
  }, [isSignedIn, selectedValue]);

  useEffect(() => {
    const observeTargetElement = document.querySelector("section#info");
    if (observeTargetElement === null) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isIntersectingRef.current = entry.isIntersecting;
      },
      { root: document.querySelector("main") }
    );

    observer.observe(observeTargetElement);

    return () => {
      observer.unobserve(observeTargetElement);
    };
  }, []);

  return (
    <Box
      ref={scrollTargetElementRef}
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
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tab value={"ranking"} label="랭킹" />
        {isSignedIn && <Tab value={"setting"} label="설정" />}
      </Tabs>
      <RankingTabPanel value={"ranking"} selectedValue={selectedValue} />
      <SettingTabPanel value={"setting"} selectedValue={selectedValue} />
    </Box>
  );
}
