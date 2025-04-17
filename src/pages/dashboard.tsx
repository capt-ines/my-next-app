import React, { useEffect } from "react";
import type { GetServerSidePropsContext } from "next";
import { createClient } from "@/utils/supabase/server-props";
import { createClient as createComponentClient } from "@/utils/supabase/component";
import { useRouter } from "next/router";
import { useUser } from "@/contexts/userContext";
import Container from "@/components/ui/Container";
import { useThemeContext } from "@/contexts/themeContext";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Dashboard = () => {
  const { username } = useUser();
  const router = useRouter();
  const { theme, setTheme } = useThemeContext();

  const signOut = async () => {
    const supabase = createComponentClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      return;
    }
    router.push("/");
  };

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      {/* <h1>Hello, {username}!</h1>
      <button onClick={signOut}>sign out</button> */}

      <section>
        <Container style="flex justify-center text-center flex-col w-fit mx-auto">
          <h1>Choose your aura.</h1>
          <span>You can change it later in your profile settings.</span>
          <Carousel
            setApi={setApi}
            opts={{
              loop: true,
            }}
          >
            <CarouselContent className="">
              <CarouselItem className="">
                {/* <div
                  className={` flex aspect-square w-52 hover:scale-105 max-w-md min-w-3xs flex-col items-center justify-center rounded-full bg-white px-5 shadow-[0_0_30px_#ffffff,0_0_20px_var(--accent),0_0_100px_var(--accent)] transition duration-1000 ease-out hover:shadow-[0_0_40px_#ffffff,0_0_60px_var(--accent),0_0_300px_var(--accent)] sm:px-10 }`}
                ></div> */}
                <h2 className="text-3xl">{theme}</h2>
              </CarouselItem>
              <CarouselItem></CarouselItem>
              <CarouselItem>3</CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </Container>
      </section>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);
  const { data, error } = await supabase.auth.getUser();
  if (error || !data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: data.user,
    },
  };
}

export default Dashboard;
