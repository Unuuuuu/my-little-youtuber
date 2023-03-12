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
      <Empty title="로그인 해주세요" subtitle="닉네임을 변경할 수 있습니다">
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
        닉네임 설정
      </Typography>
      {nickname === undefined ? (
        <Typography sx={{ mb: 1 }}>
          현재 닉네임이 설정되어 있지 않습니다.
        </Typography>
      ) : (
        <Typography sx={{ mb: 1 }}>
          현재 닉네임은{" "}
          <Box component={"b"} fontWeight={500}>
            {nickname}
          </Box>
          입니다.
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 1 }}>
          <TextField
            inputRef={inputRef}
            error={isInputError}
            fullWidth
            size="small"
            placeholder="닉네임을 입력해주세요"
          />
          <Typography variant="caption" color={"GrayText"}>
            부적절한 닉네임은 제재의 대상입니다.
          </Typography>
        </Box>
        <Button fullWidth variant="contained" type="submit" size="large">
          {nickname === undefined ? "설정하기" : "변경하기"}
        </Button>
      </form>
    </Box>
  );
};

export default SettingTab;
