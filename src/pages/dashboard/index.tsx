import React, { useEffect, useState } from "react";
import type { GetServerSidePropsContext } from "next";
import { createClient } from "@/utils/supabase/server-props";
import { createClient as createComponentClient } from "@/utils/supabase/component";
import { useUser } from "@/contexts/userContext";
import Container from "@/components/ui/Container";
import { useThemeContext } from "@/contexts/themeContext";
import { IoMdJournal } from "react-icons/io";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { username, user } = useUser();
  const router = useRouter();
  const { theme } = useThemeContext();

  return (
    <>
      <div className="my-2 flex w-full flex-col items-center">
        <div
          style={{ willChange: "transform" }}
          className={clsx(
            "aspect-square",
            "w-25",
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
        <h1 className="mt-5">{username}</h1>
      </div>

      <section>
        <Tabs defaultValue="soulscapes">
          <TabsList className="aero mx-auto grid h-20 w-fit grid-flow-col grid-rows-2 min-[500px]:flex min-[500px]:h-auto">
            <TabsTrigger className="col-span-2" value="soulscapes">
              <span className="text-secondary">Soulscapes</span>
            </TabsTrigger>
            <TabsTrigger value="ideas">Ideas</TabsTrigger>
            <TabsTrigger value="journals">Journals</TabsTrigger>
            <TabsTrigger value="affirmations">Affirmations</TabsTrigger>
            <TabsTrigger value="mockups">Mockups</TabsTrigger>
          </TabsList>
          <TabsContent value="soulscapes"></TabsContent>
          <TabsContent value="journals">
            <Container className="lg:mx-20">
              <div className="grid grid-cols-2 justify-items-center gap-3 sm:grid-cols-3">
                <div className="flex flex-col items-center gap-1">
                  <IoMdJournal size={60} className="text-pink-300" />
                  <span>Name</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <IoMdJournal size={60} className="text-accent" />
                  <span>Name</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <IoMdJournal size={60} className="text-accent" />
                  <span>Name</span>
                </div>
                <Container className="hover:bg-background/30 flex aspect-square cursor-pointer items-center transition duration-300">
                  <h2 className="mx-auto">+</h2>
                </Container>
              </div>
            </Container>
          </TabsContent>
          <TabsContent value="affirmations"></TabsContent>
        </Tabs>
      </section>
      {/* <section className="grid grid-cols-2 gap-1 lg:mx-20">
        <Container className="col-span-2 p-3">
          <h2>soulscapes</h2>
        </Container>

        <Container className="flex flex-col gap-3">
          <Link href="dashboard/journal">
            <h2>Journals</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 justify-items-center">
              <div className="flex items-center flex-col gap-1">
                <IoMdJournal size={60} className="text-pink-300" />
                <span>Name</span>
              </div>
              <div className="flex items-center flex-col gap-1">
                <IoMdJournal size={60} className="text-accent" />
                <span>Name</span>
              </div>
              <div className="flex items-center flex-col gap-1">
                <IoMdJournal size={60} className="text-accent" />
                <span>Name</span>
              </div>
            </div>
          </Link>
        </Container>

        <Container>
          <Link href="dashboard/affirmations">
            <h2>Affirmations</h2>
          </Link>
        </Container>

        <Container>
          <Link href="dashboard/mockup-studio">
            <h2>Mockup Studio</h2>
          </Link>
        </Container>

        <Container className="flex items-center hover:bg-background/30 transition duration-300 cursor-pointer">
          <h2 className="mx-auto">+</h2>
        </Container>
      </section> */}
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
