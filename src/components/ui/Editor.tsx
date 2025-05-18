import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { themesData } from "@/constants/themes";
import { useThemeContext } from "@/contexts/themeContext";
import { useUser } from "@/contexts/userContext";
import { dateFormatter } from "@/utils/dateFormatter";
import { createClient } from "@/utils/supabase/component";
import { truncate } from "@/utils/truncate";
import { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { en } from "@blocknote/core/locales";
import {
  BlockNoteView,
  darkDefaultTheme,
  lightDefaultTheme,
} from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  FormattingToolbarController,
  NestBlockButton,
  TextAlignButton,
  UnnestBlockButton,
  useCreateBlockNote,
} from "@blocknote/react";
import { useEffect, useState } from "react";
import ArrowButton from "./arrowButton";
import { Button } from "./button";

const Editor = ({
  entryId,
  journalId,
  isNew = false,
  initialContent,
}: {
  entryId?: string;
  journalId?: string;
  isNew?: boolean;
  initialContent?: any;
}) => {
  const supabase = createClient();
  const { user } = useUser();
  const locale = en;

  const journalTemplates = {
    journal: [
      {
        type: "heading",
        content: "",
      },
      {
        type: "paragraph",
        content: "",
        id: "entry-block",
        props: { textAlignment: "justify" },
      },
    ],
    gratitudeList: [
      {
        type: "heading",
        content: "Gratutude List",
      },
      {
        type: "paragraph",
        content: "Today I am grateful for:",
      },
      {
        type: "bulletListItem",
        content: "",
      },
      {
        type: "paragraph",
        content: "Three good things that happened today:",
      },
      {
        type: "numberedListItem",
        content: "",
      },
      {
        type: "numberedListItem",
        content: "",
      },
      {
        type: "numberedListItem",
        content: "",
      },
    ],
  };
  const [template, setTemplate] = useState(journalTemplates.journal);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [journal, setJournal] = useState({});
  const [entry, setEntry] = useState({});
  const { theme } = useThemeContext();
  const darkThemes = themesData.filter((theme) => theme.type === "dark");

  const editor = useCreateBlockNote({
    domAttributes: {
      block: {
        class: "blocknote-block",
      },
    },
    initialContent: isNew ? template : (initialContent ?? []),
    dictionary: {
      ...locale,
      placeholders: {
        ...locale.placeholders,
        emptyDocument: "What's on your mind?",
        bulletListItem: "",
        numberedListItem: "",
        default: "",
        heading: "Title",
        paragraph: "Write something...",
      },
    },
  });

  useEffect(() => {
    if (!journalId) return;
    const fetchJournal = async () => {
      const { data, error } = await supabase
        .from("journals")
        .select("*")
        .eq("id", journalId)
        .single();

      if (error) {
        console.error("Error fetching journal:", error);
      } else {
        setJournal(data);
      }
    };
    const fetchEntry = async () => {
      if (!entryId) return;
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("id", entryId)
        .single();

      if (error) {
        console.error("Error fetching entry:", error);
      } else {
        setEntry(data);
      }
    };

    fetchJournal();
    fetchEntry();
  }, [journalId, entryId, supabase]);

  useEffect(() => {}, [entry]);

  return (
    <>
      <div className="flex min-h-screen flex-col rounded-lg py-5">
        <div className="mx-8 md:mx-13.5">
          {/* <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/">Profile</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <BreadcrumbLink href={`/dashboard/journal/${journalId}`}>
                    {journal.title}
                  </BreadcrumbLink>
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{entry?.title || "New entry"}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}
          <div className="mt-3 flex items-center justify-between">
            <Link href={`/dashboard/journal/${journal.id}`}>
              <h1 className="text-muted-foreground font-serif text-lg uppercase hover:underline sm:text-xl">
                {journal.title}
              </h1>
            </Link>
            {/* <Button
              variant={"ghost"}
              onClick={async () => {
                const { error } = await supabase
                  .from("journal_entries")
                  .update({
                    content: blocks,
                    title:
                      blocks.find(
                        (item) =>
                          item.type === "heading" && item.content.length > 0,
                      )?.content[0].text ||
                      truncate(
                        blocks.find((item) => item.content.length > 0)
                          ?.content[0].text,
                        12,
                      ),
                  })
                  .eq("id", entryId);

                if (error) {
                  console.error("Update error:", error);
                } else {
                  console.log("Journal entry updated!");
                }
              }}
            >
              Save
            </Button> */}
            {/* TODO: save on change and debounce */}
          </div>
          <h2 className="text-muted-foreground/70 text-sm">
            {dateFormatter(entry.created_at, "long")}
          </h2>
          <hr className="text-muted-foreground/20 my-5" />
        </div>
        <BlockNoteView
          className="z-30"
          data-bn-font
          theme={
            darkThemes.some((darkTheme) => darkTheme.key === theme)
              ? darkDefaultTheme
              : lightDefaultTheme
          }
          editor={editor}
          formattingToolbar={false}
          onChange={() => {
            setBlocks(editor.document);
          }}
        >
          <FormattingToolbarController
            formattingToolbar={() => (
              <FormattingToolbar>
                <BlockTypeSelect key={"blockTypeSelect"} />
                <FileCaptionButton key={"fileCaptionButton"} />
                <FileReplaceButton key={"replaceFileButton"} />

                <BasicTextStyleButton
                  basicTextStyle={"bold"}
                  key={"boldStyleButton"}
                />
                <BasicTextStyleButton
                  basicTextStyle={"italic"}
                  key={"italicStyleButton"}
                />
                <BasicTextStyleButton
                  basicTextStyle={"underline"}
                  key={"underlineStyleButton"}
                />
                <BasicTextStyleButton
                  basicTextStyle={"strike"}
                  key={"strikeStyleButton"}
                />
                <TextAlignButton
                  textAlignment={"justify"}
                  key={"textAlignJustifyButton"}
                />
                <TextAlignButton
                  textAlignment={"left"}
                  key={"textAlignLeftButton"}
                />
                <TextAlignButton
                  textAlignment={"center"}
                  key={"textAlignCenterButton"}
                />
                <TextAlignButton
                  textAlignment={"right"}
                  key={"textAlignRightButton"}
                />
                <ColorStyleButton key={"colorStyleButton"} />

                <NestBlockButton key={"nestBlockButton"} />
                <UnnestBlockButton key={"unnestBlockButton"} />

                <CreateLinkButton key={"createLinkButton"} />
              </FormattingToolbar>
            )}
          ></FormattingToolbarController>
        </BlockNoteView>
        <div className="my-10 flex w-full items-center justify-end pl-4.5 text-sm md:pr-4.5">
          <ArrowButton text="Next entry" direction="right" />
        </div>
      </div>
    </>
  );
};

export default Editor;
