import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function PlusCircleIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 32 32"
      sx={{ color: "transparent", ...props.sx }}
    >
      <path
        d="M16 26.5C21.799 26.5 26.5 21.799 26.5 16C26.5 10.201 21.799 5.5 16 5.5C10.201 5.5 5.5 10.201 5.5 16C5.5 21.799 10.201 26.5 16 26.5Z"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.625 16H20.375"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16 11.625V20.375"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
}
