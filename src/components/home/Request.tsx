import Fab from "@mui/material/Fab";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginRequestSnackbarActions } from "@/redux/slices/loginRequestSnackbarSlice";
import Modal from "@mui/material/Modal";
import { FormEventHandler, useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/utils/firebase";
import Fade from "@mui/material/Fade";

const Request = () => {
  const { isSignedIn, email, uid, displayName } = useAppSelector((state) => ({
    isSignedIn: state.user.isSignedIn,
    email: state.user.email,
    uid: state.user.uid,
    displayName: state.user.displayName,
  }));
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [isInputError, setIsInputError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFABClick = () => {
    if (!isSignedIn) {
      dispatch(loginRequestSnackbarActions.open());
      return;
    }

    setIsModalOpen(true);
    setIsResult(false);
    setIsInputError(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIsResult(false);
    setIsInputError(false);
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

    addDoc(collection(db, "requests"), {
      email,
      uid,
      displayName,
      youtubers: inputRef.current.value,
    });
    setIsResult(true);
  };

  return (
    <>
      <Fab
        size="small"
        color="primary"
        variant="extended"
        sx={{
          position: "fixed",
          bottom: 23,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        onClick={handleFABClick}
      >
        <AddRoundedIcon sx={{ mr: 1 }} fontSize="small" />
        <Typography fontSize={14} sx={{ mr: 1 }}>
          유튜버 추가 요청하기
        </Typography>
      </Fab>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <>
          {!isResult && (
            <Fade in={!isResult} appear={false}>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 480,
                  borderRadius: 2,
                  bgcolor: "white",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  component={"h1"}
                  fontSize={20}
                  fontWeight={500}
                  sx={{ mb: 0.5 }}
                >
                  유튜버 추가 요청
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  추가하고 싶은 유튜브 채널명을 알려주세요.
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    inputRef={inputRef}
                    error={isInputError}
                    fullWidth
                    size="small"
                    sx={{ mb: 1 }}
                    placeholder="(e.g., 우왁굳, 침착맨,
              슈카월드, 진용진)"
                  />
                  <Button fullWidth variant="contained" type="submit">
                    요청하기
                  </Button>
                </form>
              </Box>
            </Fade>
          )}
          {isResult && (
            <Fade in={isResult}>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 480,
                  borderRadius: 2,
                  bgcolor: "white",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  component={"h1"}
                  fontSize={20}
                  fontWeight={500}
                  sx={{ mb: 0.5 }}
                >
                  요청 완료
                </Typography>
                <Typography sx={{ wordBreak: "keep-all", mb: 1 }}>
                  일주일 이내로 추가하여 {email}로 연락드릴게요.
                </Typography>
                <Button fullWidth variant="contained" onClick={handleClose}>
                  닫기
                </Button>
              </Box>
            </Fade>
          )}
        </>
      </Modal>
    </>
  );
};

export default Request;
