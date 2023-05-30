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
    </html>
  );
}
