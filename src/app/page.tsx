import Header from "./components/Header";
import HomeTabs from "./components/HomeTabs";
import Footer from "./components/Footer";
import YoutuberAddRequest from "./components/YoutuberAddRequest";

export default async function Page() {
  return (
    <>
      <Header />
      <HomeTabs />
      <Footer />
      <YoutuberAddRequest />
    </>
  );
}
