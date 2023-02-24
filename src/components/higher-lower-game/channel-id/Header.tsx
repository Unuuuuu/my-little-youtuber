import { useAppSelector } from "@/redux/hooks";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const Header = () => {
  const { channelTitle, count, thumbnail } = useAppSelector((state) => ({
    count: state.higherLowerGame.count,
    channelTitle: state.higherLowerGame.channelTitle,
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
      <Box />
      <Box sx={{ display: "flex", gap: 1 }}>
        <Box sx={{ borderRadius: "50%", overflow: "hidden" }}>
          <Image
            src={thumbnail?.url ?? ""}
            placeholder="blur"
            blurDataURL={thumbnail?.placeholder}
            alt="channel thumbnail"
            width={32}
            height={32}
          />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {channelTitle}
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        {count}
      </Typography>
    </Box>
  );
};

export default Header;
