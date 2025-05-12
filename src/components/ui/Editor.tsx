import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { en } from "@blocknote/core/locales";
import { useCreateBlockNote } from "@blocknote/react";
import React, { useEffect, useState } from "react";
import { BlockNoteView, Theme } from "@blocknote/mantine";
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
import Container from "./Container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Editor = () => {
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

  const locale = en;
  const editor = useCreateBlockNote({
    domAttributes: {
      block: {
        class: "blocknote-block",
      },
    },
    initialContent: template,
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

  const aeroLight = {
    colors: {
      editor: {
        text: "var(--foreground)",
        background: "#ffffff0",
      },
      menu: {
        text: "var(--foreground)",
        background: "#ffffff9a",
      },
      // tooltip: {
      //   text: "#ffffff",
      //   background: "#b00000",
      // },
      // hovered: {
      //   text: "#ffffff",
      //   background: "#b00000",
      // },
      // selected: {
      //   text: "#ffffff",
      //   background: "#c50000",
      // },
      // disabled: {
      //   text: "#9b0000",
      //   background: "#7d0000",
      // },
      shadow: "#00000020",
      border: "#77777778",
      // sideMenu: "#bababa",
      // highlights: lightDefaultTheme.colors!.highlights,
    },
    borderRadius: 4,
  } satisfies Theme;

  const aeroDark = {
    ...aeroLight,
    colors: {
      editor: {
        text: "var(--foreground)",
        background: "#1818180",
      },
      menu: {
        text: "var(--foreground)",
        background: "#1818189a",
      },
    },
  } satisfies Theme;

  const aeroTheme = {
    light: aeroLight,
    dark: aeroDark,
  };

  // editor.insertBlocks(
  //   [
  //     {
  //       content: new Date().toDateString(),
  //     },
  //   ],
  //   editor.document[0],
  //   "before",
  // );

  return (
    <>
      <Breadcrumb className="mb-2">
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
      <h1>Reflections</h1>
      <div className="bg-background/80 mt-3 min-h-screen rounded-md py-5 shadow-xs backdrop-blur-lg md:mt-5 lg:mx-10">
        {/* <div>
        <Button onClick={() => editor.toggleStyles({ bold: true })}></Button>
        <Button onClick={() => editor.addStyles(BlockTypeSelect)}></Button>
      </div> */}
        <BlockNoteView
          editor={editor}
          formattingToolbar={false}
          theme={aeroTheme}
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
      </div>
    </>
  );
};

export default Editor;
