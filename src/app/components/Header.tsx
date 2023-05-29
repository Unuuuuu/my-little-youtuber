"use client";

import Box from "@mui/material/Box";
import SearchIcon from "../../components/SearchIcon";
import { useAppDispatch } from "@/lib/hooks";
import { youtuberAddRequestSliceActions } from "@/lib/slices/youtuberAddRequestSlice";
import logoWithNameImageSrc from "../../assets/logo-with-name.png";
import Image from "next/image";
import Button from "./Button";
import PlusCircleIcon from "@/components/PlusCircleIcon";
import { grey } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
// import { searchSliceActions } from "@/lib/slices/searchSlice";
import { useRouter } from "next/navigation";
import { homeTabsSliceActions } from "@/lib/slices/homeTabsSlice";

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
    dispatch(homeTabsSliceActions.updateValue("home"));
  };

  // const handleSearchButtonClick = () => {
  //   dispatch(searchSliceActions.openDialog());
  // };

  const handleCirclePlusButtonClick = () => {
    dispatch(youtuberAddRequestSliceActions.open());
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
        <TextField
          placeholder="검색어를 입력해주세요"
          fullWidth
          sx={{
            display: { sm: "none", md: "inline-flex" },
            maxWidth: "600px",
          }}
          InputProps={{
            sx: {
              height: "48px",
            },
          }}
        />
        <Button
          variant="outlined"
          color="buttonSecondary"
          startIcon={<PlusCircleIcon sx={{ stroke: grey[700] }} />}
          sx={{
            display: { sm: "none", md: "inline-flex" },
            flexShrink: 0,
            height: "48px",
          }}
          onClick={handleCirclePlusButtonClick}
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
            // onClick={handleSearchButtonClick}
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
            onClick={handleCirclePlusButtonClick}
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
