export const metadata = {
  title: "나의 작은 유튜버 - 유튜브 영상 조회수 대결 게임",
  description:
    "좋아하는 유튜버의 영상으로 조회수 대결 게임을 플레이해보세요! 더 많이 더 적게의 유튜브 버전입니다.",
};

interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  const { children } = props;

  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
