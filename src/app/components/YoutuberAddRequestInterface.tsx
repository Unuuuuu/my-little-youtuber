"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import userCirclePlusImageSrc from "../../assets/user-circle-plus.png";
import emailImageSrc from "../../assets/email.png";
import checkImageSrc from "../../assets/check.png";
import { grey } from "@/lib/colors";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { youtuberAddRequestInterfaceSliceActions } from "@/lib/slices/youtuberAddRequestInterfaceSlice";
import Button from "./Button";
import Drawer from "@mui/material/Drawer";
import Dialog from "@mui/material/Dialog";
import TextField from "./TextField";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@/components/CloseIcon";

const schema = z.object({
  channelTitle: z
    .string({ required_error: "요청할 채널명을 입력해주세요." })
    .trim()
    .min(1, { message: "요청할 채널명을 입력해주세요." }),
  email: z.union([
    z.undefined(),
    z.literal(""),
    z.string().email({ message: "이메일 주소를 다시 확인해주세요." }),
  ]),
});

type Schema = z.infer<typeof schema>;

export default function YoutuberAddRequestInterface() {
  const { isOpen, isComplete, completeType } = useAppSelector((state) => ({
    isOpen: state.youtuberAddRequestInterface.isOpen,
    isComplete: state.youtuberAddRequestInterface.isComplete,
    completeType: state.youtuberAddRequestInterface.completeType,
  }));
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      channelTitle: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<Schema> = (data) => {
    if (isSubmitting) {
      return;
    }

    const { channelTitle, email } = data;
    const isEmailExist = z.string().email().safeParse(email).success;

    setDoc(doc(db, "requests", new Date().toISOString()), {
      email: isEmailExist ? email : null,
      channelTitle,
    })
      .then(() => {
        reset();
        if (isEmailExist) {
          dispatch(
            youtuberAddRequestInterfaceSliceActions.complete("WITH_EMAIL")
          );
        } else {
          dispatch(
            youtuberAddRequestInterfaceSliceActions.complete("WITHOUT_EMAIL")
          );
        }
      })
      .catch((reason) => {
        // TODO: firebase에 대한 에러 핸들링
        console.log(reason);
      });
  };

  const handleClose = () => {
    dispatch(youtuberAddRequestInterfaceSliceActions.close());
  };

  const handleAddRequestButtonClick = () => {
    dispatch(youtuberAddRequestInterfaceSliceActions.reset());
  };

  const headerElement = (
    <Box
      component={"header"}
      sx={{
        height: "52px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography sx={{ textAlign: "center", color: grey[700] }}>
        유튜버 추가 요청
      </Typography>
      <CloseIcon
        sx={{
          stroke: grey[700],
          fontSize: "28px",
          position: "absolute",
          right: 12,
          top: 12,
          cursor: "pointer",
        }}
        onClick={handleClose}
      />
    </Box>
  );

  const addElement = (
    <Box>
      <Typography variant="h5" sx={{ mb: "16px", color: grey[900] }}>
        요청시 일주일 이내로 추가돼요!
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: "16px" }}>
        <Image
          src={userCirclePlusImageSrc}
          alt="user circle plus"
          width={100}
          height={100}
        />
      </Box>
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="channelTitle"
          control={control}
          render={({ field, formState }) => {
            const isError = !!formState.errors.channelTitle;

            return (
              <TextField
                {...field}
                size="small"
                variant="outlined"
                helperText="요청할 채널명을 입력해주세요."
                label="채널명"
                required
                sx={{ mb: "8px" }}
                error={isError}
              />
            );
          }}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, formState }) => {
            const isError = !!formState.errors.email;
            const message = formState.errors.email?.message;

            return (
              <TextField
                {...field}
                size="small"
                variant="outlined"
                helperText={
                  isError ? message : "결과를 안내받을 이메일을 입력해주세요."
                }
                label="이메일"
                sx={{ mb: "8px" }}
                error={isError}
              />
            );
          }}
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{ height: "48px", fontSize: "18px", borderRadius: "8px" }}
        >
          요청하기
        </Button>
      </Box>
    </Box>
  );

  const completeElement = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box>
        {completeType === "WITH_EMAIL" ? (
          <Typography variant="h5" sx={{ mb: "8px", color: grey[900] }}>
            추가 요청이 완료되었어요.
            <br />
            결과를 이메일로 알려드릴게요!
          </Typography>
        ) : (
          <Typography variant="h5" sx={{ mb: "8px", color: grey[900] }}>
            추가 요청이 완료되었어요!
          </Typography>
        )}
        <Typography variant="body2" sx={{ color: grey[500] }}>
          요청 심사 중 거절될 수 있어요
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {completeType === "WITH_EMAIL" ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Image src={emailImageSrc} alt="email" width={80} height={80} />
          </Box>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Image src={checkImageSrc} alt="email" width={80} height={80} />
          </Box>
        )}
      </Box>
      <Box sx={{ display: "flex", gap: "12px" }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleAddRequestButtonClick}
          color="buttonSecondary"
          sx={{ height: "48px", fontSize: "18px", borderRadius: "8px" }}
        >
          더 요청하기
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={handleClose}
          sx={{ height: "48px", fontSize: "18px", borderRadius: "8px" }}
        >
          닫기
        </Button>
      </Box>
    </Box>
  );

  if (isMd) {
    return (
      <Dialog
        open={isOpen}
        onClose={handleClose}
        sx={{
          ".MuiDialog-paper": {
            width: "380px",
            maxWidth: "none",
            borderRadius: "16px",
          },
        }}
      >
        {headerElement}
        <Box
          component={"main"}
          sx={
            !isComplete
              ? { p: "12px 24px 24px" }
              : {
                  p: "28px 24px 24px",
                  height: "396px",
                }
          }
        >
          {!isComplete ? addElement : completeElement}
        </Box>
      </Dialog>
    );
  }

  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onClose={handleClose}
      PaperProps={{ sx: { borderRadius: "16px 16px 0 0" } }}
    >
      {headerElement}
      <Box
        component={"main"}
        sx={
          !isComplete
            ? { p: "12px 24px 16px" }
            : {
                p: "28px 24px 16px",
                height: "388px",
              }
        }
      >
        {!isComplete ? addElement : completeElement}
      </Box>
    </Drawer>
  );
}
