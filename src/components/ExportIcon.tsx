import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function ExportIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 32 32"
      sx={{ color: "transparent", ...props.sx }}
    >
      <path
        d="M11.4062 8.34375L16 3.75L20.5938 8.34375"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16 16V3.75"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.25 12.5H23.875C24.1071 12.5 24.3296 12.5922 24.4937 12.7563C24.6578 12.9204 24.75 13.1429 24.75 13.375V24.75C24.75 24.9821 24.6578 25.2046 24.4937 25.3687C24.3296 25.5328 24.1071 25.625 23.875 25.625H8.125C7.89294 25.625 7.67038 25.5328 7.50628 25.3687C7.34219 25.2046 7.25 24.9821 7.25 24.75V13.375C7.25 13.1429 7.34219 12.9204 7.50628 12.7563C7.67038 12.5922 7.89294 12.5 8.125 12.5H10.75"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
}
