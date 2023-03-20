"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { modalSliceActions } from "@/lib/slices/modalSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import TextField from "@mui/material/TextField";
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Typography from "@mui/material/Typography";

const steps = ["요청", "완료"];

export default function YoutuberAddRequestModal() {
  const { isYoutuberAddRequestModalOpen, userId, email, displayName } =
    useAppSelector((state) => ({
      isYoutuberAddRequestModalOpen: state.modal.isYoutuberAddRequestModalOpen,
      userId: state.user.id,
      email: state.user.email,
      displayName: state.user.displayName,
    }));
  const dispatch = useAppDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [isInputError, setIsInputError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleModalClose = useCallback(() => {
    dispatch(modalSliceActions.closeYoutuberAddRequestModal());
    setIsInputError(false);
    setActiveStep(0);
  }, [dispatch]);

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

    setIsInputError(false);
    setActiveStep(1);

    setDoc(doc(db, "requests", new Date().toISOString()), {
      userId,
      email,
      displayName,
      youtubers: inputRef.current.value,
    });
  };

  useEffect(() => {
    return () => {
      handleModalClose();
    };
  }, [handleModalClose]);

  return (
    <Modal
      open={isYoutuberAddRequestModalOpen}
      onClose={handleModalClose}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 360,
          p: 2,
          bgcolor: "white",
          borderRadius: 2,
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 && (
          <form onSubmit={handleSubmit}>
            <TextField
              inputRef={inputRef}
              error={isInputError}
              fullWidth
              size="small"
              sx={{ mb: 1 }}
              placeholder="채널명을 입력해주세요."
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              color="secondary"
            >
              요청하기
            </Button>
          </form>
        )}
        {activeStep === 1 && (
          <Box>
            <Typography sx={{ mb: 1 }} textAlign="center">
              일주일 이내로 추가해서
              <br />
              {email}로 연락드리겠습니다.
            </Typography>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleModalClose}
            >
              닫기
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
