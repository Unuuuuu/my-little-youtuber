import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function VsSvgIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 37 21"
      sx={{ color: "transparent", ...props.sx }}
    >
      <path
        d="M15.576 0.480001H20.16L12.432 20.04H7.728L0 0.480001H4.944L10.272 14.88L15.576 0.480001Z"
        fill="#222222"
      />
      <path
        d="M28.9476 0C33.3156 0 36.5796 2.664 36.7956 6.384H32.2836C32.0196 4.68 30.7476 3.648 28.6596 3.648C26.6196 3.648 25.4916 4.464 25.4916 5.64C25.4916 7.104 27.0036 7.608 30.8196 8.4C35.3316 9.336 36.8676 11.568 36.8676 14.496C36.8676 18.24 33.3396 20.52 28.9716 20.52C24.1476 20.52 20.6196 17.904 20.4276 13.728H24.9156C25.1556 15.6 26.7876 16.848 29.2836 16.848C31.0596 16.848 32.3796 15.96 32.3796 14.688C32.3796 13.128 31.0596 12.504 27.5796 11.856C23.3316 11.064 21.0276 9.312 21.0276 5.64C21.0276 2.112 24.5316 0 28.9476 0Z"
        fill="#222222"
      />
    </SvgIcon>
  );
}
