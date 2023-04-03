import "@/lib/firebase";
import { Metadata } from "next";
import Script from "next/script";
import Header from "./components/Header";
import Initialize from "./components/Initialize";
import KakaotalkGuideModal from "./components/KakaotalkGuideModal";
import LoginRequestSnackbar from "./components/LoginRequestSnackbar";
import Main from "./components/Main";
import Provider from "./components/Provider";

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
      url: "https://www.mylittleyoutuber.com/logo.png",
      width: 512,
      height: 353,
    },
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: "https://www.mylittleyoutuber.com/logo.png",
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
        <Provider>
          <Initialize />
          <Header />
          <Main>{children}</Main>
          <LoginRequestSnackbar />
          <KakaotalkGuideModal />
        </Provider>
      </body>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4440044743501222"
        crossOrigin="anonymous"
      />
    </html>
  );
}
