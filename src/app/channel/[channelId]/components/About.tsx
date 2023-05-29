"use client";

import Image from "next/image";
import { useChannelContext } from "./ChannelContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { homeTabsSliceActions } from "@/lib/slices/homeTabsSlice";

export default function About() {
  const { channel } = useChannelContext();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleTagClick = (tagId: string) => {
    router.push("/");
    dispatch(homeTabsSliceActions.updateValue(tagId));
  };

  return (
    <Box
      sx={{
        p: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "secondary.main",
          borderRadius: "8px",
          p: "12px 22.5px",
          mb: "28px",
          position: "relative",

          "&::after": {
            content: "''",
            position: "absolute",
            left: "50%",
            bottom: -6,
            transform: "translateX(-50%) rotate(45deg)",
            width: "12px",
            height: "12px",
            bgcolor: "secondary.main",
            borderBottomRightRadius: "2px",
          },
        }}
      >
        <Typography variant="subtitle1" sx={{ color: "primary.main" }}>
          {channel.playCount.general + channel.playCount.timeAttack}회 플레이
          됐어요!
        </Typography>
      </Box>
      <Image
        src={channel.thumbnail.url}
        alt="channel thumbnail"
        placeholder="blur"
        blurDataURL={channel.thumbnail.blurDataURL}
        width={158}
        height={158}
        style={{ borderRadius: "50%", marginBottom: "12px" }}
      />
      <Box sx={{ overflow: "hidden", width: "100%", mb: "12px" }}>
        <Typography
          noWrap
          variant="h2"
          sx={{ fontWeight: 700, textAlign: "center" }}
        >
          {channel.title}
        </Typography>
      </Box>
      <Box
        component={"ul"}
        sx={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          justifyContent: "center",
          mb: "24px",
        }}
      >
        {channel.tags.map((tag) => (
          <Box
            key={tag.id}
            component={"li"}
            sx={{
              p: "4px 12px",
              bgcolor: grey[100],
              borderRadius: "12px",
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={() => handleTagClick(tag.id)}
          >
            <Typography variant="body2" sx={{ color: grey[700] }}>
              #{tag.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
