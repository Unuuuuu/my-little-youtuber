import { useAppSelector } from "@/redux/hooks";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import Link from "next/link";

const Header = () => {
  const { channelTitle, count, thumbnail } = useAppSelector((state) => ({
    count: state.higherLowerGame.count,
    channelTitle: state.higherLowerGame.title,
    thumbnail: state.higherLowerGame.thumbnail,
  }));

  return (
    <Box
      component={"header"}
      sx={{
        height: 64,
        p: 2,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Link href="/higher-lower-game">
        <NavigateBeforeRoundedIcon
          sx={{ fontSize: 32, cursor: "pointer", flexShrink: 0 }}
        />
      </Link>
      <Box
        sx={{ display: "flex", gap: 1, flexGrow: 1, justifyContent: "center" }}
      >
        <Box sx={{ borderRadius: "50%", overflow: "hidden" }}>
          <Image
            src={thumbnail?.url ?? ""}
            placeholder="blur"
            blurDataURL={thumbnail?.blurDataURL}
            alt="channel thumbnail"
            width={32}
            height={32}
          />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {channelTitle}
        </Typography>
      </Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
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
