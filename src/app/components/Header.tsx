"use client";

import Box from "@mui/material/Box";
import Link from "next/link";
import MagnifyingGlassIcon from "./MagnifyingGlassIcon";
import CirclePlusIcon from "./CirclePlusIcon";
import { useAppDispatch } from "@/lib/hooks";
import { youtuberAddRequestSliceActions } from "@/lib/slices/youtuberAddRequestSlice";
import logoWithNameImageSrc from "../../assets/logo-with-name.png";
import Image from "next/image";

export default function Header() {
  const dispatch = useAppDispatch();
  const handleCirclePlusButtonClick = () => {
    dispatch(youtuberAddRequestSliceActions.open());
  };

  return (
    <Box
      component={"header"}
      sx={{
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: "0 12px 0 24px",
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
      <Box sx={{ display: "flex" }}>
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
          <CirclePlusIcon
            sx={{
              color: "white",
              fontSize: "28px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
