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
import Icon from "../higher-lower-game/Icon";

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
    <Typography fontSize={24} fontWeight={500} sx={{ color: grey["A400"] }}>
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
    isHomePage,
    isChannelPage,
    isHigherLowerGamePage,
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
        width: "100%",
        height: "56px",
        display: "flex",
        justifyContent: "space-between",
        px: 2,
      }}
    >
      <Box
        component={"nav"}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <Box
          component={Link}
          sx={{ display: "flex", gap: 1, alignItems: "center" }}
          href="/"
        >
          <Image src={"/logo.svg"} alt="logo" width={28.57} height={20} />
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
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
              href={`/channel/${channelDataWithoutVideos.id}`}
            >
              <Image
                placeholder="blur"
                blurDataURL={channelDataWithoutVideos.thumbnail.blurDataURL}
                src={channelDataWithoutVideos.thumbnail.url}
                alt="thumbnail"
                width={28}
                height={28}
                style={{ borderRadius: "50%" }}
              />
              {(isChannelPage || isPc) && (
                <Typography component={"h2"} fontSize={20} fontWeight={700}>
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
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              <Icon />
              {(isHigherLowerGamePage || isPc) && (
                <Typography component={"h2"} fontSize={20} fontWeight={700}>
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
              // textAlign: "center",
              fontSize: 16,
            },
            status === "SUCCEEDED" && {
              animation: `${scaleUpAndDown} 1s ease`,
            },
          ]}
        />
      )}
      {/* <Typography
        fontWeight={500}
        fontSize={24}
        sx={[
          {
            alignSelf: "center",
            // textAlign: "center",
          },
          status === "SUCCEEDED" && {
            animation: `${scaleUpAndDown} 1s ease infinite`,
          },
        ]}
      >
        {score}
      </Typography> */}
    </Box>
  );
};

export default Header;
