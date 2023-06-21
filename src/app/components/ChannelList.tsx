"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { grey } from "@/lib/colors";
import Image from "next/image";
import Link from "next/link";
import { useTagsContext } from "./TagsContext";
import { useCallback } from "react";

interface Props {
  tag?: TagData;
  channels: ChannelDataWithTotalPlayCount[];
  onItemClick?: () => void;
}

export default function ChannelList(props: Props) {
  const { tag, channels, onItemClick } = props;
  const { generalTags } = useTagsContext();

  const getChannelListItem = useCallback(
    ({
      generalTags,
      targetTag,
      channel,
    }: {
      generalTags: GeneralTagData[];
      targetTag?: TagData;
      channel: ChannelDataWithTotalPlayCount;
    }) => {
      if (targetTag && targetTag.type !== "GENERAL") {
        const foundGeneralTag = generalTags.find(
          (generalTag) =>
            generalTag.id ===
            (targetTag as DetailTagData | GroupTagData).generalTagId
        )!;
        targetTag = foundGeneralTag;
      }

      const handleItemClick = () => {
        onItemClick?.();
      };

      return (
        <Grid item sm={12} md={6} lg={4} key={channel.id}>
          <Box
            component={Link}
            href={`/channel/${channel.id}`}
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "14px 0 9px",
              borderBottom: `1px solid`,
              borderColor: "divider",
            }}
            onClick={handleItemClick}
          >
            <Image
              src={channel.thumbnail.url}
              alt="channel thumbnail"
              placeholder="blur"
              blurDataURL={channel.thumbnail.blurDataURL}
              width={50}
              height={50}
              style={{ borderRadius: "50%" }}
            />
            <Box sx={{ overflow: "hidden" }}>
              <Typography noWrap sx={{ color: grey[900], mb: "8px" }}>
                {channel.title}
              </Typography>
              <Box
                component={"ul"}
                sx={{ display: "flex", gap: "8px", alignItems: "flex-start" }}
              >
                {targetTag && (
                  <Typography
                    component={"li"}
                    variant="body2"
                    sx={{ color: grey[500] }}
                  >
                    #{targetTag.label}
                  </Typography>
                )}
                {targetTag
                  ? channel.tags
                      .filter(
                        (tag) =>
                          tag.type !== "GENERAL" &&
                          tag.generalTagId === targetTag!.id
                      )
                      .map((tag) => (
                        <Typography
                          key={tag.id}
                          component={"li"}
                          variant="body2"
                          sx={{ color: grey[500] }}
                        >
                          #{tag.label}
                        </Typography>
                      ))
                  : channel.tags
                      .filter((tag) => tag.type === "GENERAL")
                      .map((tag) => (
                        <Typography
                          key={tag.id}
                          component={"li"}
                          variant="body2"
                          sx={{ color: grey[500] }}
                        >
                          #{tag.label}
                        </Typography>
                      ))}
                {(targetTag || channel.tags.length !== 0) && (
                  <Typography
                    component={"li"}
                    variant="body2"
                    sx={{ color: grey[500], fontWeight: 900 }}
                  >
                    ·
                  </Typography>
                )}
                <Typography
                  component={"li"}
                  variant="body2"
                  sx={{ color: grey[500] }}
                >
                  {channel.formattedTotalPlayCount}회
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      );
    },
    [onItemClick]
  );

  return (
    <Grid container columnSpacing={"20px"}>
      {channels.map((channel) =>
        getChannelListItem({ generalTags, targetTag: tag, channel })
      )}
    </Grid>
  );
}
