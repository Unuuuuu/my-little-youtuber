"use client";

import { useAppDispatch } from "@/lib/hooks";
import { breakpointSliceActions } from "@/lib/slices/breakpointSlice";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";

export default function Initialize() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("mobile"));
  const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));

  useEffect(() => {
    dispatch(
      breakpointSliceActions.update({ breakpoint: "mobile", value: isMobile })
    );
    dispatch(
      breakpointSliceActions.update({ breakpoint: "tablet", value: isTablet })
    );
    dispatch(
      breakpointSliceActions.update({ breakpoint: "desktop", value: isDesktop })
    );
  }, [dispatch, isDesktop, isTablet, isMobile]);

  return null;
}
