import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import { ReactNode, useMemo, useState } from "react";
import SubscriptionsRoundedIcon from "@mui/icons-material/SubscriptionsRounded";
import { ChannelDataWithoutVideos } from "@/types";
import { useAppSelector } from "@/redux/hooks";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CircularProgress from "@mui/material/CircularProgress";
import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";
import { signInWithRedirect } from "firebase/auth";
import { auth, provider } from "@/utils/firebase";
import ChannelList from "./ChannelList";
import Empty from "../common/Empty";

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

interface HomeTabsProps {
  channelDatasWithoutVideos: ChannelDataWithoutVideos[];
}

const HomeTabs: React.FC<HomeTabsProps> = (props) => {
  const { channelDatasWithoutVideos } = props;
  const [value, setValue] = useState(0);
  const { favoriteChannels, isInitialized, isSignedIn } = useAppSelector(
    (state) => ({
      favoriteChannels: state.user.favoriteChannels,
      isInitialized: state.user.isInitialized,
      isSignedIn: state.user.isSignedIn,
    })
  );

  const handleTabsChange: TabsProps["onChange"] = (_, newValue) => {
    setValue(newValue);
  };

  const handleLoginButtonClick = () => {
    signInWithRedirect(auth, provider);
  };

  const favoriteChannelDatasWithoutVideos = useMemo(
    () =>
      channelDatasWithoutVideos.filter((channelDataWithoutVidoes) =>
        favoriteChannels.includes(channelDataWithoutVidoes.id)
      ),
    [channelDatasWithoutVideos, favoriteChannels]
  );

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
          icon={<SubscriptionsRoundedIcon sx={{ color: "youtube" }} />}
          iconPosition="start"
          label="모두"
          sx={{ width: 120 }}
        />
        <Tab
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
      <TabPanel value={value} index={0}>
        <ChannelList channelDatasWithoutVideos={channelDatasWithoutVideos} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {!isInitialized && (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {isInitialized &&
          (isSignedIn ? (
            <ChannelList
              channelDatasWithoutVideos={favoriteChannelDatasWithoutVideos}
            />
          ) : (
            <Empty
              title="로그인 해주세요"
              subtitle="즐겨찾기를 추가할 수 있습니다"
            >
              <Button
                startIcon={<GoogleIcon sx={{ color: "google" }} />}
                variant="outlined"
                onClick={handleLoginButtonClick}
                sx={{ mt: 2 }}
              >
                구글 계정으로 로그인
              </Button>
            </Empty>
          ))}
      </TabPanel>
    </Box>
  );
};

export default HomeTabs;
