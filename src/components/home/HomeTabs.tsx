import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import { ReactNode, useEffect, useState } from "react";
import SubscriptionsRoundedIcon from "@mui/icons-material/SubscriptionsRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { useRouter } from "next/router";
import AllTab from "./AllTab";
import FavoriteTab from "./FavoriteTab";

type Value = "all" | "favorite";

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

const HomeTabs = () => {
  const router = useRouter();
  const valueFromQuery = router.query.tab as Value | undefined;
  const [selectedValue, setSelectedValue] = useState<Value>(
    valueFromQuery ?? "all"
  );

  useEffect(() => {
    setSelectedValue(valueFromQuery ?? "all");
  }, [valueFromQuery]);

  const handleTabsChange: TabsProps["onChange"] = (_, newValue) => {
    setSelectedValue(newValue);
    router.push({
      pathname: router.pathname,
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
      >
        <Tab
          value={"all"}
          icon={<SubscriptionsRoundedIcon sx={{ color: "youtube" }} />}
          iconPosition="start"
          label="모두"
          sx={{ width: 120 }}
        />
        <Tab
          value={"favorite"}
          icon={<StarRoundedIcon sx={{ color: "favorite" }} />}
          iconPosition="start"
          label="즐겨찾기"
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
      <TabPanel value={"all"} selectedValue={selectedValue}>
        <AllTab />
      </TabPanel>
      <TabPanel value={"favorite"} selectedValue={selectedValue}>
        <FavoriteTab />
      </TabPanel>
    </Box>
  );
};

export default HomeTabs;
