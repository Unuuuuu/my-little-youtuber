import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Header = () => {
  const theme = useTheme();
  const isPc = useMediaQuery(theme.breakpoints.up("lg"));
  const { isInitialized, title, count, thumbnail } = useAppSelector(
    (state) => ({
      isInitialized: state.higherLowerGame.isInitialized,
      count: state.higherLowerGame.count,
      title: state.higherLowerGame.title,
      thumbnail: state.higherLowerGame.thumbnail,
    })
  );

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
      <Link href="/games/higher-lower">
        <NavigateBeforeRoundedIcon sx={{ fontSize: 32 }} />
      </Link>
      <Box
        sx={{ display: "flex", gap: 1, flexGrow: 1, justifyContent: "center" }}
      >
        {isInitialized && (
          <>
            <Image
              src={thumbnail?.url ?? ""}
              placeholder="blur"
              blurDataURL={thumbnail?.blurDataURL}
              alt="channel thumbnail"
              width={32}
              height={32}
              style={{ borderRadius: "50%" }}
            />
            {isPc && (
              <Typography component={"h1"} variant="h5" fontWeight={500}>
                {title}
              </Typography>
            )}
          </>
        )}
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
