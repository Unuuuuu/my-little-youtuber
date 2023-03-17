"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { store } from "@/lib/store";
import { Provider as ReduxProvider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

export default function Provider(props: Props) {
  const { children } = props;

  return (
    <>
      <CssBaseline />
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </>
  );
}
