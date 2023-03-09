import { ChannelDataWithoutVideos } from "@/types";
import { useAppSelector } from "@/redux/hooks";
import CircularProgress from "@mui/material/CircularProgress";
import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";
import { signInWithRedirect } from "firebase/auth";
import { auth, provider } from "@/utils/firebase";
import ChannelList from "./ChannelList";
import Empty from "../common/Empty";
import { useMemo } from "react";
import Box from "@mui/material/Box";
import { useChannelDatasWithoutVideosContext } from "@/context/ChannelDatasWithoutVideosContext";

const FavoriteTab = () => {
  const { favoriteChannels, isInitialized, isSignedIn } = useAppSelector(
    (state) => ({
      favoriteChannels: state.user.favoriteChannels,
      isInitialized: state.user.isInitialized,
      isSignedIn: state.user.isSignedIn,
    })
  );
  const channelDatasWithoutVideos = useChannelDatasWithoutVideosContext();

  const handleLoginButtonClick = () => {
    signInWithRedirect(auth, provider);
  };

  const favoriteChannelDatasWithoutVideos = useMemo(() => {
    if (channelDatasWithoutVideos === null) {
      return [];
    }

    return channelDatasWithoutVideos.filter((channelDataWithoutVidoes) =>
      favoriteChannels.includes(channelDataWithoutVidoes.id)
    );
  }, [channelDatasWithoutVideos, favoriteChannels]);

  if (!isInitialized) {
    return (
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
    );
  }

  if (!isSignedIn) {
    return (
      <Empty title="로그인 해주세요" subtitle="즐겨찾기를 추가할 수 있습니다">
        <Button
          startIcon={<GoogleIcon sx={{ color: "google" }} />}
          variant="outlined"
          onClick={handleLoginButtonClick}
          sx={{ mt: 2 }}
        >
          구글 계정으로 로그인
        </Button>
      </Empty>
    );
  }

  return (
    <ChannelList
      channelDatasWithoutVideos={favoriteChannelDatasWithoutVideos}
    />
  );
};

export default FavoriteTab;
