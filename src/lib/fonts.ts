import { Noto_Sans_KR } from "next/font/google";
import localFont from "next/font/local";

export const notoSansKR = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const gmarketSans = localFont({
  src: [
    {
      path: "./fonts/GmarketSansLight.otf",
      weight: "300",
    },
    {
      path: "./fonts/GmarketSansMedium.otf",
      weight: "500",
    },
    {
      path: "./fonts/GmarketSansBold.otf",
      weight: "700",
    },
  ],
});
