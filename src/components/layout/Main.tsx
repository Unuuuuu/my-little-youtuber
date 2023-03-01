import Box from "@mui/material/Box";
import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

const Main: React.FC<MainProps> = (props) => {
  const { children } = props;

  return (
    <Box
      component={"main"}
      sx={{
        width: "100%",
        height: "calc(100% - 56px)",
      }}
    >
      {children}
    </Box>
  );
};

export default Main;
