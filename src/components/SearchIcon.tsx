import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function SearchIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 32 32"
      sx={{ color: "transparent", ...props.sx }}
    >
      <path
        d="M14.6875 23.875C19.7616 23.875 23.875 19.7616 23.875 14.6875C23.875 9.61338 19.7616 5.5 14.6875 5.5C9.61338 5.5 5.5 9.61338 5.5 14.6875C5.5 19.7616 9.61338 23.875 14.6875 23.875Z"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.1836 21.1844L26.4992 26.5"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
}
