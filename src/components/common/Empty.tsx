import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

interface EmptyProps {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
}

const Empty: React.FC<EmptyProps> = (props) => {
  const { title, subtitle, children } = props;
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {title && (
        <Typography
          component={"h3"}
          fontSize={20}
          fontWeight={500}
          sx={{ mb: 0.5 }}
        >
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography component={"h4"} fontSize={16} fontWeight={400}>
          {subtitle}
        </Typography>
      )}
      {children}
    </Box>
  );
};

export default Empty;
