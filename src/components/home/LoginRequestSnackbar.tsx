import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginRequestSnackbarActions } from "@/redux/slices/loginRequestSnackbarSlice";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";

const LoginRequestSnackbar = () => {
  const { isOpen } = useAppSelector((state) => state.loginRequestSnackbar);
  const dispatch = useAppDispatch();

  const handleSnackbarClose = (
    _: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(loginRequestSnackbarActions.close());
  };

  return (
    <Snackbar
      open={isOpen}
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
};

export default LoginRequestSnackbar;
