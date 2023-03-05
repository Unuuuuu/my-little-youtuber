import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import YouTubeIcon from "@mui/icons-material/YouTube";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import ListItemButton from "@mui/material/ListItemButton";
import Link from "next/link";
import Image from "next/image";
import ListItemText from "@mui/material/ListItemText";
import { ChannelDataWithoutVideos } from "@/types";
import { memo, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userActions } from "@/redux/slices/userSlice";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import InboxTwoToneIcon from "@mui/icons-material/InboxTwoTone";

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

interface ChannelListProps {
  channelDatasWithoutVideos: ChannelDataWithoutVideos[];
}

const ChannelList = memo<ChannelListProps>((props) => {
  const { channelDatasWithoutVideos } = props;
  const { isInitialized, isSignedIn, favoriteChannels } = useAppSelector(
    (state) => ({
      favoriteChannels: state.user.favoriteChannels,
      isInitialized: state.user.isInitialized,
      isSignedIn: state.user.isSignedIn,
    })
  );
  const dispatch = useAppDispatch();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleSnackbarOpen = () => {
    setIsSnackbarOpen(true);
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackbarOpen(false);
  };

  const handleCheckboxChange = async (checked: boolean, channelId: string) => {
    if (!isInitialized) {
      return;
    }

    if (!isSignedIn) {
      handleSnackbarOpen();
      return;
    }

    dispatch(userActions.updateFavoriteChannel({ checked, channelId }));
  };

  const classifiedChannelDatas = useMemo(
    () => classifyChannelDatas(channelDatasWithoutVideos),
    [channelDatasWithoutVideos]
  );

  if (channelDatasWithoutVideos.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <InboxTwoToneIcon
          sx={{ color: "GrayText", fontSize: 64, opacity: 0.75 }}
        />
        <Typography component={"h3"} fontSize={24} color="GrayText">
          채널이 없습니다
        </Typography>
      </Box>
    );
  }

  return (
    <>
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
                  {channelDatasWithoutVideos.map((channelDataWithoutVideos) => (
                    <ListItem
                      key={channelDataWithoutVideos.id}
                      secondaryAction={
                        <Checkbox
                          checked={favoriteChannels.includes(
                            channelDataWithoutVideos.id
                          )}
                          icon={<StarOutlineRoundedIcon />}
                          checkedIcon={<StarRoundedIcon />}
                          onChange={(_, checked) => {
                            handleCheckboxChange(
                              checked,
                              channelDataWithoutVideos.id
                            );
                          }}
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
                  ))}
                </Box>
              </Box>
            );
          }
        )}
      </List>
      <Snackbar
        open={isSnackbarOpen}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          로그인이 필요합니다.
        </Alert>
      </Snackbar>
    </>
  );
});

ChannelList.displayName = "ChannelList";

export default ChannelList;
