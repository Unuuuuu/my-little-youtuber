"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { grey } from "@/lib/colors";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Drawer from "@mui/material/Drawer";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@/components/CloseIcon";
import TextField from "@/app/components/TextField";
import Button from "@/app/components/Button";
import { gameModeInterfaceSliceActions } from "@/lib/slices/gameModeInterfaceSlice";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useRef, useState } from "react";
import GameModeTabPanel from "./GameModeTabPanel";
import HourglassHighDisableIcon from "@/components/HourglassHighDisableIcon";
import HourglassHighIcon from "@/components/HourglassHighIcon";
import YoutubeLogoIcon from "@/components/YoutubeLogoIcon";
import YoutubeLogoDisableIcon from "@/components/YoutubeLogoDisableIcon";
import LiveCircleIcon from "@/components/LiveCircleIcon";
import FireIcon from "@/components/FireIcon";
import getRandomNickname from "@/lib/getRandomNickname";
import { useChannelContext } from "./ChannelContext";
import Link from "next/link";
import { gameSliceActions } from "@/lib/slices/gameSlice";
import { useRouter } from "next/navigation";

const schema = z.object({
  nickname: z.union([
    z.literal(""),
    z
      .string()
      .trim()
      .min(1, { message: "닉네임을 입력해주세요." })
      .max(9, { message: "9자 이내로 입력해주세요." }),
  ]),
});

type Schema = z.infer<typeof schema>;

export default function GameModeInterface() {
  const { isOpen, gameMode } = useAppSelector((state) => ({
    isOpen: state.gameModeInterface.isOpen,
    gameMode: state.game.gameMode,
  }));
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const randomNicknameRef = useRef(getRandomNickname());
  const {
    channel: { id },
  } = useChannelContext();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      nickname: "",
    },
  });

  useEffect(() => {
    return () => {
      dispatch(gameModeInterfaceSliceActions.close());
    };
  }, [dispatch]);

  const onSubmit: SubmitHandler<Schema> = (data) => {
    if (isSubmitting) {
      return;
    }

    let nickname: string;
    if (data.nickname === "") {
      nickname = randomNicknameRef.current;
    } else {
      nickname = data.nickname;
    }

    router.push(`/channel/${id}/game`);
    dispatch(gameSliceActions.setNickname(nickname));
  };

  const handleClose = () => {
    dispatch(gameModeInterfaceSliceActions.close());
  };

  const handleTabsChange: TabsProps["onChange"] = (_, newValue: GameMode) => {
    dispatch(gameSliceActions.updateGameMode(newValue));
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
        게임 선택
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

  const bodyElement = (
    <>
      <Box sx={{ mb: "24px" }}>
        <Box sx={{ position: "relative" }}>
          <Tabs
            value={gameMode}
            onChange={handleTabsChange}
            variant="fullWidth"
            sx={{
              ".MuiTab-root": {
                fontSize: "18px",
                lineHeight: "22px",
                "&:not(.Mui-selected)": {
                  color: grey[500],
                },
              },
              ".MuiButtonBase-root.Mui-selected": {
                color: grey[900],
                fontWeight: 700,
              },
              ".MuiTabs-scroller": {
                zIndex: 1,
              },
              ".MuiTabs-indicator": {
                height: "3px",
              },
            }}
          >
            <Tab value="GENERAL" label="일반" />
            <Tab value="TIME_ATTACK" label="타임어택" />
          </Tabs>
          <Box
            sx={{
              width: "100%",
              height: "1px",
              bgcolor: "divider",
              position: "absolute",
              bottom: 0,
            }}
          />
        </Box>
        <GameModeTabPanel value="GENERAL" selectedValue={gameMode}>
          <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <HourglassHighDisableIcon sx={{ fontSize: "32px" }} />
            <Typography variant="body1">제한시간이 없어요</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <YoutubeLogoIcon sx={{ fontSize: "32px" }} />
            <Typography variant="body1">동영상을 볼 수 있어요</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <LiveCircleIcon sx={{ fontSize: "32px" }} />
            <Typography variant="body1">스트리밍 컨텐츠로 추천해요</Typography>
          </Box>
        </GameModeTabPanel>
        <GameModeTabPanel value="TIME_ATTACK" selectedValue={gameMode}>
          <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <HourglassHighIcon sx={{ fontSize: "32px" }} />
            <Typography variant="body1">10초의 제한시간이 있어요</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <YoutubeLogoDisableIcon sx={{ fontSize: "32px" }} />
            <Typography variant="body1">동영상을 볼 수 없어요</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <FireIcon sx={{ fontSize: "32px" }} />
            <Typography variant="body1">
              치열한 경쟁을 원한다면 추천해요
            </Typography>
          </Box>
        </GameModeTabPanel>
      </Box>
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography variant="subtitle1" sx={{ color: grey[700], mb: "12px" }}>
          닉네임을 입력해 볼까요?
        </Typography>
        <Controller
          name="nickname"
          control={control}
          render={({ field, formState }) => {
            const isError = !!formState.errors.nickname;
            const message = formState.errors.nickname?.message;

            return (
              <TextField
                {...field}
                placeholder={randomNicknameRef.current}
                size="small"
                variant="outlined"
                helperText={isError ? message : " "}
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
          시작하기
        </Button>
      </Box>
    </>
  );

  if (isMd) {
    return (
      <Dialog
        open={isOpen}
        onClose={handleClose}
        sx={{
          ".MuiDialog-paper": {
            width: "390px",
            maxWidth: "none",
            borderRadius: "16px",
          },
        }}
      >
        {headerElement}
        <Box component={"main"} sx={{ p: "0 24px 24px" }}>
          {bodyElement}
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
      <Box component={"main"} sx={{ p: "0 24px 16px" }}>
        {bodyElement}
      </Box>
    </Drawer>
  );
}
