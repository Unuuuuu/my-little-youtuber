import Box from "@mui/material/Box";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import { blue, red } from "@mui/material/colors";

const Icon = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <ThumbUpRoundedIcon
        sx={{
          color: red[600],
          fontSize: 16,
          position: "relative",
          top: -4,
          right: -1,
        }}
      />
      <ThumbDownRoundedIcon
        sx={{
          color: blue[600],
          fontSize: 16,
          position: "relative",
          bottom: -4,
          left: -1,
        }}
      />
    </Box>
  );
};

export default Icon;
