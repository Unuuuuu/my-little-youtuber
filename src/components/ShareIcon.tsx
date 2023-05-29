import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function ShareIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 48 48"
      sx={{ color: "white", ...props.sx }}
    >
      <path
        d="M17 27.5C18.933 27.5 20.5 25.933 20.5 24C20.5 22.067 18.933 20.5 17 20.5C15.067 20.5 13.5 22.067 13.5 24C13.5 25.933 15.067 27.5 17 27.5Z"
        stroke="#515151"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M29.25 35.375C31.183 35.375 32.75 33.808 32.75 31.875C32.75 29.942 31.183 28.375 29.25 28.375C27.317 28.375 25.75 29.942 25.75 31.875C25.75 33.808 27.317 35.375 29.25 35.375Z"
        stroke="#515151"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M29.25 19.625C31.183 19.625 32.75 18.058 32.75 16.125C32.75 14.192 31.183 12.625 29.25 12.625C27.317 12.625 25.75 14.192 25.75 16.125C25.75 18.058 27.317 19.625 29.25 19.625Z"
        stroke="#515151"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M26.307 18.0176L19.9414 22.1082"
        stroke="#515151"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19.9414 25.8926L26.307 29.9832"
        stroke="#515151"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
}
