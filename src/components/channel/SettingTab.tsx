import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import CircularProgress from "@mui/material/CircularProgress";
import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";
import { signInWithRedirect } from "firebase/auth";
import { auth, provider } from "@/utils/firebase";
import Empty from "../common/Empty";
import Box from "@mui/material/Box";
import { kakaotalkGuideModalActions } from "@/redux/slices/kakaotalkGuideModalSlice";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { FormEventHandler, useRef, useState } from "react";
import { userActions } from "@/redux/slices/userSlice";

const SettingTab = () => {
  const { isUserInitialized, isSignedIn, nicknames } = useAppSelector(
    (state) => ({
      isUserInitialized: state.user.isInitialized,
      isSignedIn: state.user.isSignedIn,
      nicknames: state.user.nicknames,
    })
  );
  const dispatch = useAppDispatch();
  const [isInputError, setIsInputError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const channelId = router.query.channelId as string;
  const nickname = nicknames[channelId];

  const handleLoginButtonClick = () => {
    if (navigator.userAgent.includes("KAKAOTALK")) {
      dispatch(kakaotalkGuideModalActions.open());
      return;
    }

    signInWithRedirect(auth, provider);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (inputRef.current === null) {
      return;
    }

    if (inputRef.current.value.trim() === "") {
      setIsInputError(true);
      inputRef.current.focus();
      return;
    }

    dispatch(
      userActions.updateNickname({
        nickname: inputRef.current.value,
        channelId,
      })
    );
    setIsInputError(false);
    inputRef.current.value = "";
  };

  if (!isUserInitialized) {
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
      <Empty title="????????? ????????????" subtitle="???????????? ????????? ??? ????????????">
        <Button
          startIcon={<GoogleIcon sx={{ color: "google" }} />}
          variant="outlined"
          onClick={handleLoginButtonClick}
          sx={{ mt: 2 }}
        >
          ?????? ???????????? ?????????
        </Button>
      </Empty>
    );
  }

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Typography
        component={"h2"}
        fontSize={20}
        fontWeight={500}
        sx={{
          mb: 0.5,
        }}
      >
        ????????? ??????
      </Typography>
      {nickname === undefined ? (
        <Typography sx={{ mb: 1 }}>
          ?????? ???????????? ???????????? ?????? ????????????.
        </Typography>
      ) : (
        <Typography sx={{ mb: 1 }}>
          ?????? ????????????{" "}
          <Box component={"b"} fontWeight={500}>
            {nickname}
          </Box>
          ?????????.
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 1 }}>
          <TextField
            inputRef={inputRef}
            error={isInputError}
            fullWidth
            size="small"
            placeholder="???????????? ??????????????????"
          />
          <Typography variant="caption" color={"GrayText"}>
            ???????????? ???????????? ????????? ????????? ????????? ?????? ??? ????????????.
          </Typography>
        </Box>
        <Button fullWidth variant="contained" type="submit" size="large">
          {nickname === undefined ? "????????????" : "????????????"}
        </Button>
      </form>
    </Box>
  );
};

export default SettingTab;
