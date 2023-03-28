"use client";

import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AllTabPanel from "./AllTabPanel";
import FavoriteTabPanel from "./FavoriteTabPanel";
import { useAppSelector } from "@/lib/hooks";
import TagTabPanel from "./TagTabPanel";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  allTags: TagData[];
}

export default function HomeTabs(props: Props) {
  const { allTags } = props;
  const { isInitialized, isSignedIn } = useAppSelector((state) => ({
    isInitialized: state.user.isInitialized,
    isSignedIn: state.user.isSignedIn,
  }));
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [selectedValue, setSelectedValue] = useState(
    tab ?? (isInitialized && isSignedIn ? "favorite" : "all")
  );
  const scrollTargetElementRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isIntersectingRef = useRef(true);

  const handleChange: TabsProps["onChange"] = (_, newValue) => {
    if (!isIntersectingRef.current) {
      scrollTargetElementRef.current!.scrollIntoView();
    }
    router.replace(`${pathname}?tab=${newValue}`);
    setSelectedValue(newValue);
  };

  useEffect(() => {
    if (tab === null) {
      return;
    }

    setSelectedValue(tab);
  }, [tab]);

  useEffect(() => {
    if (!isSignedIn && selectedValue === "favorite") {
      setSelectedValue("all");
    }
  }, [isSignedIn, selectedValue]);

  useEffect(() => {
    const observeTargetElement = document.querySelector("section#hero");
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
    <Box ref={scrollTargetElementRef} sx={{ flex: 1 }}>
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
          ".MuiTabs-scrollButtons.Mui-disabled": {
            opacity: 0.3,
          },
        }}
        allowScrollButtonsMobile
      >
        {isSignedIn && <Tab value={"favorite"} label="즐겨찾기" />}
        <Tab value={"all"} label="전체" />
        {allTags.map((tag) => (
          <Tab key={tag.id} value={tag.id} label={tag.label} />
        ))}
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
