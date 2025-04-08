import HeroSection from "@/components/ui/HeroSection";
import IndexLayout from "@/components/layout/IndexLayout";

function Home() {
  return (
    <>
      <HeroSection />
      <section className="h-screen"></section>
    </>
  );
}

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <IndexLayout>{page}</IndexLayout>;
};

export default Home;
