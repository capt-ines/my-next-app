import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { Block } from "@blocknote/core";
import { en } from "@blocknote/core/locales";
import { themesData } from "@/constants/themes";
import { useThemeContext } from "@/contexts/themeContext";
import { useEffect, useState } from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { createClient } from "@/utils/supabase/component";
import {
  BlockNoteView,
  Theme,
  darkDefaultTheme,
  lightDefaultTheme,
} from "@blocknote/mantine";
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
} from "@blocknote/react";
import { Button } from "./button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useUser } from "@/contexts/userContext";
import ArrowButton from "./arrowButton";

const Editor = ({
  entryId,
  isNew = false,
  initialContent,
}: {
  entryId?: any;
  isNew?: boolean;
  initialContent?: any;
}) => {
  const supabase = createClient();
  const { user } = useUser();
  const locale = en;
  const options = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const today = new Date();

  const journalTemplates = {
    journal: [
      {
        type: "paragraph",
        content: today.toLocaleDateString("en-US", options),
        props: { textColor: "gray" },
      },
      {
        type: "heading",
        content: "Title",
      },
      {
        type: "paragraph",
        content:
          "Think feelingly only of the state you desire to realize. Feeling the reality of the state sought and living and acting on that conviction (the conviction that it is done) is the way of all seeming miracles. All changes of expression are brought about through a change of feeling. A change of feeling is a change of destiny.",
        id: "entry-block",
        props: { textAlignment: "justify" },
      },
    ],
    gratitudeList: [
      {
        type: "paragraph",
        content: today.toLocaleDateString("en-US", options),
        props: { textColor: "gray" },
      },
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
      },
    },
  });

  return (
    <>
      <div className="flex min-h-screen flex-col rounded-md py-5">
        <div className="mx-4.5 mb-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Journals</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Reflections</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Title</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="my-3 flex items-center justify-between">
            <h1 className="font-serif text-lg uppercase sm:text-xl">
              Reflections
            </h1>
            <Button
              variant={"ghost"}
              onClick={async () => {
                if (isNew) {
                  const { error } = await supabase
                    .from("journal_entries")
                    .insert([
                      {
                        user_id: user?.id,
                        title: "My Journal",
                        content: blocks,
                      },
                    ]);

                  if (error) {
                    console.error("Insert error:", error);
                  } else {
                    console.log("Journal entry created!");
                    // Optionally redirect here
                  }
                } else {
                  const { error } = await supabase
                    .from("journal_entries")
                    .update({ content: blocks })
                    .eq("id", entryId);

                  if (error) {
                    console.error("Update error:", error);
                  } else {
                    console.log("Journal entry updated!");
                  }
                }
              }}
            >
              Save
            </Button>
          </div>
          <hr className="text-muted-foreground" />
        </div>
        <BlockNoteView
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
        <div className="text-muted-foreground flex w-full items-center justify-end px-4.5">
          <span className="translate-x-2">Next entry</span>
          <ArrowButton direction="right" />
        </div>
      </div>
    </>
  );
};

export default Editor;
