import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import { ReactNode, useState } from "react";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import RankingTab from "./RankingTab";
import { teal } from "@mui/material/colors";
import GameTab from "./GameTab";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";

interface TabPanelProps {
  children: ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      sx={{ flexGrow: 1, overflowY: "scroll" }}
    >
      {children}
    </Box>
  );
};

const ChannelTabs = () => {
  const [value, setValue] = useState(0);

  const handleTabsChange: TabsProps["onChange"] = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Tabs
        value={value}
        onChange={handleTabsChange}
        textColor="inherit"
        sx={{
          flexShrink: 0,
          position: "relative",
          "& .MuiTabs-indicator": {
            height: 3,
            backgroundColor: "tabsIndicator",
          },
        }}
      >
        <Tab
          icon={<SportsEsportsRoundedIcon sx={{ color: teal["300"] }} />}
          iconPosition="start"
          label="게임"
          sx={{ width: 120 }}
        />
        <Tab
          icon={
            <EmojiEventsRoundedIcon
              sx={{
                color: "goldTrophy",
              }}
            />
          }
          iconPosition="start"
          label="랭킹"
          sx={{ width: 120 }}
        />
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
      <TabPanel value={value} index={0}>
        <GameTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RankingTab />
      </TabPanel>
    </Box>
  );
};

export default ChannelTabs;
