import React, { useEffect, useState } from "react";
import { RxDotsHorizontal } from "react-icons/rx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import Searchbar from "@/components/ui/Searchbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  deleteRow,
  updateRow,
  fetchRows,
  insertRow,
} from "@/utils/auth/fetchData";
import { GoCheck } from "react-icons/go";
interface Entry {
  id: string;
  title: string;
  created_at: string;
  journal_id?: string;
}
interface Journal {
  color: string;
  title: string;
  id?: string;
}

const Dashboard = () => {
  const { username, user } = useUser();
  const { theme } = useThemeContext();
  const supabase = createComponentClient();
  const [journals, setJournals] = useState<Journal[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isAddingJournal, setIsAddingJournal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newJournal, setNewJournal] = useState<Journal>({
    color: "--var(color-foreground)",
    title: "Journal",
  });
  const [editedJournal, setEditedJournal] = useState<Journal>({
    color: "--var(color-foreground)",
    title: "Journal",
  });
  const colors = [
    "#b64754",
    "#802dce",
    "#da8550",
    "#d895d1",
    "#9cd1f4",
    "#e9f2c3",
    "#4c7265",
    "#353535",
    "#efefef",
    "#2d51bb",
  ];

  const handleAddJournal = () => {
    insertRow(
      "journals",
      supabase,
      {
        user_id: user?.id,
        title: newJournal.title,
        color: newJournal.color,
        created_at: new Date(),
      },
      setJournals,
    );
    setIsAddingJournal(false);
  };

  const handleUpdateJournal = (journalId: string) => {
    updateRow("journals", journalId, supabase, {
      title: editedJournal.title,
      color: editedJournal.color,
    });
    setEditingId(null);
  };

  const handleDeleteJournal = (journalId: string) => {
    // TODO: dialog window
    deleteRow("journals", journalId, supabase);
  };

  useEffect(() => {
    fetchRows("journals", supabase, setJournals);
    fetchRows("journal_entries", supabase, setEntries);
  }, [user, journals, supabase]);

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
                {journals.map((journal, journalIndex) => (
                  <AccordionItem
                    key={journalIndex}
                    value={editingId !== null ? null : journalIndex.toString()}
                  >
                    {editingId === journalIndex ? (
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex w-full items-center gap-1">
                          <Popover>
                            <PopoverTrigger className="cursor-pointer">
                              <IoMdJournal
                                size={24}
                                style={{ color: editedJournal.color }}
                                className="text-accent transition duration-300"
                              />
                            </PopoverTrigger>
                            {/* <PopoverContent>
                        <ColorPicker />
                      </PopoverContent> */}
                            <PopoverContent className="grid grid-flow-col grid-rows-2 items-center justify-center gap-4">
                              {colors.map((color, index) => (
                                <div
                                  key={index}
                                  onClick={() =>
                                    setEditedJournal((prev) => ({
                                      ...prev,
                                      color: color,
                                    }))
                                  }
                                  className={`h-4 w-4 cursor-pointer transition duration-300 hover:scale-110`}
                                  style={{ backgroundColor: color }}
                                ></div>
                              ))}
                            </PopoverContent>
                          </Popover>
                          <input
                            className="w-full text-sm focus:outline-0"
                            placeholder="Type in journal title"
                            onChange={(e) => {
                              setEditedJournal((prev) => ({
                                ...prev,
                                title: e.target.value,
                              }));
                            }}
                          />
                        </div>
                        <button
                          className="text-muted-foreground hover:bg-muted/10 my-1 cursor-pointer rounded-sm px-2 py-2 transition duration-300"
                          type="button"
                          onClick={() => handleUpdateJournal(journal.id)}
                        >
                          <GoCheck />
                        </button>
                        <button
                          type="button"
                          className="text-muted-foreground hover:bg-muted/10 my-1 cursor-pointer rounded-sm px-2 py-2 transition duration-300"
                          onClick={() => {
                            setEditingId(null);
                            setEditedJournal({
                              color: "",
                              title: "Journal",
                            });
                          }}
                        >
                          <IoCloseOutline />
                        </button>
                      </div>
                    ) : (
                      <>
                        <AccordionTrigger>
                          <div className="flex gap-2">
                            <Link
                              className="flex items-center gap-1 duration-400 hover:scale-102 hover:cursor-pointer"
                              href={`dashboard/journal/${journal.id}`}
                            >
                              <IoMdJournal
                                size={24}
                                className="text-accent"
                                style={{ color: journal.color }}
                              />

                              <span>{journal.title}</span>
                            </Link>

                            {editingId !== null ? null : (
                              <DropdownMenu>
                                <DropdownMenuTrigger className="ml-1 flex cursor-pointer items-center gap-2">
                                  <RxDotsHorizontal size={15} />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="mx-content min-w-36">
                                  <DropdownMenuLabel>
                                    <div className="flex items-center gap-2">
                                      <span>Journal settings</span>
                                    </div>
                                  </DropdownMenuLabel>
                                  <DropdownMenuItem
                                    onClick={() => setEditingId(journalIndex)}
                                  >
                                    <span>Edit</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleDeleteJournal(journal.id)
                                    }
                                  >
                                    <span>Delete</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {entries
                            .filter((e) => e.journal_id === journal.id)
                            .map((entry, entryIndex) => (
                              <div
                                key={entryIndex}
                                className="hover:bg-background/20 flex cursor-pointer items-center justify-between gap-3 rounded-md p-2 transition duration-300"
                              >
                                <span>{entry.title}</span>
                                <span>
                                  {truncate(entry.created_at, 10, false)}
                                </span>
                              </div>
                            ))}
                          {entries.filter((e) => e.journal_id === journal.id)
                            .length === 0 && (
                            <div className="text-muted-foreground ml-2 text-sm">
                              No entries yet.
                            </div>
                          )}
                        </AccordionContent>
                      </>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
              {isAddingJournal ? (
                <div className="flex items-center justify-between pt-2">
                  <div className="flex w-full items-center gap-1">
                    <Popover>
                      <PopoverTrigger className="cursor-pointer">
                        <IoMdJournal
                          size={24}
                          style={{ color: newJournal.color }}
                          className="text-accent transition duration-300"
                        />
                      </PopoverTrigger>
                      {/* <PopoverContent>
                        <ColorPicker />
                      </PopoverContent> */}
                      <PopoverContent className="grid grid-flow-col grid-rows-2 items-center justify-center gap-4">
                        {colors.map((color, index) => (
                          <div
                            key={index}
                            onClick={() =>
                              setNewJournal((prev) => ({
                                ...prev,
                                color: color,
                              }))
                            }
                            className={`h-4 w-4 cursor-pointer transition duration-300 hover:scale-110`}
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </PopoverContent>
                    </Popover>
                    <input
                      className="w-full text-sm focus:outline-0"
                      placeholder="Type in journal title"
                      onChange={(e) => {
                        setNewJournal((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }));
                      }}
                    />
                  </div>
                  <button
                    className="text-muted-foreground hover:bg-muted/10 my-1 cursor-pointer rounded-sm px-2 py-2 transition duration-300"
                    type="submit"
                    onClick={handleAddJournal}
                  >
                    <IoAdd />
                  </button>
                  <button
                    type="button"
                    className="text-muted-foreground hover:bg-muted/10 my-1 cursor-pointer rounded-sm px-2 py-2 transition duration-300"
                    onClick={() => {
                      setIsAddingJournal(false);
                      setNewJournal({
                        color: "",
                        title: "Journal",
                      });
                    }}
                  >
                    <IoCloseOutline />
                  </button>
                </div>
              ) : (
                <Button
                  variant={"ghost"}
                  className="mt-3 h-9 w-full"
                  onClick={() => setIsAddingJournal(true)}
                >
                  <IoAdd />
                </Button>
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
