"use client";

import Box from "@mui/material/Box";
import TabPanel, { Props as TabPanelProps } from "./TabPanel";
import { useChannelsContext } from "./ChannelsContext";
import { useTagsContext } from "./TagsContext";
import Typography from "@mui/material/Typography";
import { grey } from "@/lib/colors";
import CaretRightIcon from "../../components/CaretRightIcon";
import ChannelList from "./ChannelList";
import { useMemo } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { homeTabsSliceActions } from "@/lib/slices/homeTabsSlice";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Banner from "./Banner";
import HomeDisplayAd from "./HomeDisplayAd";
import Carousel, { CarouselProps } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import ButtonBase from "@mui/material/ButtonBase";
import CaretLeftIcon from "@/components/CaretLeftIcon";
import Link from "next/link";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 768 },
    items: 5,
    slidesToSlide: 5, // optional, default to 1.
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
};

// function CustomRightArrow() {
//   return (
//     <Box
//       sx={{
//         position: "absolute",
//         right: "-25px",
//         cursor: "pointer",
//         border: `1px solid ${grey[400]}`,
//         borderRadius: "50%",
//         width: "50px",
//         height: "50px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <CaretRightIcon sx={{ stroke: grey[600] }} />
//     </Box>
//   );
// }

const CustomRightArrow = (props: any) => {
  const { onClick } = props;
  return (
    <ButtonBase
      sx={{
        position: "absolute",
        top: {
          sm: "calc(((100% - 56px) / 2) - 18px)",
          md: "calc(((100% - 56px) / 2) - 24px)",
        },
        right: "0",
        cursor: "pointer",
        border: `1px solid ${grey[400]}`,
        borderRadius: "50%",
        width: { sm: "36px", md: "48px" },
        height: { sm: "36px", md: "48px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "white",
      }}
      onClick={onClick}
    >
      <CaretRightIcon
        sx={{
          stroke: grey[600],
          fontSize: {
            sm: "16px",
            md: "24px",
          },
        }}
      />
    </ButtonBase>
  );
};

const CustomLeftArrow = (props: any) => {
  const { onClick } = props;
  return (
    <ButtonBase
      sx={{
        position: "absolute",
        top: {
          sm: "calc(((100% - 56px) / 2) - 18px)",
          md: "calc(((100% - 56px) / 2) - 24px)",
        },
        left: "0",
        cursor: "pointer",
        border: `1px solid ${grey[400]}`,
        borderRadius: "50%",
        width: { sm: "36px", md: "48px" },
        height: { sm: "36px", md: "48px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "white",
      }}
      onClick={onClick}
    >
      <CaretLeftIcon
        sx={{
          stroke: grey[600],
          fontSize: {
            sm: "16px",
            md: "24px",
          },
        }}
      />
    </ButtonBase>
  );
};

interface Props extends Omit<TabPanelProps, "children"> {}

export default function HomeTabPanel(props: Props) {
  const { selectedValue, value } = props;
  const { generalTags } = useTagsContext();
  const { channelsSortedByPlayCount } = useChannelsContext();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  const handleTagTitleClick = (tagId: string) => {
    dispatch(homeTabsSliceActions.updateValue(tagId));
  };

  const generalTagsWithChannels = useMemo(() => {
    return generalTags.map((tag) => ({
      ...tag,
      channels: channelsSortedByPlayCount
        .filter((channel) => tag.channelIds.includes(channel.id))
        .slice(0, isLg ? 12 : isMd ? 8 : 4),
    }));
  }, [channelsSortedByPlayCount, generalTags, isLg, isMd]);

  return (
    <>
      {value === selectedValue && <Banner />}
      <TabPanel value={value} selectedValue={selectedValue}>
        <HomeDisplayAd />
        <Box
          sx={{
            px: "24px",
            py: "40px",
            display: "flex",
            flexDirection: "column",
            gap: "40px",
          }}
        >
          <Box>
            <Box
              sx={{
                display: {
                  sm: "flex",
                  md: "inline-flex",
                },
                justifyContent: "space-between",
                alignItems: "flex-end",
                mb: "24px",
                cursor: "pointer",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Typography sx={{ typography: { sm: "h2", md: "h1" } }}>
                  인기 TOP 10 유튜버
                </Typography>
              </Box>
            </Box>
            <Carousel
              responsive={responsive}
              infinite={true}
              containerClass="carousel-container"
              customRightArrow={<CustomRightArrow />}
              customLeftArrow={<CustomLeftArrow />}
            >
              {channelsSortedByPlayCount.slice(0, 10).map((value) => (
                <Box
                  key={value.id}
                  sx={{ mx: "8px", display: "block" }}
                  component={Link}
                  href={`/channel/${value.id}`}
                >
                  <Box
                    sx={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "16px",
                      mb: "12px",
                    }}
                  >
                    <Box
                      sx={{
                        zIndex: 1,
                        position: "absolute",
                        top: 0,
                        width: "100%",
                        py: "8px",
                        background:
                          "linear-gradient(180deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.5625) 100%)",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ textAlign: "center", color: grey[400] }}
                      >
                        {value.formattedTotalPlayCount}회 플레이
                      </Typography>
                    </Box>
                    <Image
                      src={value.thumbnail.blurDataURL}
                      blurDataURL={value.thumbnail.blurDataURL}
                      placeholder="blur"
                      alt="thumbnail"
                      fill
                      style={{
                        filter: "blur(17.5px)",
                      }}
                    />
                    <Box
                      sx={{
                        m: "16px",
                        position: "relative",
                        width: "calc(100% - 32px)",
                        height: "calc(100% - 32px)",
                      }}
                    >
                      <Image
                        src={value.thumbnail.url}
                        blurDataURL={value.thumbnail.blurDataURL}
                        placeholder="blur"
                        alt="thumbnail"
                        fill
                        style={{
                          borderRadius: "50%",
                        }}
                      />
                    </Box>
                  </Box>
                  <Typography variant="body1" sx={{ mb: "8px" }}>
                    {value.title}
                  </Typography>
                  <Box
                    component={"ul"}
                    sx={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "flex-start",
                    }}
                  >
                    {value.tags
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
                  </Box>
                </Box>
              ))}
            </Carousel>
          </Box>
          {generalTagsWithChannels.map((tag) => (
            <Box key={tag.id}>
              <Box
                sx={{
                  display: {
                    sm: "flex",
                    md: "inline-flex",
                  },
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  mb: "10px",
                  cursor: "pointer",
                }}
                onClick={() => handleTagTitleClick(tag.id)}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Typography sx={{ typography: { sm: "h2", md: "h1" } }}>
                    {tag.label} 유튜버
                  </Typography>
                  <CaretRightIcon
                    sx={{ fontSize: "24px", stroke: grey[900] }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: grey[500],
                    mb: "2px",
                    display: { sm: "block", md: "none" },
                  }}
                >
                  더보기
                </Typography>
              </Box>
              <ChannelList tag={tag} channels={tag.channels} />
            </Box>
          ))}
        </Box>
      </TabPanel>
    </>
  );
}
