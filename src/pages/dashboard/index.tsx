import Container from "@/components/ui/Container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUser } from "@/contexts/userContext";
import { createClient as createComponentClient } from "@/utils/supabase/component";
import { createClient } from "@/utils/supabase/server-props";
import "@rc-component/color-picker/assets/index.css";
import type { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import { RxDotsHorizontal } from "react-icons/rx";
import Searchbar from "@/components/ui/Searchbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useThemeContext } from "@/contexts/themeContext";
import {
  deleteRow,
  fetchRows,
  insertRow,
  updateRow,
} from "@/utils/auth/fetchData";
import { dateFormatter } from "@/utils/dateFormatter";
import clsx from "clsx";
import Link from "next/link";
import { GoCheck } from "react-icons/go";
import { IoMdJournal } from "react-icons/io";
import { IoAdd, IoCloseOutline } from "react-icons/io5";

interface Entry {
  id?: string;
  title: string;
  created_at?: string;
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
  const [dialog, setDialog] = useState({
    open: false,
    item: null,
    warning: "",
    function: () => {},
  });
  const [journals, setJournals] = useState<Journal[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingJournalId, setEditingJournalId] = useState<number | null>(null);
  const [editingEntryId, setEditingEntryId] = useState<number | null>(null);
  const [newJournal, setNewJournal] = useState<Journal>({
    color: "var(--accent)",
    title: "Journal",
  });
  const [newEntry, setNewEntry] = useState<Entry>({
    title: "Entry",
  });
  const [editedJournal, setEditedJournal] = useState<Journal | object>({});
  const [editedEntry, setEditedEntry] = useState<Journal | object>({});
  const colors = [
    "var(--accent)",
    "#b64754",
    "#802dce",
    "#da8550",
    "#d895d1",
    "#9cd1f4",
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
      },
      setJournals,
    );
    setIsAdding(false);
  };

  const handleAddEntry = (journalId) => {
    insertRow(
      "journal_entries",
      supabase,
      {
        user_id: user?.id,
        title: newEntry.title,
        journal_id: journalId,
        content: [
          {
            id: "ab2ccde4-14b0-43d3-b834-5711a5a80473",
            type: "paragraph",
            props: {
              textColor: "default",
              backgroundColor: "default",
              textAlignment: "left",
            },
            content: [
              {
                type: "text",
                text: "and me",
                styles: {},
              },
            ],
            children: [],
          },
          {
            id: "304e1da9-56af-4b64-b2db-f3ae6f6218a3",
            type: "paragraph",
            props: {
              textColor: "default",
              backgroundColor: "default",
              textAlignment: "left",
            },
            content: [],
            children: [],
          },
        ],
      },
      setEntries,
    );
    setIsAdding(false);
    // TODO: revalidate(), optimistic update
    // router.push(`/dashboard/journal/${journalId}/${data?.id}`);
  };

  const handleUpdateJournal = (journal: object) => {
    updateRow("journals", journal.id, supabase, {
      title: editedJournal.title,
      color: editedJournal.color,
    });
    setEditingJournalId(null);
    setEditedJournal({});
  };
  const handleUpdateEntry = (entry: object) => {
    updateRow("journal_entries", entry.id, supabase, {
      title: editedEntry.title,
      created_at: editedEntry.created_at,
    });
    setEditingEntryId(null);
    setEditedEntry({});
  };

  const handleDeleteJournal = (journalId: string) => {
    deleteRow("journals", journalId, supabase);
  };

  const handleDeleteEntry = (entryId: string) => {
    deleteRow("journal_entries", entryId, supabase);
  };

  useEffect(() => {
    fetchRows("journals", supabase, setJournals);
    fetchRows("journal_entries", supabase, setEntries);
  }, [user, journals, supabase]);

  return (
    <>
      <div className="my-6 flex w-full flex-col items-center">
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

      <section className="relative">
        {dialog.open ? (
          <div className="bg-mask/40 fixed inset-0 z-50 flex flex-col items-center justify-center gap-1 text-center backdrop-blur-md">
            <h3> Are you sure?</h3>
            <p>{dialog.warning}</p>
            <div className="mt-2 flex justify-center gap-2">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  dialog.function(dialog.item.id);
                  setDialog({ open: false, item: null });
                }}
                variant={"destructive"}
              >
                Delete
              </Button>
              <Button onClick={() => setDialog({ open: false, item: null })}>
                Cancel
              </Button>
            </div>
          </div>
        ) : null}
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
                    value={
                      editingJournalId !== null ? null : journalIndex.toString()
                    }
                  >
                    {editingJournalId === journalIndex ? (
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex w-full items-center gap-1">
                          <Popover>
                            <PopoverTrigger className="cursor-pointer">
                              <IoMdJournal
                                size={24}
                                style={{ color: editedJournal.color }}
                                className="transition duration-300"
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
                          onClick={() => handleUpdateJournal(journal)}
                        >
                          <GoCheck />
                        </button>
                        <button
                          type="button"
                          className="text-muted-foreground hover:bg-muted/10 my-1 cursor-pointer rounded-sm px-2 py-2 transition duration-300"
                          onClick={() => {
                            setEditingJournalId(null);
                            setEditedJournal({
                              color: journal.color,
                              title: journal.title,
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

                            {editingJournalId !== null ? null : (
                              <>
                                {/* <Dialog>
                                  <ContextMenu>
                                    <ContextMenuTrigger className="ml-1 flex cursor-pointer items-center gap-2">
                                      <RxDotsHorizontal size={15} />
                                    </ContextMenuTrigger>
                                    <ContextMenuContent className="mx-content min-w-36">
                                      <ContextMenuLabel>
                                        Journal settings
                                      </ContextMenuLabel>
                                      <ContextMenuItem  onClick={() => {
                                        setEditedJournal({
                                          title: journal.title,
                                          color: journal.color,
                                        });
                                        setEditingJournalId(journalIndex);
                                      }}>Edit</ContextMenuItem>
                                      <ContextMenuItem>
                                        Download
                                      </ContextMenuItem>
                                      <DialogTrigger asChild>
                                        <ContextMenuItem>
                                          <span>Delete</span>
                                        </ContextMenuItem>
                                      </DialogTrigger>
                                    </ContextMenuContent>
                                  </ContextMenu>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>
                                        Are you absolutely sure?
                                      </DialogTitle>
                                      <DialogDescription>
                                        This action cannot be undone. Are you
                                        sure you want to permanently delete this
                                        file from our servers?
                                      </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                      <Button type="submit">Confirm</Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog> */}

                                <DropdownMenu>
                                  <DropdownMenuTrigger className="ml-1 flex cursor-pointer items-center gap-2">
                                    <RxDotsHorizontal size={15} />
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="mx-content min-w-36">
                                    <DropdownMenuLabel>
                                      Journal settings
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditedJournal({
                                          title: journal.title,
                                          color: journal.color,
                                        });
                                        setEditingJournalId(journalIndex);
                                      }}
                                    >
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setDialog({
                                          open: true,
                                          warning:
                                            "Deleting a journal will also delete all of its entries.",
                                          function: handleDeleteJournal,
                                          item: journal,
                                        });
                                      }}
                                    >
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Dialog>
                            <DialogTrigger className="w-full">
                              <button className="text-muted-foreground hover:bg-background/20 flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-2 pr-4 italic transition duration-300">
                                <IoAdd />
                                Add entry
                              </button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add new entry</DialogTitle>
                                <DialogDescription>
                                  Choose a template:
                                </DialogDescription>
                              </DialogHeader>
                              <Button
                                variant={"secondary"}
                                onClick={() => {
                                  handleAddEntry(journal.id);
                                }}
                              >
                                Add
                              </Button>
                            </DialogContent>
                          </Dialog>

                          {entries
                            .filter((e) => e.journal_id === journal.id)
                            .map((entry, entryIndex) =>
                              editingEntryId === entryIndex ? (
                                <div
                                  key={entryIndex}
                                  className="mx-2 flex items-center gap-2"
                                >
                                  <input
                                    className="w-full text-sm focus:outline-0"
                                    placeholder="Type in entry title"
                                    onChange={(e) => {
                                      setEditedEntry((prev) => ({
                                        ...prev,
                                        title: e.target.value,
                                      }));
                                    }}
                                  />
                                  <button
                                    className="text-muted-foreground hover:bg-muted/10 my-1 cursor-pointer rounded-sm px-2 py-2 transition duration-300"
                                    type="button"
                                    onClick={() => handleUpdateEntry(entry)}
                                  >
                                    <GoCheck />
                                  </button>
                                  <button
                                    type="button"
                                    className="text-muted-foreground hover:bg-muted/10 my-1 cursor-pointer rounded-sm px-2 py-2 transition duration-300"
                                    onClick={() => {
                                      setEditingEntryId(null);
                                      setEditedEntry({
                                        title: entry.title,
                                        created_at: entry.created_at,
                                      });
                                    }}
                                  >
                                    <IoCloseOutline />
                                  </button>
                                </div>
                              ) : (
                                <Link
                                  href={`/dashboard/journal/${journal.id}/${entry.id}`}
                                  key={entryIndex}
                                  className="group hover:bg-background/20 flex cursor-pointer items-start justify-between gap-3 rounded-md p-2 transition duration-300"
                                >
                                  <div className="flex items-start gap-1">
                                    <span>{entry.title}</span>
                                    {editingJournalId !== null ? null : (
                                      <DropdownMenu>
                                        <DropdownMenuTrigger className="group-hover:text-foreground flex h-full cursor-pointer items-center gap-2 px-2 pt-0.5 text-transparent transition duration-300">
                                          <RxDotsHorizontal size={15} />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="mx-content min-w-36">
                                          <DropdownMenuLabel>
                                            <div className="flex items-center gap-2">
                                              <span>Entry settings</span>
                                            </div>
                                          </DropdownMenuLabel>
                                          <DropdownMenuItem
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setEditedEntry({
                                                title: entry.title,
                                                created_at: entry.created_at,
                                              });
                                              setEditingEntryId(entryIndex);
                                            }}
                                          >
                                            <span>Edit</span>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleDeleteEntry(entry.id);
                                            }}
                                          >
                                            <span>Delete</span>
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    )}
                                  </div>
                                  <span className="text-right whitespace-nowrap">
                                    {dateFormatter(entry.created_at)}
                                  </span>
                                </Link>
                              ),
                            )}
                          {/* {entries.filter((e) => e.journal_id === journal.id)
                            .length === 0 && (
                            <div className="text-muted-foreground ml-2 text-sm">
                              No entries yet.
                            </div>
                          )} */}
                        </AccordionContent>
                      </>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
              {isAdding ? (
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
                      setIsAdding(false);
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
                  onClick={() => setIsAdding(true)}
                >
                  <IoAdd />
                  Add journal
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
