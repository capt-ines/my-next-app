import React, { useEffect, useState } from "react";
import ColorPicker from "@rc-component/color-picker";
import "@rc-component/color-picker/assets/index.css";
import type { GetServerSidePropsContext } from "next";
import { createClient } from "@/utils/supabase/server-props";
import { createClient as createComponentClient } from "@/utils/supabase/component";
import { useUser } from "@/contexts/userContext";
import Container from "@/components/ui/Container";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { truncate } from "@/utils/truncate";
import { IoAdd } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { useThemeContext } from "@/contexts/themeContext";
import { IoMdJournal } from "react-icons/io";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import Searchbar from "@/components/ui/Searchbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { set } from "react-hook-form";

const Dashboard = () => {
  const { username, user } = useUser();
  const router = useRouter();
  const { theme } = useThemeContext();
  const supabase = createComponentClient();
  const [journalTitle, setJournalTitle] = useState("Journal");
  const [journalColor, setJournalColor] = useState("");
  const [journals, setJournals] = useState([]);

  const addJournal = async () => {
    const { data, error } = await supabase.from("journals").insert({
      user_id: user?.id,
      title: journalTitle,
      color: journalColor,
      created_at: new Date(),
    });

    if (error) {
      console.error("Error adding journal:", error);
    } else if (data) {
      setJournals((prevJournals) => [...prevJournals, ...data]);
      //TODO: add loading while journal is being created?
    }
  };

  const [isAddingJournal, setIsAddingJournal] = useState(false);
  const handleAddJournal = () => {
    addJournal();
    setIsAddingJournal(false);
  };
  useEffect(() => {
    if (!user) return;

    const fetchJournals = async () => {
      const { data, error } = await supabase.from("journals").select("*");

      if (error) {
        console.error("Error fetching entry:", error);
      } else {
        setJournals(data);
        console.log(data);
      }
    };
    fetchJournals();
  }, [user]);

  // const entryContent = truncate(entry.content, 30);

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
            <Container className="mx-auto max-w-sm">
              <Searchbar placeholder="Search for entry or word" />

              <Accordion type="single" collapsible>
                {journals.map((journal) => (
                  <AccordionItem key={journal.id} value={journal.id}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-1">
                        <IoMdJournal
                          size={24}
                          className="text-accent"
                          style={{ color: journal.color }}
                        />
                        {journal.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-center gap-3">
                        <span>{journal.created_at}</span>
                        <div className="flex flex-col">
                          {/* <span>entry.title</span>
                        <span>truncate(entry.content, 30)</span> */}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <hr />
              {isAddingJournal ? (
                <div className="flex items-center justify-between py-1">
                  <div className="flex w-full items-center gap-1">
                    <Popover>
                      <PopoverTrigger className="cursor-pointer">
                        <IoMdJournal
                          size={24}
                          style={{ color: journalColor }}
                          className="text-accent"
                        />
                      </PopoverTrigger>
                      {/* <PopoverContent>
                        <ColorPicker />
                      </PopoverContent> */}
                      <PopoverContent className="grid grid-flow-col grid-rows-2 items-center justify-center gap-4">
                        <div
                          onClick={() => setJournalColor("")}
                          className="bg-accent h-4 w-4 cursor-pointer"
                        ></div>
                        <div
                          onClick={() => setJournalColor("#87CEFA")}
                          className="h-4 w-4 cursor-pointer transition duration-300 hover:scale-110"
                          style={{ backgroundColor: "#87CEFA" }}
                        ></div>
                        <div
                          onClick={() => setJournalColor("#ADFF2F")}
                          className="h-4 w-4 cursor-pointer transition duration-300 hover:scale-110"
                          style={{ backgroundColor: "#ADFF2F" }}
                        ></div>
                        <div
                          onClick={() => setJournalColor("#FF69B4")}
                          className="h-4 w-4 cursor-pointer transition duration-300 hover:scale-110"
                          style={{ backgroundColor: "#FF69B4" }}
                        ></div>
                        <div
                          onClick={() => setJournalColor("#FFFACD")}
                          className="h-4 w-4 cursor-pointer transition duration-300 hover:scale-110"
                          style={{ backgroundColor: "#FFFACD" }}
                        ></div>
                        <div
                          onClick={() => setJournalColor("#FFA07A")}
                          className="h-4 w-4 cursor-pointer transition duration-300 hover:scale-110"
                          style={{ backgroundColor: "#FFA07A" }}
                        ></div>
                        <div
                          onClick={() => setJournalColor("#8A2BE2")}
                          className="h-4 w-4 cursor-pointer transition duration-300 hover:scale-110"
                          style={{ backgroundColor: "#8A2BE2" }}
                        ></div>
                        <div
                          onClick={() => setJournalColor("#5F9EA0")}
                          className="h-4 w-4 cursor-pointer transition duration-300 hover:scale-110"
                          style={{ backgroundColor: "#5F9EA0" }}
                        ></div>
                        <div
                          onClick={() => setJournalColor("#FFD700")}
                          className="h-4 w-4 cursor-pointer transition duration-300 hover:scale-110"
                          style={{ backgroundColor: "#FFD700" }}
                        ></div>
                        <div
                          onClick={() => setJournalColor("#DC143C")}
                          className="h-4 w-4 cursor-pointer transition duration-300 hover:scale-110"
                          style={{ backgroundColor: "#DC143C" }}
                        ></div>
                        <div
                          onClick={() => setJournalColor("#ffffff")}
                          className="h-4 w-4 cursor-pointer transition duration-300 hover:scale-110"
                          style={{ backgroundColor: "#ffffff" }}
                        ></div>
                        <div
                          onClick={() => setJournalColor("#00CED1")}
                          className="h-4 w-4 cursor-pointer transition duration-300 hover:scale-110"
                          style={{ backgroundColor: "#00CED1" }}
                        ></div>
                        <div
                          onClick={() => setJournalColor("#FF4500")}
                          className="h-4 w-4 cursor-pointer transition duration-300 hover:scale-110"
                          style={{ backgroundColor: "#FF4500" }}
                        ></div>
                        <div
                          onClick={() => setJournalColor("#1e2020")}
                          className="h-4 w-4 cursor-pointer transition duration-300 hover:scale-110"
                          style={{ backgroundColor: "#1e2020" }}
                        ></div>
                      </PopoverContent>
                    </Popover>
                    <input
                      className="w-full text-sm focus:outline-0"
                      placeholder="Type in journal title"
                      onChange={(e) => {
                        setJournalTitle(e.target.value);
                      }}
                    />
                  </div>
                  <button
                    className="text-muted-foreground cursor-pointer px-2 py-3"
                    type="submit"
                    onClick={handleAddJournal}
                  >
                    <IoAdd />
                  </button>
                  <button
                    type="button"
                    className="text-muted-foreground cursor-pointer py-3 pr-1 pl-2"
                    onClick={() => setIsAddingJournal(false)}
                  >
                    <IoCloseOutline />
                  </button>
                </div>
              ) : (
                <Container className="mt-3 h-9 py-0 pr-0 pb-0 pl-0">
                  <button
                    className="flex h-full w-full cursor-pointer items-center justify-center"
                    onClick={() => setIsAddingJournal(true)}
                  >
                    <IoAdd />
                  </button>
                </Container>
              )}
            </Container>
          </TabsContent>
          <TabsContent value="affirmations"></TabsContent>
        </Tabs>
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
