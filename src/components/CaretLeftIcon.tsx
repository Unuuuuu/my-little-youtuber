import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function CaretLeftIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 48 48"
      sx={{ color: "white", ...props.sx }}
    >
      <path
        d="M28 34L18 24L28 14"
        stroke="#515151"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
}
