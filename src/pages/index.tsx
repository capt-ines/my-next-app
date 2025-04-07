import Image from "next/image";
import HeroSection from "@/components/ui/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <section className="h-screen">
        <p className="text-amber-300">test</p>
      </section>
    </>
  );
}
