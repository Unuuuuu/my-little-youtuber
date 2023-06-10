import Script from "next/script";
import Provider from "./components/Provider";
import { Metadata } from "next";
import "@/lib/firebase";

const title = "나의 작은 유튜버 - 조회수 높은 영상 맞추기 게임";
const description =
  "좋아하는 유튜버의 영상으로 조회수가 더 높은 영상을 맞추는 게임을 해보세요. (유튜브 월드컵, 조회수 월드컵, 더 많이 더 적게 유튜브 버전)";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "나작유",
    "나의 작은 유튜버",
    "조회수 높은 영상 맞추기 게임",
    "유튜브 월드컵",
    "조회수 월드컵",
    "더 많이 더 적게",
    "더 많이 더 적게 유튜브 버전",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "ko_KR",
    url: "https://www.mylittleyoutuber.com",
    siteName: "나의 작은 유튜버",
    images: {
      url: "https://www.mylittleyoutuber.com/logo-1200x630.png",
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: "https://www.mylittleyoutuber.com/logo-1200x630.png",
  },
  viewport: {
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
  },
};

interface Props {
  children: React.ReactNode;
}

export default async function Layout(props: Props) {
  const { children } = props;

  return (
    <html lang="ko">
      <body>
        <Provider>{children}</Provider>
      </body>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4440044743501222"
        crossOrigin="anonymous"
      />
    </html>
  );
}
