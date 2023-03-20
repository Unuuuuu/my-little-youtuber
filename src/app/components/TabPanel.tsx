import Box from "@mui/material/Box";

export interface Props<T> {
  children?: React.ReactNode;
  selectedValue: T;
  value: T;
}

export default function TabPanel<T>(props: Props<T>) {
  const { selectedValue, value, children } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== selectedValue}
      sx={{ overflow: "hidden", flexGrow: 1 }}
    >
      {value === selectedValue && children}
    </Box>
  );
}
