import Link from "next/link";

const Home = () => {
  return (
    <main>
      <h1>나만의 작은 유튜버</h1>
      <ul>
        <li>
          <Link href="/games/higher-lower">더 많이 더 적게</Link>
        </li>
      </ul>
    </main>
  );
};

export default Home;
