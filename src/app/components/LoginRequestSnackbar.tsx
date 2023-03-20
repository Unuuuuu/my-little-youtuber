"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { snackbarSliceActions } from "@/lib/slices/snackbarSlice";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";

export default function LoginRequestSnackbar() {
  const isLoginRequestSnackbarOpen = useAppSelector(
    (state) => state.snackbar.isLoginRequestSnackbarOpen
  );
  const dispatch = useAppDispatch();

  const handleSnackbarClose = (
    _: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(snackbarSliceActions.closeLoginRequestSnackbar());
  };

  return (
    <Snackbar
      open={isLoginRequestSnackbarOpen}
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
  );
}
