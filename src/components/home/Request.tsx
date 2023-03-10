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
import { doc, setDoc } from "firebase/firestore";
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

    setDoc(doc(db, "requests", new Date().toISOString()), {
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
          ????????? ?????? ????????????
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
                  ????????? ?????? ??????
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  ???????????? ?????? ????????? ???????????? ???????????????.
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    inputRef={inputRef}
                    error={isInputError}
                    fullWidth
                    size="small"
                    sx={{ mb: 1 }}
                    placeholder="(e.g., ?????????, ?????????,
              ????????????, ?????????)"
                  />
                  <Button fullWidth variant="contained" type="submit">
                    ????????????
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
                  ?????? ??????
                </Typography>
                <Typography sx={{ wordBreak: "keep-all", mb: 1 }}>
                  ????????? ????????? ???????????? {email}??? ????????????????????????.
                </Typography>
                <Button fullWidth variant="contained" onClick={handleClose}>
                  ??????
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
