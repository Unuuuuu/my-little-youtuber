"use client";

import Box from "@mui/material/Box";
import SearchIcon from "../../components/SearchIcon";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { youtuberAddRequestSliceActions } from "@/lib/slices/youtuberAddRequestSlice";
import logoWithNameImageSrc from "../../assets/logo-with-name.png";
import Image from "next/image";
import Button from "./Button";
import PlusCircleIcon from "@/components/PlusCircleIcon";
import { grey } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import { searchSliceActions } from "@/lib/slices/searchSlice";
import { useRouter } from "next/navigation";
import { homeTabsSliceActions } from "@/lib/slices/homeTabsSlice";
import Autocomplete from "@mui/material/Autocomplete";
import { useChannelsContext } from "./ChannelsContext";
import filterOptions from "@/lib/filterOptions";
import MenuCloseIcon from "@/components/MenuCloseIcon";
import { UseAutocompleteProps } from "@mui/material/useAutocomplete";
import { FormEventHandler, useRef } from "react";

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { channels } = useChannelsContext();
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
    dispatch(youtuberAddRequestSliceActions.open());
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

  const handleAutocompleteSubmit: FormEventHandler<HTMLFormElement> = (
    event
  ) => {
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

  return (
    <Box
      component={"header"}
      sx={{
        height: {
          sm: 48,
          md: 112,
        },
        position: "sticky",
        top: 0,
        bgcolor: "white",
        borderBottom: `1px solid`,
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: {
            sm: "0 12px 0 24px",
            md: "40px 24px 23px",
          },
          maxWidth: "1144px",
          margin: "0 auto",
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
            ref={autocompleteRef}
            clearOnBlur={false}
            fullWidth
            options={channels}
            filterOptions={filterOptions}
            getOptionLabel={(option: ChannelDataWithTotalPlayCount) =>
              option.title
            }
            inputValue={inputValue}
            onInputChange={handleAutocompleteChange}
            size="small"
            sx={{
              ".MuiAutocomplete-popupIndicatorOpen": {
                transform: "none",
              },
            }}
            onChange={handleAutocompleteValueChange}
            clearIcon={
              <MenuCloseIcon sx={{ fontSize: "24px", fill: grey[500] }} />
            }
            noOptionsText="해당하는 유튜버가 없습니다."
            popupIcon={
              <SearchIcon
                sx={{
                  fontSize: "24px",
                  stroke: "#9254DE", // SearchIcon에서 sx를 spread하고 있어서 함수를 사용할 수 없었고, 그래서 하드 코딩으로 값을 입력함.
                }}
              />
            }
            renderInput={(params) => (
              <TextField
                placeholder="검색어를 입력해주세요"
                {...params}
                InputProps={{
                  ...params.InputProps,
                  sx: {
                    height: "48px",
                  },
                }}
              />
            )}
          />
        </Box>
        <Button
          variant="outlined"
          color="buttonSecondary"
          startIcon={<PlusCircleIcon sx={{ stroke: grey[700] }} />}
          sx={{
            display: { sm: "none", md: "inline-flex" },
            flexShrink: 0,
            height: "48px",
          }}
          onClick={handleYoutuberAddRequestButtonClick}
        >
          유튜버 추가 요청
        </Button>
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
