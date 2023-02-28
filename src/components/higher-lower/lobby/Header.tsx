import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { blue, red } from "@mui/material/colors";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";

const Header = () => {
  const theme = useTheme();
  const isPc = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box
      component={"header"}
      sx={{
        height: 64,
        p: 2,
        display: "flex",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Link href="/">
        <NavigateBeforeRoundedIcon sx={{ fontSize: 32 }} />
      </Link>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <ThumbUpRoundedIcon
            sx={{
              alignSelf: "flex-start",
              color: red[600],
              fontSize: 16,
              transform: "translate(1px, 4px)",
            }}
          />
          <ThumbDownRoundedIcon
            sx={{
              alignSelf: "flex-end",
              color: blue[600],
              fontSize: 16,
              transform: "translate(-1px, -4px)",
            }}
          />
        </Box>
        {isPc && (
          <Typography component={"h1"} variant="h5" fontWeight={500}>
            더 많이 더 적게
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          flexShrink: 0,
          flexBasis: 32,
        }}
      />
    </Box>
  );
};

export default Header;
