import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WifiProtectedSetupRoundedIcon from "@mui/icons-material/WifiProtectedSetupRounded";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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
        <NavigateBeforeRoundedIcon
          sx={{ fontSize: 32, cursor: "pointer", flexShrink: 0 }}
        />
      </Link>
      <Box
        sx={{ display: "flex", gap: 1, flexGrow: 1, justifyContent: "center" }}
      >
        <WifiProtectedSetupRoundedIcon
          sx={{ color: "#FF8A8A", fontSize: 32 }}
        />
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
