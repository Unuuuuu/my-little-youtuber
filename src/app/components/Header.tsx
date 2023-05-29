"use client";

import Box from "@mui/material/Box";
import Link from "next/link";
import MagnifyingGlassIcon from "./MagnifyingGlassIcon";
import { useAppDispatch } from "@/lib/hooks";
import { youtuberAddRequestSliceActions } from "@/lib/slices/youtuberAddRequestSlice";
import logoWithNameImageSrc from "../../assets/logo-with-name.png";
import Image from "next/image";
import Button from "./Button";
import PlusCircleIcon from "@/components/PlusCircleIcon";
import { grey } from "@mui/material/colors";
import TextField from "@mui/material/TextField";

export default function Header() {
  const dispatch = useAppDispatch();
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
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: {
          sm: "0 12px 0 24px",
          md: "40px 24px 23px",
        },
        position: "sticky",
        top: 0,
        bgcolor: "white",
        borderBottom: `1px solid`,
        borderColor: "divider",
        gap: {
          sm: 0,
          md: "24px",
        },
      }}
    >
      <Box
        component={Link}
        href={"/"}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <Image
          src={logoWithNameImageSrc}
          alt="logo with name"
          width={170}
          height={28}
        />
      </Box>
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
        startIcon={<PlusCircleIcon />}
        sx={{
          display: { sm: "none", md: "inline-flex" },
          flexShrink: 0,
          height: "48px",
        }}
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
        >
          <MagnifyingGlassIcon
            sx={{
              color: "white",
              fontSize: "28px",
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
          {/* <CirclePlusIcon
            sx={{
              color: "white",
              fontSize: "28px",
            }}
          /> */}
        </Box>
      </Box>
    </Box>
  );
}
