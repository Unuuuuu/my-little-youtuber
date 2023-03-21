"use client";

import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AllTabPanel from "./AllTabPanel";
import FavoriteTabPanel from "./FavoriteTabPanel";
import { useAppSelector } from "@/lib/hooks";
import TagTabPanel from "./TagTabPanel";

export default function HomeTabs() {
  const { isInitialized, isSignedIn } = useAppSelector((state) => ({
    isInitialized: state.user.isInitialized,
    isSignedIn: state.user.isSignedIn,
  }));
  const [selectedValue, setSelectedValue] = useState<HomeTabsValue>(
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
        <Tab value={"woowakgood"} label="우왁굳" />
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
      <AllTabPanel value={"all"} selectedValue={selectedValue} />
      <FavoriteTabPanel value={"favorite"} selectedValue={selectedValue} />
      <TagTabPanel
        tagName={"woowakgood"}
        value={"woowakgood"}
        selectedValue={selectedValue}
      />
    </Box>
  );
}
