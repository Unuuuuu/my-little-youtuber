import Header from "./components/Header";
import Provider from "./components/Provider";
import "@/lib/firebase";

interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  const { children } = props;

  return (
    <html lang="ko">
      <body>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
