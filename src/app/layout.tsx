import Header from "./components/Header";
import Provider from "./components/Provider";
import "@/lib/firebase";
import Initialize from "./components/Initialize";
import YoutuberAddRequest from "./components/YoutuberAddRequest";

interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  const { children } = props;

  return (
    <html lang="ko">
      <body>
        <Provider>
          <Initialize />
          <Header />
          {children}
          <YoutuberAddRequest />
        </Provider>
      </body>
    </html>
  );
}
