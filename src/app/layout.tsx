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
