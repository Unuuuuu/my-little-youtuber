import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { ReactNode, useRef, useState } from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import SubscriptionsRoundedIcon from "@mui/icons-material/SubscriptionsRounded";
import { grey } from "@mui/material/colors";
import { ChannelDataWithoutVideos } from "@/types";
import Image from "next/image";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import Checkbox from "@mui/material/Checkbox";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Link from "next/link";
import ButtonBase from "@mui/material/ButtonBase";

const playButtonColorMap = {
  bronze: "브론즈",
  silver: "실버",
  gold: "골드",
  diamond: "다이아몬드",
};

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
      sx={{ height: "calc(100% - 72px)", overflowY: "scroll" }}
    >
      {value === index && children}
    </Box>
  );
};

interface ChannelTabsProps {
  channelDatasWithoutVideos: ChannelDataWithoutVideos[];
}

const ChannelTabs: React.FC<ChannelTabsProps> = (props) => {
  const { channelDatasWithoutVideos } = props;
  const [value, setValue] = useState(0);
  const playButtonColorRef = useRef<keyof typeof playButtonColorMap>();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        sx={{
          position: "relative",
          "& .MuiTabs-indicator": {
            height: 3,
            backgroundColor: grey["A700"],
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
        <Box
          component={"ul"}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {channelDatasWithoutVideos.map((channelData) => {
            const prevPlayButtonColor = playButtonColorRef.current;

            if (channelData.subscriberCount < 100000) {
              playButtonColorRef.current = "bronze";
            } else if (channelData.subscriberCount < 1000000) {
              playButtonColorRef.current = "silver";
            } else if (channelData.subscriberCount < 10000000) {
              playButtonColorRef.current = "gold";
            } else if (channelData.subscriberCount < 10000000) {
              playButtonColorRef.current = "diamond";
            }

            let playButtonElement: ReactNode = null;
            if (prevPlayButtonColor !== playButtonColorRef.current) {
              playButtonElement = (
                <Box
                  sx={{
                    display: "flex",
                    py: 2,
                    px: 2,
                    alignItems: "center",
                    gap: 0.5,
                    "&:not(:first-child)": {
                      borderTop: 1,
                      borderColor: "divider",
                    },
                  }}
                >
                  <YouTubeIcon
                    sx={{ color: `${playButtonColorRef.current}` }}
                  />
                  <Typography color="GrayText" fontSize={14}>
                    {playButtonColorMap[playButtonColorRef.current!]}버튼
                  </Typography>
                </Box>
              );
            }

            return (
              <>
                {playButtonElement}
                <Box
                  key={channelData.id}
                  component={"li"}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box
                    component={Link}
                    href={`/channel/${channelData.id}`}
                    sx={{
                      flexGrow: 1,
                      overflow: "hidden",
                    }}
                  >
                    <ButtonBase
                      focusRipple
                      sx={{
                        width: "100%",
                        p: 2,
                        display: "flex",
                        gap: 2,
                        justifyContent: "flex-start",
                      }}
                    >
                      <Image
                        placeholder="blur"
                        blurDataURL={channelData.thumbnail.blurDataURL}
                        src={channelData.thumbnail.url}
                        alt="thumbnail"
                        width={48}
                        height={48}
                        style={{ borderRadius: "50%" }}
                      />
                      <Typography
                        component={"h2"}
                        fontSize={16}
                        fontWeight={500}
                        noWrap
                      >
                        {channelData.title}
                      </Typography>
                    </ButtonBase>
                  </Box>
                  <Checkbox
                    icon={<StarOutlineRoundedIcon />}
                    checkedIcon={<StarRoundedIcon />}
                    sx={{
                      flexBasis: 80,
                      flexShrink: 0,
                      height: 80,
                      color: "favorite",
                      "&.Mui-checked": {
                        color: "favorite",
                      },
                    }}
                  />
                </Box>
              </>
            );
          })}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        To be developed
      </TabPanel>
    </Box>
  );
};

export default ChannelTabs;
