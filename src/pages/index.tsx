import IndexLayout from "@/components/layout/IndexLayout";
import ArrowButton from "@/components/ui/arrowButton";
import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HeroSection from "@/components/ui/HeroSection";
import { useUser } from "@/contexts/userContext";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { useRef } from "react";

function Home() {
  const { user } = useUser();
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <ArrowButton
        className="mx-auto -translate-y-18 scale-160"
        direction="down"
        onClick={scrollToSection}
      />
      <section ref={sectionRef} className="">
        <div className="mt-12 flex flex-col gap-8 text-center lg:mx-12 lg:mt-18 lg:gap-10">
          <header className="mt-10 mb-2">
            <h2 className="text-3xl lg:text-4xl">
              Visualization has never been easier.
            </h2>
            <h3>We have all the tools you need.</h3>
          </header>
          <hr className="text-foreground/10 h-0.5" />
          <article>
            <div className="flex flex-col items-center justify-center gap-4">
              <div>
                <h2>Endulge in a tangible visualization experience.</h2>
                <h3>
                  Use our Mockup Studio to create your dream social media
                  profile and dream it into reality.
                </h3>
              </div>
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 3000,
                  }),
                ]}
                opts={{
                  loop: true,
                }}
              >
                <CarouselContent>
                  <CarouselItem>1</CarouselItem>
                  <CarouselItem>2</CarouselItem>
                  <CarouselItem>3</CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </article>

          <article>
            <div>
              <h2>Preview your dream future.</h2>
              <h3>Soulscape – a vision board</h3>
            </div>
          </article>
          <article>
            <div>
              <h2>But first, let it all out.</h2>
              <h3>Journal</h3>
            </div>
          </article>
          <Link
            href={user ? "/explore" : "/register"}
            className={buttonVariants({
              variant: "outline",
              className:
                "glow hover:biggerglow mx-auto w-fit transition duration-700",
            })}
          >
            Start creating
          </Link>
        </div>
      </section>
    </div>
  );
}

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <IndexLayout>{page}</IndexLayout>;
};

export default Home;
