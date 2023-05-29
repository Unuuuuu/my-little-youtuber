import Box from "@mui/material/Box";

export interface Props {
  children?: React.ReactNode;
  selectedValue: string;
  value: string;
}

export default function TabPanel(props: Props) {
  const { selectedValue, value, children } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== selectedValue}
      sx={{
        minHeight: {
          sm: "calc(100vh - (48px + 48px + 128px))",
          md: "calc(100vh - (112px + 60px + 128px))",
        },
      }}
    >
      {value === selectedValue && children}
    </Box>
  );
}
