import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function CaretLeftIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 32 32"
      sx={{ color: "transparent", ...props.sx }}
    >
      <path
        d="M20 26L10 16L20 6"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
}
