"use client";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import GeneralRankingTabPanel from "./GeneralRankingTabPanel";
import TimeAttackRankingTabPanel from "./TimeAttackRankingTabPanel";

export default function Ranking() {
  const [value, setValue] = useState<GameMode>("GENERAL");

  const handleTabsChange: TabsProps["onChange"] = (_, newValue: GameMode) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          borderWidth: "1px 0",
          borderStyle: "solid",
          borderColor: grey[200],
          bgcolor: "tab",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          py: "12px",
          maxWidth: "550px",
          m: "0 auto",
        }}
      >
        <Typography variant="h2" sx={{ color: "primary.main" }}>
          명예의 전당
        </Typography>
        <Typography variant="body2">
          TOP100 안에 들어간 랭커들이에요!!
        </Typography>
      </Box>
      <Box sx={{ px: "24px" }}>
        <Box sx={{ position: "relative" }}>
          <Tabs
            value={value}
            onChange={handleTabsChange}
            variant="fullWidth"
            sx={{
              ".MuiTab-root": {
                fontSize: "18px",
                lineHeight: "22px",
                "&:not(.Mui-selected)": {
                  color: grey[500],
                },
              },
              ".MuiButtonBase-root.Mui-selected": {
                color: grey[900],
                fontWeight: 700,
              },
              ".MuiTabs-scroller": {
                zIndex: 1,
              },
              ".MuiTabs-indicator": {
                height: "3px",
              },
            }}
          >
            <Tab value="GENERAL" label="일반" />
            <Tab value="TIME_ATTACK" label="타임어택" />
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
        <GeneralRankingTabPanel value="GENERAL" selectedValue={value} />
        <TimeAttackRankingTabPanel value="TIME_ATTACK" selectedValue={value} />
      </Box>
    </>
  );
}
