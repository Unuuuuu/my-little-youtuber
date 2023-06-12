import Box from "@mui/material/Box";
import { useEffect, useMemo } from "react";
import TabPanel, { Props as TabPanelProps } from "./TabPanel";
import { useChannelsContext } from "./ChannelsContext";
import Typography from "@mui/material/Typography";
import ChannelList from "./ChannelList";
import filterOptions from "@/lib/filterOptions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { grey } from "@mui/material/colors";
import { gmarketSans } from "@/lib/fonts";
import Image from "next/image";
import userCirclePlusImageSrc from "../../assets/user-circle-plus-2.png";
import Button from "./Button";
import PlusCircleIcon from "@/components/PlusCircleIcon";
import { youtuberAddRequestInterfaceSliceActions } from "@/lib/slices/youtuberAddRequestInterfaceSlice";
import { searchSliceActions } from "@/lib/slices/searchSlice";
import HomeDisplayAd from "./HomeDisplayAd";

interface Props extends Omit<TabPanelProps, "children"> {}

export default function SearchTabPanel(props: Props) {
  const { selectedValue, value } = props;
  const { query } = useAppSelector((state) => ({
    query: state.search.query,
  }));
  const { channelsSortedByTitle } = useChannelsContext();
  const dispatch = useAppDispatch();

  const filteredChannels = useMemo(() => {
    if (query === null) {
      return [];
    }

    return filterOptions(channelsSortedByTitle, {
      inputValue: query,
      getOptionLabel: (option) => option.title,
    });
  }, [channelsSortedByTitle, query]);

  const handleYoutuberAddRequestButtonClick = () => {
    dispatch(youtuberAddRequestInterfaceSliceActions.open());
  };

  useEffect(() => {
    return () => {
      if (selectedValue === value) {
        dispatch(searchSliceActions.updateInputValue(""));
      }
    };
  }, [dispatch, selectedValue, value]);

  return (
    <TabPanel value={value} selectedValue={selectedValue}>
      <HomeDisplayAd />
      <Box sx={{ px: "24px", py: "40px" }}>
        <Box>
          <Box
            sx={{
              mb: "10px",
              display: "flex",
              gap: "8px",
            }}
          >
            <Typography
              component={"span"}
              sx={{
                fontSize: { sm: "22px", md: "24px" },
                lineHeight: { sm: "26px", md: "28px" },
                fontWeight: 500,
                color: grey[800],
                fontFamily: gmarketSans.style.fontFamily,
              }}
            >
              {query}
            </Typography>
            <Typography
              component={"span"}
              sx={{
                fontSize: { sm: "22px", md: "24px" },
                lineHeight: { sm: "26px", md: "28px" },
                fontWeight: 500,
                color: grey[500],
                fontFamily: gmarketSans.style.fontFamily,
              }}
            >
              에 대한 검색결과
            </Typography>
          </Box>
          {filteredChannels.length !== 0 ? (
            <ChannelList channels={filteredChannels} />
          ) : (
            <Box
              sx={{
                pt: "110px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={userCirclePlusImageSrc}
                alt="user circle plus"
                width={150}
                height={150}
                style={{ marginBottom: "8px" }}
              />
              <Typography variant="h4" sx={{ color: grey[500], mb: "16px" }}>
                검색된 유튜버가 없습니다.
              </Typography>
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
            </Box>
          )}
        </Box>
      </Box>
    </TabPanel>
  );
}
