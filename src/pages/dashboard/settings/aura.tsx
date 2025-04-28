import React, { useEffect, useState, useRef } from "react";
import type { GetServerSidePropsContext } from "next";
import { createClient } from "@/utils/supabase/server-props";
import { createClient as createComponentClient } from "@/utils/supabase/component";
import { useRouter } from "next/router";
import { useUser } from "@/contexts/userContext";
import Container from "@/components/ui/Container";
import { useThemeContext } from "@/contexts/themeContext";
import clsx from "clsx";
import { themesData } from "@/constants/themes";
import { SignOut } from "@supabase/supabase-js";
import ArrowButton from "@/components/ui/arrowButton";
import { Button } from "@/components/ui/button";
import { GrCheckmark } from "react-icons/gr";
import { createClient as ComponentClient } from "@/utils/supabase/component";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Aura = () => {
  const { username, user } = useUser();
  const { theme, setTheme } = useThemeContext();
  const themes = themesData.map((t) => t.key);
  const labels = themesData.map((t) => t.label);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentLabel = themesData.find((t) => t.key === theme)?.label;
  const supabase = ComponentClient();

  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const updateUserTheme = async () => {
    if (user?.user_metadata.theme === theme) {
      return;
    }
    const { data, error } = await supabase.auth.updateUser({
      data: { theme },
    });
    if (error) {
      console.error("Error updating user theme:", error.message);
    } else {
      console.log("User theme updated successfully:", data);
    }
  };

  useEffect(() => {
    const index = themesData.findIndex((t) => t.key === theme);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [theme]);

  useEffect(() => {
    if (!user) return;
    const timer = setTimeout(() => {
      updateUserTheme();
    }, 6000);

    return () => clearTimeout(timer);
  }, [theme, user]);

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

  const handleSwatchClick = (t: {
    key: string;
    label: string;
    swatch: string;
  }) => {
    setTheme(t.key);
  };

  useEffect(() => {
    if (listRef.current && itemRefs.current[currentIndex]) {
      const selectedItem = itemRefs.current[currentIndex];
      const container = listRef.current;

      const containerRect = container.getBoundingClientRect();
      const itemRect = selectedItem?.getBoundingClientRect();

      if (itemRect) {
        const offset =
          itemRect.top -
          containerRect.top -
          container.clientHeight / 2 +
          itemRect.height / 2;
        container.scrollBy({ top: offset, behavior: "smooth" });
      }
    }
  }, [currentIndex]);

  return (
    <>
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Profile</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/settings">Settings</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Aura</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="flex flex-col-reverse items-center justify-center gap-5 md:flex-row md:gap-2 lg:gap-20 2xl:gap-30">
        <div className="flex flex-col items-center gap-1">
          <div className="md:hidden">
            <ArrowButton
              className="m-4"
              onClick={() => {
                if (listRef.current) {
                  listRef.current.scrollBy({
                    top: -32,
                    behavior: "smooth",
                  });
                }
              }}
              direction="up"
            />
          </div>
          <ul
            ref={listRef}
            className="no-scroll flex h-36 flex-col items-end overflow-x-hidden overflow-y-scroll scroll-smooth md:h-96 lg:h-full"
          >
            {themesData.map((t, index) => (
              <li
                ref={(el) => (itemRefs.current[index] = el)}
                onClick={() => handleSwatchClick(t)}
                key={t.key}
                className={`${theme === t.key ? `scale-130 hover:scale-126` : ``} flex cursor-pointer items-center gap-2 px-5 py-1 transition-transform duration-300 hover:scale-120`}
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
          <div className="md:hidden">
            <ArrowButton
              className="m-4"
              onClick={() => {
                if (listRef.current) {
                  listRef.current.scrollBy({
                    top: 32,
                    behavior: "smooth",
                  });
                }
              }}
              direction="down"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-10 text-center">
          <div className="md:mb-5">
            <h1>Choose your aura.</h1>
            <span className="text-xs sm:text-sm">
              You can change it later in your profile settings.
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-16 lg:gap-10">
            <ArrowButton className="m-4" onClick={prevTheme} direction="left" />
            <div
              style={{ willChange: "transform" }}
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
            <ArrowButton
              className="m-4"
              onClick={nextTheme}
              direction="right"
            />
          </div>
          <h2 className="mb-3 hidden text-3xl md:mt-5 md:block">
            {currentLabel}
          </h2>
        </div>
      </section>
    </>
  );
};

export default Aura;
