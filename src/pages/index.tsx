import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import ThumbsUpDownRoundedIcon from "@mui/icons-material/ThumbsUpDownRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";

const Home = () => {
  return (
    <Box
      component={"main"}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Typography component={"h1"} variant="h4" fontWeight={700}>
          나의 작은 유튜버
        </Typography>
        <FavoriteIcon
          sx={{
            position: "absolute",
            top: -4,
            right: -12,
            fontSize: 12,
            transform: "rotate(30deg)",
            color: pink[200],
          }}
        />
      </Box>
      <Box component={"ul"} sx={{ listStyle: "none", p: 2, m: 0 }}>
        <li>
          <Link href="/games/higher-lower">
            <Button variant="contained" startIcon={<ThumbsUpDownRoundedIcon />}>
              더 많이 더 적게
            </Button>
          </Link>
        </li>
      </Box>
    </Box>
  );
};

export default Home;
