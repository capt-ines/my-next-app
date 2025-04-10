import HeroSection from "@/components/ui/HeroSection";
import IndexLayout from "@/components/layout/IndexLayout";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Container from "@/components/ui/Container";

function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <Container style="backdrop-blur-xs">
        <section className="flex flex-col gap-3 text-center lg:mx-12">
          <header className="my-4">
            <h2 className="text-3xl lg:text-4xl">
              Visualization has never been easier.
            </h2>
            <h3>We have all the tools you need.</h3>
          </header>
          <article>
            <Container style="flex flex-col items-center justify-center gap-4">
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
            </Container>
          </article>

          <article>
            <Container>
              <h2>Preview your dream future.</h2>
              <h3>Dream preview – a vision board</h3>
            </Container>
          </article>
          <article>
            <Container>
              <h2>But first, let it all out.</h2>
              <h3>Journal</h3>
            </Container>
          </article>
          <Link href="/register">
            <Button className="neon" variant={"outline"}>
              Start creating
            </Button>
          </Link>
        </section>
      </Container>
    </div>
  );
}

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <IndexLayout>{page}</IndexLayout>;
};

export default Home;
