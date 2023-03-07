import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { grey, pink } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAppSelector } from "@/redux/hooks";
import HigherLowerGameIcon from "../higher-lower-game/HigherLowerGameIcon";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { signInWithRedirect, signOut } from "firebase/auth";
import { auth, provider } from "@/utils/firebase";
import Button from "@mui/material/Button";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useState, MouseEventHandler } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import GoogleIcon from "@mui/icons-material/Google";
import { useChannelDataWithoutVideosContext } from "@/context/ChannelContext";
import LinearProgress from "@mui/material/LinearProgress";

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
  pageType?: "HOME" | "CHANNEL" | "GAME";
}

const Header: React.FC<HeaderProps> = (props) => {
  const { pageType } = props;
  const theme = useTheme();
  const isPc = useMediaQuery(theme.breakpoints.up("lg"));
  const { isInitialized, isSignedIn, photoURL } = useAppSelector((state) => ({
    isInitialized: state.user.isInitialized,
    isSignedIn: state.user.isSignedIn,
    photoURL: state.user.photoURL,
  }));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const channelDataWithoutVideos = useChannelDataWithoutVideosContext();

  const handleLoginButtonClick = () => {
    signInWithRedirect(auth, provider);
  };
  const handleProfileClick: MouseEventHandler<HTMLElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogoutMenuItemClick = () => {
    signOut(auth);
  };

  return (
    <Box
      component={"header"}
      sx={{
        position: "relative",
        width: "100%",
        height: "56px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        gap: 2,
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
          <YouTubeIcon fontSize="large" sx={{ color: "brand" }} />
          {(pageType === "HOME" || isPc) && (
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
        {channelDataWithoutVideos !== null && (
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
                pageType === "CHANNEL" && {
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
              {(pageType === "CHANNEL" || isPc) && (
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
        {pageType === "GAME" && (
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
                pageType === "GAME" && {
                  overflow: "hidden",
                },
              ]}
            >
              <HigherLowerGameIcon />
              {(pageType === "GAME" || isPc) && (
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
      <Box
        sx={{
          display: "flex",
          flexShrink: 0,
        }}
      >
        {!isInitialized && (
          <Box
            sx={{
              width: 28,
              height: 44,
            }}
          />
        )}
        <Fade in={isInitialized && isSignedIn} appear={false}>
          {isInitialized && isSignedIn ? (
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  display: "flex",
                  cursor: "pointer",
                  width: 28,
                  height: 44,
                  alignItems: "center",
                }}
                onClick={handleProfileClick}
              >
                {photoURL == null ? (
                  <AccountCircleOutlinedIcon
                    sx={{ fontSize: 28 }}
                    color="primary"
                  />
                ) : (
                  <Image
                    src={photoURL}
                    alt="photo url"
                    width={28}
                    height={28}
                    style={{ borderRadius: "50%" }}
                  />
                )}
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleMenuClose}
                elevation={3}
                TransitionComponent={Fade}
                autoFocus={false}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              >
                <MenuItem onClick={handleLogoutMenuItemClick} dense>
                  로그아웃
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <div></div>
          )}
        </Fade>
        <Fade in={isInitialized && !isSignedIn} appear={false}>
          {isInitialized && !isSignedIn ? (
            <Button
              startIcon={<GoogleIcon sx={{ color: "google" }} />}
              size="small"
              onClick={handleLoginButtonClick}
            >
              로그인
            </Button>
          ) : (
            <div></div>
          )}
        </Fade>
      </Box>
      <Box sx={{ position: "absolute", top: 0, left: 0, right: 0 }}>
        {!isInitialized && <LinearProgress color="secondary" />}
      </Box>
    </Box>
  );
};

export default Header;
