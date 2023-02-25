import { useAppSelector } from "@/redux/hooks";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import Link from "next/link";

const Header = () => {
  const theme = useTheme();
  const isPc = useMediaQuery(theme.breakpoints.up("lg"));
  const { title, count, thumbnail } = useAppSelector((state) => ({
    count: state.higherLowerGame.count,
    title: state.higherLowerGame.title,
    thumbnail: state.higherLowerGame.thumbnail,
  }));

  return (
    <Box
      component={"header"}
      sx={[
        {
          height: 64,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: "divider",
        },
        isPc && {
          borderColor: "transparent",
        },
      ]}
    >
      <Link href="/higher-lower-game">
        <NavigateBeforeRoundedIcon
          sx={{ fontSize: 32, cursor: "pointer", flexShrink: 0 }}
        />
      </Link>
      <Box
        sx={{ display: "flex", gap: 1, flexGrow: 1, justifyContent: "center" }}
      >
        <Image
          src={thumbnail?.url ?? ""}
          placeholder="blur"
          blurDataURL={thumbnail?.blurDataURL}
          alt="channel thumbnail"
          width={32}
          height={32}
          style={{ borderRadius: "50%" }}
        />
        <Typography component={"h1"} variant="h5" fontWeight={500}>
          {title}
        </Typography>
      </Box>
      <Typography
        variant="h5"
        fontWeight={500}
        sx={{
          flexShrink: 0,
          flexBasis: 32,
          textAlign: "center",
        }}
      >
        {count}
      </Typography>
    </Box>
  );
};

export default Header;
