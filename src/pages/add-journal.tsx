import { useState } from "react";
import dynamic from "next/dynamic";
import NavIsland from "@/components/ui/NavIsland";

const Editor = dynamic(() => import("../components/ui/Editor"), {
  ssr: false,
});

export default function AddJournal() {
  return (
    <>
      <section>
        <Editor />
      </section>
      {/* 
      <NavIsland>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          Undo
        </button>
        <Button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          variant="outline"
        >
          <b>B</b>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant="outline"
        >
          <i>I</i>
        </Button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          Strike
        </button>
      </NavIsland> */}
    </>
  );
}
