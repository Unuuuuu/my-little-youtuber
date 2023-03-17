"use client";

import { useAppSelector } from "@/lib/hooks";
import Typography from "@mui/material/Typography";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Link from "next/link";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import LinearProgress from "@mui/material/LinearProgress";
import Fade from "@mui/material/Fade";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useRef, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { signInWithRedirect, signOut } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { usePathname } from "next/navigation";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

export default function Header() {
  const { channel, isInitialized, isSignedIn, photoURL } = useAppSelector(
    (state) => ({
      channel: state.channel,
      isInitialized: state.user.isInitialized,
      isSignedIn: state.user.isSignedIn,
      photoURL: state.user.photoURL,
    })
  );
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"), {
    defaultMatches: true,
  });
  const anchorElementRef = useRef<HTMLElement | null>(null);
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorElement);
  const pathname = usePathname();

  const handleLoginButtonClick = () => {
    // TODO
    // if (navigator.userAgent.includes("KAKAOTALK")) {
    //   dispatch(kakaotalkGuideModalActions.open());
    //   return;
    // }

    signInWithRedirect(auth, provider);
  };
  const handleProfileButtonClick = () => {
    setAnchorElement(anchorElementRef.current);
  };
  const handleMenuClose = () => {
    setAnchorElement(null);
  };
  const handleLogoutMenuItemClick = () => {
    signOut(auth);
  };

  return (
    <Box
      component={"header"}
      sx={{
        width: "100%",
        height: 56,
        position: "fixed",
        top: 0,
        pl: 2,
        pr: "11px",
        display: "flex",
        alignItems: "center",
        bgcolor: "white",
        zIndex: 10,
        gap: 2,
      }}
    >
      <Box
        component={"nav"}
        sx={{ display: "flex", gap: 1, flex: 1, overflow: "hidden" }}
      >
        <Box
          component={Link}
          href="/"
          sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}
        >
          <YouTubeIcon
            fontSize="large"
            sx={{
              color: "brand",
            }}
          />
          {(pathname === "/" || isSm) && (
            <Typography component={"h1"} fontSize={20} fontWeight={500}>
              나의 작은 유튜버
            </Typography>
          )}
        </Box>
        {channel.id !== undefined &&
          channel.title !== undefined &&
          channel.thumbnail !== undefined && (
            <Fade in={true}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  overflow: "hidden",
                }}
              >
                <Typography
                  fontSize={24}
                  fontWeight={500}
                  sx={{ color: grey["A200"] }}
                >
                  /
                </Typography>
                <Box
                  component={Link}
                  href={`/channel/${channel.id}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    placeholder="blur"
                    blurDataURL={channel.thumbnail.blurDataURL}
                    src={channel.thumbnail.url}
                    alt="thumbnail"
                    width={28}
                    height={28}
                    style={{ borderRadius: "50%" }}
                  />
                  <Typography
                    component={"h2"}
                    fontSize={20}
                    fontWeight={500}
                    noWrap
                  >
                    {channel.title}
                  </Typography>
                </Box>
              </Box>
            </Fade>
          )}
      </Box>
      <Fade in={isInitialized}>
        <Box>
          {isSignedIn ? (
            <Fade in={true}>
              <Box sx={{ py: 0.5 }} ref={anchorElementRef}>
                <IconButton onClick={handleProfileButtonClick} size="small">
                  {photoURL == null ? (
                    <AccountCircleRoundedIcon
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
                </IconButton>
                <Menu
                  anchorEl={anchorElement}
                  open={isOpen}
                  onClose={handleMenuClose}
                  elevation={2}
                  TransitionComponent={Fade}
                  autoFocus={false}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                  <MenuItem onClick={handleLogoutMenuItemClick} dense>
                    <ListItemIcon>
                      <ExitToAppOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    로그아웃
                  </MenuItem>
                  <a href="mailto:mylittley0utuber@gmail.com">
                    <MenuItem dense>
                      <ListItemIcon>
                        <EmailOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      문의하기
                    </MenuItem>
                  </a>
                </Menu>
              </Box>
            </Fade>
          ) : null}
          {!isSignedIn ? (
            <Fade in={true}>
              <Button
                startIcon={<GoogleIcon sx={{ color: "google" }} />}
                size="small"
                onClick={handleLoginButtonClick}
                color="secondary"
              >
                로그인
              </Button>
            </Fade>
          ) : null}
        </Box>
      </Fade>
      <Box sx={{ position: "absolute", top: 0, left: 0, right: 0 }}>
        {!isInitialized && <LinearProgress />}
      </Box>
    </Box>
  );
}
