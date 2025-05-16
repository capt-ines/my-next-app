import React from "react";
import { dateFormatter } from "@/utils/dateFormatter";
import {
  updateRow,
  fetchSingleRow,
  fetchSpecificRows,
  insertRow,
  deleteRow,
} from "@/utils/auth/fetchData";
import { IoAdd } from "react-icons/io5";
import { motion } from "framer-motion";
import { PiSpiralFill } from "react-icons/pi";
import { useRouter } from "next/router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { RxDragHandleVertical } from "react-icons/rx";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/component";
import dynamic from "next/dynamic";
import { createClient as createComponentClient } from "@/utils/supabase/component";
import Link from "next/link";
import { PiPencilSimpleSlashThin } from "react-icons/pi";
import { PiPencilSimpleThin } from "react-icons/pi";
import { Checkbox } from "@/components/ui/checkbox";
import { RxDotsHorizontal } from "react-icons/rx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { IoMdJournal } from "react-icons/io";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useUser } from "@/contexts/userContext";
import Container from "@/components/ui/Container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import { today } from "@/utils/today";
interface Journal {
  color: string;
  title: string;
  id?: string;
}
const Journals = () => {
  const supabase = createComponentClient();
  const { user } = useUser();
  const router = useRouter();
  const { journalId } = router.query;
  const [entries, setEntries] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [journal, setJournal] = useState<Journal>({ title: "", color: "" });
  const [editedJournal, setEditedJournal] = useState<Journal>({
    color: journal.color,
    title: journal.title,
  });

  const handleUpdateJournal = (journalId: string) => {
    setIsEditing(true);
    updateRow("journals", journalId, supabase, {
      title: editedJournal.title,
      color: editedJournal.color,
    });
    setIsEditing(false);
  };

  const [processedEntries, setProcessedEntries] = useState([]);

  useEffect(() => {
    if (!journalId) return;

    fetchSingleRow("journals", supabase, setJournal, journalId);
    fetchSpecificRows(
      "journal_entries",
      supabase,
      setEntries,
      "journal_id",
      journalId,
    );
  }, [journalId, supabase]);

  useEffect(() => {
    if (!entries?.length) return;
    const processed = entries.map((entry) => {
      const allTexts = extractTexts(entry.content);
      const title = allTexts[0] || "";
      const text = allTexts.slice(1);

      return {
        ...entry,
        title,
        text,
      };
    });

    setProcessedEntries(processed);
  }, [entries]);

  const handleAddEntry = async () => {
    const { data, error } = await supabase
      .from("journal_entries")
      .insert([
        {
          user_id: user?.id,
          title: "New entry",
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
                  text: "Text",
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
      ])
      .select("id")
      .single();
    if (error) {
      console.error("Error adding entry:", error);
      return;
    }
    router.push(`/dashboard/journal/${journalId}/${data?.id}`);
  };

  const handleDeleteEntry = (entryId: string) => {
    deleteRow("journal_entries", entryId, supabase);
  };

  function extractTexts(content) {
    const result = [];

    function traverse(node) {
      if (Array.isArray(node)) {
        node.forEach(traverse);
      }

      // If it's an object, check its keys
      else if (typeof node === "object" && node !== null) {
        if (node.type === "text" && typeof node.text === "string") {
          result.push(node.text);
        }

        // Traverse "content" and "children" keys if present
        if (node.content) traverse(node.content);
        if (node.children) traverse(node.children);
      }
    }

    traverse(content);
    return result;
  }

  // entry.content.find((item) => item.type !== "heading")
  //   ?.content[0]?.text || "Write something..."

  const handleDeleteJournal = () => {
    // TODO: dialog window
    deleteRow("journals", journalId, supabase);
    router.push(`/dashboard`);
  };

  // <PiSpiralFill
  //   size={40}
  //   className={`absolute -translate-x-3 top-1/2 left-1/2 text-muted-foreground/80 animate-spin`}
  // />
  return (
    <motion.section
      className="mx-4.5 mb-10 text-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <Container className="mx-auto flex max-w-xl flex-col">
        <div className="mx-4.5 my-2 mb-4 flex justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/">Profile</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Journal</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2">
              <RxDotsHorizontal size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mx-content min-w-36">
              <DropdownMenuLabel>
                <div className="flex items-center gap-2">
                  <span>Journal</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuItem className="">
                <div
                  onClick={() => setIsEditing((prev) => !prev)}
                  className="flex items-center gap-2"
                >
                  <span>Edit</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>
                <div className="flex items-center gap-2">
                  <span>Entries</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuItem className="">
                <div
                  onClick={() => setIsEditing((prev) => !prev)}
                  className="flex items-center gap-2"
                >
                  <span>Delete selected entries</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="">
                <Link
                  href="/dashboard/settings/details"
                  className="flex items-center gap-2"
                >
                  <span>Move selected entries</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDeleteJournal}>
                <span>Delete journal</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-col items-end">
          <div className="w-full">
            {isEditing ? (
              <div className="mx-auto mt-2 mb-4 flex max-w-xs flex-col gap-1">
                <Input
                  value={journal.title}
                  className="text-center font-serif text-3xl uppercase md:text-3xl"
                ></Input>
                <Button variant={"outline"}>Save</Button>
                <Button
                  onClick={() => {
                    setIsEditing(false);
                  }}
                  variant={"outline"}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <h1 className="pb-3 font-serif uppercase">{journal.title}</h1>
            )}
          </div>
          {isEditing && (
            <div className="text-muted-foreground/80 mr-4.5 mb-2 flex items-center gap-2 text-xs">
              <span>Select all</span>
              <Checkbox className="" />
            </div>
          )}
        </div>

        <Button
          onClick={() => {
            handleAddEntry();
          }}
          variant={"ghost"}
          className="hover:bg-muted/20 flex cursor-pointer items-center justify-center border-0 py-8 transition duration-300"
        >
          <IoAdd />
        </Button>

        <hr className="text-muted-foreground/50" />
        {processedEntries.map((entry, id) => (
          <>
            <div
              className="hover:bg-background/10 rounded-md px-4.5 py-3 transition duration-300 hover:cursor-pointer"
              key={id}
            >
              <div className="flex items-start justify-between">
                <Link
                  className="flex w-full flex-col items-start text-left"
                  href={`/dashboard/journal/${journalId}/${entry.id}`}
                >
                  <span className="max-w-full text-sm wrap-break-word">
                    {entry.title}
                  </span>
                  <span className="mt-1 text-[10px] sm:text-xs">
                    {dateFormatter(entry.created_at, "long")}
                  </span>
                </Link>
                {isEditing ? (
                  <Checkbox className="pl-5" />
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2 pl-5">
                      <RxDotsHorizontal size={20} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mx-content min-w-36">
                      <DropdownMenuItem className="">Move</DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => handleDeleteEntry(entry.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              <Link
                className="w-full"
                href={`/dashboard/journal/${journalId}/${entry.id}`}
              >
                <div>
                  <div className="max-h-25 overflow-hidden text-justify">
                    <span className="text-foreground/60 text-xs wrap-break-word">
                      {entry.text.length < 1
                        ? "Write something..."
                        : entry.text}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            {id !== entries.length - 1 && (
              <hr className="text-muted-foreground/50" />
            )}
          </>
        ))}
      </Container>
    </motion.section>
  );
};

export default Journals;
