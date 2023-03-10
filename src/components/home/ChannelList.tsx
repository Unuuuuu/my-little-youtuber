import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import ListItemButton from "@mui/material/ListItemButton";
import Link from "next/link";
import Image from "next/image";
import ListItemText from "@mui/material/ListItemText";
import { ChannelDataWithoutVideos } from "@/types";
import { memo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userActions } from "@/redux/slices/userSlice";
import { FixedSizeList } from "react-window";
import { loginRequestSnackbarActions } from "@/redux/slices/loginRequestSnackbarSlice";
import Empty from "../common/Empty";

const debounce = (cb: () => void) => {
  let id: number | null = null;

  return () => {
    if (id) {
      window.cancelAnimationFrame(id);
    }

    id = window.requestAnimationFrame(() => {
      cb();
    });
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
  const [height, setHeight] = useState(816);

  const handleResize = () => {
    setHeight(window.innerHeight - 128);
  };

  useEffect(() => {
    setHeight(window.innerHeight - 128);

    window.addEventListener("resize", debounce(handleResize));

    return () => {
      window.removeEventListener("resize", debounce(handleResize));
    };
  }, []);

  const handleCheckboxChange = async (checked: boolean, channelId: string) => {
    if (!isInitialized) {
      return;
    }

    if (!isSignedIn) {
      dispatch(loginRequestSnackbarActions.open());
      return;
    }

    dispatch(userActions.updateFavoriteChannel({ checked, channelId }));
  };

  if (channelDatasWithoutVideos.length === 0) {
    return <Empty title="????????? ????????????" subtitle="??????????????? ??????????????????" />;
  }

  return (
    <FixedSizeList
      height={height}
      width={"100%"}
      itemSize={80}
      itemCount={channelDatasWithoutVideos.length}
      overscanCount={5}
    >
      {(listChildComponentProps) => {
        const { index, style } = listChildComponentProps;
        const channelDataWithoutVideos = channelDatasWithoutVideos[index];

        return (
          <ListItem
            style={style}
            key={channelDataWithoutVideos.id}
            component={"div"}
            secondaryAction={
              <Checkbox
                checked={favoriteChannels.includes(channelDataWithoutVideos.id)}
                icon={<StarOutlineRoundedIcon />}
                checkedIcon={<StarRoundedIcon />}
                onChange={(_, checked) => {
                  handleCheckboxChange(checked, channelDataWithoutVideos.id);
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
                  blurDataURL={channelDataWithoutVideos.thumbnail.blurDataURL}
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
        );
      }}
    </FixedSizeList>
  );
});

ChannelList.displayName = "ChannelList";

export default ChannelList;
