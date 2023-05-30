"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { searchSliceActions } from "@/lib/slices/searchSlice";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import InputAdornment from "@mui/material/InputAdornment";
import { useCallback, useMemo } from "react";
import filterOptions from "@/lib/filterOptions";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import TextField from "./TextField";
import { TextFieldProps } from "@mui/material/TextField";
import CaretLeftIcon from "@/components/CaretLeftIcon";
import MenuCloseIcon from "@/components/MenuCloseIcon";
import { useChannelsContext } from "./ChannelsContext";
import ChannelList from "./ChannelList";
import SearchIcon from "@/components/SearchIcon";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function SearchFullScreenDialog() {
  const { isOpen, inputValue } = useAppSelector((state) => ({
    isOpen: state.search.isDialogOpen,
    inputValue: state.search.inputValue,
  }));
  const dispatch = useAppDispatch();
  const { channels } = useChannelsContext();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  const handleTextFieldChange: TextFieldProps["onChange"] = (event) => {
    dispatch(searchSliceActions.updateInputValue(event.target.value));
  };

  const handleBackButtonClick = () => {
    dispatch(searchSliceActions.closeDialog());
  };

  const filteredChannels = useMemo(
    () =>
      filterOptions(channels, {
        inputValue,
        getOptionLabel: (option) => option.title,
      }),
    [channels, inputValue]
  );

  const handleClearButtonClick = () => {
    dispatch(searchSliceActions.updateInputValue(""));
  };

  const handleItemClick = useCallback(() => {
    dispatch(searchSliceActions.closeDialog());
    dispatch(searchSliceActions.updateInputValue(""));
  }, [dispatch]);

  if (isMd) {
    return null;
  }

  return (
    <Dialog open={isOpen} fullScreen>
      <Box
        component={"header"}
        sx={{
          p: "0px 24px 0px 16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <CaretLeftIcon
          sx={{ fontSize: "32px", stroke: grey[700], cursor: "pointer" }}
          onClick={handleBackButtonClick}
        />
        <TextField
          variant="outlined"
          size="medium"
          autoFocus
          placeholder="검색어를 입력해주세요."
          value={inputValue}
          onChange={handleTextFieldChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ gap: "12px" }}>
                {inputValue !== "" && (
                  <MenuCloseIcon
                    sx={{ fill: grey[500], cursor: "pointer" }}
                    onClick={handleClearButtonClick}
                  />
                )}
                <SearchIcon
                  sx={{
                    fontSize: "24px",
                    stroke: "#9254DE", // SearchIcon에서 sx를 spread하고 있어서 함수를 사용할 수 없었고, 그래서 하드 코딩으로 값을 입력함.
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Typography
        variant="detail2"
        sx={{ color: grey[700], p: "24px 24px 4px" }}
      >
        바로가기
      </Typography>
      <Box component={"ul"} sx={{ p: "0 24px" }}>
        <ChannelList
          channels={filteredChannels}
          onItemClick={handleItemClick}
        />
      </Box>
    </Dialog>
  );
}
