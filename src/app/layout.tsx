import Script from "next/script";
import Provider from "./components/Provider";
import "@/lib/firebase";

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
