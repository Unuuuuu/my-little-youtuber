import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { grey, pink } from "@mui/material/colors";
import { ChannelDataWithoutVideos } from "@/types";
import Typography from "@mui/material/Typography";
import { keyframes, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAppSelector } from "@/redux/hooks";
import Chip from "@mui/material/Chip";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import HigherLowerGameIcon from "../higher-lower-game/HigherLowerGameIcon";
import YouTubeIcon from "@mui/icons-material/YouTube";

const scaleUpAndDown = keyframes`
  0%{
    scale: 1;
  }
  50%{
    scale: 1.2;
  }
  1000%{
    scale: 1;
  }
`;

const Seperator = () => {
  return (
    <Typography
      fontSize={24}
      fontWeight={500}
      sx={{ color: grey["A400"], flexShrink: 0 }}
    >
      /
    </Typography>
  );
};

interface HeaderProps {
  channelDataWithoutVideos?: ChannelDataWithoutVideos;
  isHomePage?: boolean;
  isChannelPage?: boolean;
  isHigherLowerGamePage?: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
  const {
    channelDataWithoutVideos,
    isHomePage = false,
    isChannelPage = false,
    isHigherLowerGamePage = false,
  } = props;
  const theme = useTheme();
  const isPc = useMediaQuery(theme.breakpoints.up("lg"));
  const { score, status } = useAppSelector((state) => ({
    score: state.higherLowerGame.score,
    status: state.higherLowerGame.status,
  }));

  return (
    <Box
      component={"header"}
      sx={{
        flexGrow: 1,
        height: "56px",
        display: "flex",
        justifyContent: "space-between",
        px: 2,
      }}
    >
      <Box
        component={"nav"}
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
          overflow: "hidden",
        }}
      >
        <Box
          component={Link}
          sx={{ display: "flex", gap: 1, alignItems: "center", flexShrink: 0 }}
          href="/"
        >
          <YouTubeIcon color="primary" fontSize="large" />
          {(isHomePage || isPc) && (
            <Box sx={{ display: "flex" }}>
              <Typography component={"h2"} fontSize={20} fontWeight={700}>
                나의 작은 유튜버
              </Typography>
              <FavoriteIcon
                sx={{
                  alignSelf: "flex-start",
                  fontSize: 10,
                  color: pink[200],
                  transform: "rotate(30deg)",
                }}
              />
            </Box>
          )}
        </Box>
        {channelDataWithoutVideos !== undefined && (
          <>
            <Seperator />
            <Box
              component={Link}
              sx={[
                {
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                },
                isChannelPage && {
                  overflow: "hidden",
                },
              ]}
              href={`/channel/${channelDataWithoutVideos.id}`}
            >
              <Image
                placeholder="blur"
                blurDataURL={channelDataWithoutVideos.thumbnail.blurDataURL}
                src={channelDataWithoutVideos.thumbnail.url}
                alt="thumbnail"
                width={28}
                height={28}
                style={{ borderRadius: "50%", flexShrink: 0 }}
              />
              {(isChannelPage || isPc) && (
                <Typography
                  component={"h2"}
                  fontSize={20}
                  fontWeight={700}
                  noWrap
                >
                  {channelDataWithoutVideos.title}
                </Typography>
              )}
            </Box>
          </>
        )}
        {isHigherLowerGamePage && (
          <>
            <Seperator />
            <Box
              sx={[
                {
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  pointerEvents: "none",
                },
                isHigherLowerGamePage && {
                  overflow: "hidden",
                },
              ]}
            >
              <HigherLowerGameIcon />
              {(isHigherLowerGamePage || isPc) && (
                <Typography
                  component={"h2"}
                  fontSize={20}
                  fontWeight={700}
                  sx={{ flexGrow: 1, width: "100%" }}
                  noWrap
                >
                  더 많이 더 적게
                </Typography>
              )}
            </Box>
          </>
        )}
      </Box>
      {isHigherLowerGamePage && (
        <Chip
          icon={<AttachMoneyRoundedIcon />}
          label={score}
          color="money"
          sx={[
            {
              alignSelf: "center",
              fontSize: 16,
            },
            status === "SUCCEEDED" && {
              animation: `${scaleUpAndDown} 1s ease`,
            },
          ]}
        />
      )}
    </Box>
  );
};

export default Header;
