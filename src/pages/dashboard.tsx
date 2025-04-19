import React, { useEffect, useState } from "react";
import type { GetServerSidePropsContext } from "next";
import { createClient } from "@/utils/supabase/server-props";
import { createClient as createComponentClient } from "@/utils/supabase/component";
import { useRouter } from "next/router";
import { useUser } from "@/contexts/userContext";
import Container from "@/components/ui/Container";
import { useThemeContext } from "@/contexts/themeContext";
import { GrNext } from "react-icons/gr";
import clsx from "clsx";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { themesData } from "@/constants/themes";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { username } = useUser();
  const router = useRouter();
  const { theme, setTheme } = useThemeContext();
  const themes = themesData.map((t) => t.key);
  const labels = themesData.map((t) => t.label);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentLabel = themesData.find((t) => t.key === theme)?.label;

  useEffect(() => {
    const index = themesData.findIndex((t) => t.key === theme);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [theme]);

  const nextTheme = () => {
    setCurrentIndex((prev) => {
      const newIndex = (prev + 1) % themes.length;
      setTheme(themes[newIndex]);
      return newIndex;
    });
  };
  const prevTheme = () => {
    setCurrentIndex((prev) => {
      const newIndex = (prev - 1 + themes.length) % themes.length;
      setTheme(themes[newIndex]);
      return newIndex;
    });
  };

  const handleSwatchClick = (t) => {
    setTheme(t.key);
  };

  const signOut = async () => {
    const supabase = createComponentClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      return;
    }
    router.push("/");
  };

  return (
    <>
      {/* <h1>Hello, {username}!</h1>
      <button onClick={signOut}>sign out</button> */}
      <section className="flex flex-col-reverse items-center justify-center gap-20 md:flex-row md:gap-2 lg:gap-20 2xl:gap-30">
        <div className="flex flex-col items-center gap-2">
          <ul className="flex h-48 flex-col items-end justify-center overflow-auto md:h-96 lg:h-full">
            {themesData.map((t) => (
              <li
                onClick={() => handleSwatchClick(t)}
                key={t.key}
                className={`${theme === t.key ? `text-foreground` : `text-foreground/50`} flex cursor-pointer items-center gap-2 px-5 py-1 transition-transform duration-300 hover:scale-120`}
              >
                {t.label}
                <div
                  className={`${t.key === `seeker` || t.key === `indigoChild` ? `animate-rainbow` : null}`}
                  style={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: t.swatch,
                  }}
                ></div>
              </li>
            ))}
          </ul>
          <button className="hover:text-foreground/80 active:text-foreground/60 rotate-90 cursor-pointer p-4 transition-transform duration-200 hover:scale-120 active:scale-140 lg:hidden">
            <GrNext />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-10 text-center">
          <div className="md:mb-5">
            <h1>Choose your aura.</h1>
            <span className="text-sm">
              You can change it later in your profile settings.
            </span>
          </div>
          <div className="flex items-center gap-5 sm:gap-16 lg:gap-10">
            <button
              className="hover:text-foreground/80 active:text-foreground/60 rotate-180 cursor-pointer p-8 transition-transform duration-200 hover:scale-120 active:scale-140"
              onClick={prevTheme}
            >
              <GrNext />
            </button>
            <div
              className={clsx(
                "aspect-square",
                "min-w-36",
                "md:w-64",
                "lg:w-72",
                "rounded-full",
                "mx-auto",
                "bg-white",
                "mix-blend-plus-lighter",
                "transition",
                "duration-1000",
                "ease-out",
                theme === "indigoChild" || theme === "seeker"
                  ? "animate-rainbowGlow"
                  : "glow hover:biggerglow",
              )}
            />
            <button
              className="hover:text-foreground/80 active:text-foreground/60 cursor-pointer p-8 transition-transform duration-200 hover:scale-120 active:scale-140"
              onClick={nextTheme}
            >
              <GrNext />
            </button>
          </div>

          <h2 className="hidden text-3xl md:mt-5 md:block">{currentLabel}</h2>
        </div>
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
