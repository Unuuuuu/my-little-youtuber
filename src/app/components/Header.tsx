"use client";

import Box from "@mui/material/Box";
import SearchIcon from "../../components/SearchIcon";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { youtuberAddRequestInterfaceSliceActions } from "@/lib/slices/youtuberAddRequestInterfaceSlice";
import logoWithNameImageSrc from "../../assets/logo-with-name.png";
import Image from "next/image";
import Button from "./Button";
import PlusCircleIcon from "@/components/PlusCircleIcon";
import { grey } from "@/lib/colors";
import TextField from "@mui/material/TextField";
import { searchSliceActions } from "@/lib/slices/searchSlice";
import { useRouter } from "next/navigation";
import { homeTabsSliceActions } from "@/lib/slices/homeTabsSlice";
import Autocomplete from "@mui/material/Autocomplete";
import { useChannelsContext } from "./ChannelsContext";
import filterOptions from "@/lib/filterOptions";
import MenuCloseIcon from "@/components/MenuCloseIcon";
import { UseAutocompleteProps } from "@mui/material/useAutocomplete";
import { useRef } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { BaseSyntheticEvent } from "react";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { channelsSortedByTitle } = useChannelsContext();
  const autocompleteRef = useRef<HTMLDivElement>();
  const { inputValue } = useAppSelector((state) => ({
    inputValue: state.search.inputValue,
  }));

  const handleLogoClick = () => {
    router.push("/");
    dispatch(homeTabsSliceActions.updateValue("home"));
  };

  const handleSearchButtonClick = () => {
    dispatch(searchSliceActions.openDialog());
  };

  const handleYoutuberAddRequestButtonClick = () => {
    dispatch(youtuberAddRequestInterfaceSliceActions.open());
  };

  const handleAutocompleteChange: UseAutocompleteProps<
    ChannelDataWithTotalPlayCount,
    false,
    false,
    false
  >["onInputChange"] = (_, newInputValue, reason) => {
    if (reason === "input") {
      dispatch(searchSliceActions.updateInputValue(newInputValue));
    }
  };

  const handleAutocompleteSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    if (inputValue === "") {
      return;
    }

    autocompleteRef.current?.querySelector("input")?.blur();
    dispatch(searchSliceActions.submit());
    dispatch(homeTabsSliceActions.updateValue("search"));
  };

  const handleAutocompleteValueChange: UseAutocompleteProps<
    ChannelDataWithTotalPlayCount,
    false,
    false,
    false
  >["onChange"] = (_, __, ___, details) => {
    router.push(`/channel/${details?.option.id}`);
    dispatch(searchSliceActions.updateInputValue(""));
  };

  const handleClearButtonClick = () => {
    dispatch(searchSliceActions.updateInputValue(""));
  };

  return (
    <Box
      component={"header"}
      sx={{
        height: {
          sm: 56,
          md: 96,
        },
        position: "sticky",
        top: 0,
        bgcolor: "white",
        borderBottom: `1px solid`,
        borderColor: "divider",
        display: "flex",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: {
            sm: "0 12px 0 24px",
            md: "0 24px 0",
          },
          maxWidth: "1144px",
          margin: {
            sm: "0",
            md: "0 auto",
          },
          gap: {
            sm: 0,
            md: "24px",
          },
        }}
      >
        <Image
          src={logoWithNameImageSrc}
          alt="logo with name"
          width={170}
          height={28}
          style={{ cursor: "pointer" }}
          onClick={handleLogoClick}
        />
        {/* TODO TextField, Button */}
        <Box
          component={"form"}
          onSubmit={handleAutocompleteSubmit}
          sx={{
            display: { sm: "none", md: "block" },
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <Autocomplete
            forcePopupIcon={false}
            ref={autocompleteRef}
            clearOnBlur={false}
            fullWidth
            options={channelsSortedByTitle}
            filterOptions={filterOptions}
            getOptionLabel={(option: ChannelDataWithTotalPlayCount) =>
              option.title
            }
            inputValue={inputValue}
            onInputChange={handleAutocompleteChange}
            size="small"
            onChange={handleAutocompleteValueChange}
            clearIcon={
              <MenuCloseIcon sx={{ fontSize: "24px", fill: grey[500] }} />
            }
            noOptionsText="해당하는 유튜버가 없습니다."
            renderInput={(params) => (
              <TextField
                placeholder="검색어를 입력해주세요"
                {...params}
                InputProps={{
                  ...params.InputProps,
                  sx: {
                    height: "48px",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderWidth: "2px",
                      borderColor: "primary.main",
                      borderRadius: "8px",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.main",
                    },
                    ".MuiOutlinedInput-input::-webkit-input-placeholder": {
                      opacity: 1,
                      color: grey[500],
                    },
                  },
                  endAdornment: (
                    <InputAdornment position="end" sx={{ gap: "12px" }}>
                      {inputValue !== "" && (
                        <MenuCloseIcon
                          sx={{
                            fontSize: "24px",
                            fill: grey[500],
                            cursor: "pointer",
                          }}
                          onClick={handleClearButtonClick}
                        />
                      )}
                      <SearchIcon
                        sx={{
                          fontSize: "24px",
                          stroke: "#9254DE", // SearchIcon에서 sx를 spread하고 있어서 함수를 사용할 수 없었고, 그래서 하드 코딩으로 값을 입력함.
                          cursor: "pointer",
                        }}
                        onClick={handleAutocompleteSubmit}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Box>
        <ButtonBase
          sx={{
            display: { sm: "none", md: "inline-flex" },
            flexShrink: 0,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "8px",
            p: "7px 13px 7px 9px",
          }}
          onClick={handleYoutuberAddRequestButtonClick}
        >
          <PlusCircleIcon sx={{ fontSize: "32px", stroke: grey[700] }} />
          <Typography
            component={"span"}
            noWrap
            variant="subtitle2"
            sx={{ color: grey[700] }}
          >
            유튜버 추가 요청
          </Typography>
        </ButtonBase>
        <Box
          sx={{
            display: {
              sm: "flex",
              md: "none",
            },
          }}
        >
          <Box
            sx={{
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={handleSearchButtonClick}
          >
            <SearchIcon
              sx={{
                fontSize: "32px",
                stroke: grey[700],
              }}
            />
          </Box>
          <Box
            sx={{
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={handleYoutuberAddRequestButtonClick}
          >
            <PlusCircleIcon
              sx={{
                fontSize: "32px",
                stroke: grey[700],
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
