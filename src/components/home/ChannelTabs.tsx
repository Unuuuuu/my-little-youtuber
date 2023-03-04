import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { ReactNode, useMemo, useState } from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import SubscriptionsRoundedIcon from "@mui/icons-material/SubscriptionsRounded";
import { grey } from "@mui/material/colors";
import { ChannelDataWithoutVideos } from "@/types";
import Image from "next/image";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import Checkbox from "@mui/material/Checkbox";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Link from "next/link";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const playButtonColorMap = {
  bronze: "브론즈",
  silver: "실버",
  gold: "골드",
  diamond: "다이아몬드",
};

type PlayButtonColorKey = keyof typeof playButtonColorMap;

const classifyChannelDatas = (
  channelDatasWithoutVideos: ChannelDataWithoutVideos[]
): {
  diamond: ChannelDataWithoutVideos[];
  gold: ChannelDataWithoutVideos[];
  silver: ChannelDataWithoutVideos[];
  bronze: ChannelDataWithoutVideos[];
} => {
  const diamond: ChannelDataWithoutVideos[] = [];
  const gold: ChannelDataWithoutVideos[] = [];
  const silver: ChannelDataWithoutVideos[] = [];
  const bronze: ChannelDataWithoutVideos[] = [];

  channelDatasWithoutVideos.forEach((channelDataWithoutVideos) => {
    if (channelDataWithoutVideos.subscriberCount < 100000) {
      bronze.push(channelDataWithoutVideos);
    } else if (channelDataWithoutVideos.subscriberCount < 1000000) {
      silver.push(channelDataWithoutVideos);
    } else if (channelDataWithoutVideos.subscriberCount < 10000000) {
      gold.push(channelDataWithoutVideos);
    } else if (channelDataWithoutVideos.subscriberCount < 10000000) {
      diamond.push(channelDataWithoutVideos);
    }
  });

  return {
    diamond,
    gold,
    silver,
    bronze,
  };
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
      sx={{ flexGrow: 1, overflowY: "scroll" }}
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const classifiedChannelDatas = useMemo(
    () => classifyChannelDatas(channelDatasWithoutVideos),
    [channelDatasWithoutVideos]
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
        onChange={handleChange}
        textColor="inherit"
        sx={{
          flexShrink: 0,
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
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 0,
          }}
        >
          {Object.entries(classifiedChannelDatas).map(
            ([playButtonColorKey, channelDatasWithoutVideos]) => {
              if (channelDatasWithoutVideos.length === 0) {
                return null;
              }

              return (
                <Box
                  component={"li"}
                  key={playButtonColorKey}
                  sx={{
                    "&:not(:last-child)": {
                      borderBottom: 1,
                      borderColor: "divider",
                    },
                  }}
                >
                  <Box component={"ul"}>
                    <ListSubheader
                      sx={{
                        display: "flex",
                        py: 2,
                        alignItems: "center",
                        gap: 0.5,
                      }}
                      disableSticky
                    >
                      <YouTubeIcon sx={{ color: playButtonColorKey }} />
                      <Typography color="GrayText" fontSize={14}>
                        {
                          playButtonColorMap[
                            playButtonColorKey as PlayButtonColorKey
                          ]
                        }
                        버튼
                      </Typography>
                    </ListSubheader>
                    {channelDatasWithoutVideos.map(
                      (channelDataWithoutVideos) => (
                        <ListItem
                          key={channelDataWithoutVideos.id}
                          secondaryAction={
                            <Checkbox
                              icon={<StarOutlineRoundedIcon />}
                              checkedIcon={<StarRoundedIcon />}
                              sx={{
                                color: "favorite",
                                "&.Mui-checked": {
                                  color: "favorite",
                                },
                              }}
                            />
                          }
                          disablePadding
                        >
                          <Box
                            component={Link}
                            href={`/channel/${channelDataWithoutVideos.id}`}
                            sx={{ width: "100%" }}
                          >
                            <ListItemButton sx={{ py: 2, gap: 2, pr: "74px" }}>
                              <Image
                                placeholder="blur"
                                blurDataURL={
                                  channelDataWithoutVideos.thumbnail.blurDataURL
                                }
                                src={channelDataWithoutVideos.thumbnail.url}
                                alt="thumbnail"
                                width={48}
                                height={48}
                                style={{ borderRadius: "50%" }}
                              />
                              <ListItemText
                                primaryTypographyProps={{
                                  noWrap: true,
                                }}
                              >
                                {channelDataWithoutVideos.title}
                              </ListItemText>
                            </ListItemButton>
                          </Box>
                        </ListItem>
                      )
                    )}
                  </Box>
                </Box>
              );
            }
          )}
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        To be developed
      </TabPanel>
    </Box>
  );
};

export default ChannelTabs;
