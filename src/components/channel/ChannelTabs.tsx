import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import { ReactNode, useEffect, useState } from "react";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import RankingTab from "./RankingTab";
import { grey, teal } from "@mui/material/colors";
import GameTab from "./GameTab";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import { useRouter } from "next/router";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingTab from "./SettingTab";

type Value = "game" | "ranking" | "setting";

interface TabPanelProps {
  children: ReactNode;
  value: Value;
  selectedValue: Value;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, selectedValue } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== selectedValue}
      sx={{ flexGrow: 1, overflowY: "scroll" }}
    >
      {children}
    </Box>
  );
};

const ChannelTabs = () => {
  const router = useRouter();
  const valueFromQuery = router.query.tab as Value | undefined;
  const [selectedValue, setSelectedValue] = useState<Value>(
    valueFromQuery ?? "game"
  );

  useEffect(() => {
    setSelectedValue(valueFromQuery ?? "game");
  }, [valueFromQuery]);

  const handleTabsChange: TabsProps["onChange"] = (_, newValue) => {
    setSelectedValue(newValue);
    router.push({
      pathname: `/channel/${router.query.channelId}`,
      query: {
        tab: newValue,
      },
    });
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
        value={selectedValue}
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
        variant="fullWidth"
      >
        <Tab
          value={"game"}
          icon={<SportsEsportsRoundedIcon sx={{ color: teal["300"] }} />}
          iconPosition="start"
          label="??????"
        />
        <Tab
          value={"ranking"}
          icon={
            <EmojiEventsRoundedIcon
              sx={{
                color: "goldTrophy",
              }}
            />
          }
          iconPosition="start"
          label="??????"
        />
        <Tab
          value={"setting"}
          icon={
            <SettingsIcon
              sx={{
                color: grey["500"],
              }}
            />
          }
          iconPosition="start"
          label="??????"
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
      <TabPanel value={"game"} selectedValue={selectedValue}>
        <GameTab />
      </TabPanel>
      <TabPanel value={"ranking"} selectedValue={selectedValue}>
        <RankingTab />
      </TabPanel>
      <TabPanel value={"setting"} selectedValue={selectedValue}>
        <SettingTab />
      </TabPanel>
    </Box>
  );
};

export default ChannelTabs;
