// components/Editor.tsx
import { useState } from "react";
import NavIsland from "@/components/ui/NavIsland";
import { PiButterflyThin } from "react-icons/pi";
import { PiSquaresFourThin } from "react-icons/pi";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";

export default function AddJournal() {
  const [content, setContent] = useState("");
  const navData = [
    { href: "/dashboard", icon: <PiButterflyThin size={30} /> },
    { href: "/dashboard/soulscapes", icon: <PiSquaresFourThin size={30} /> },
  ];
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, Underline, Highlight, Link, Image, Youtube],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <>
      <section>
        <Card className="mx-auto w-full max-w-3xl">
          <CardContent className="space-y-4">
            <div className="flex gap-2"></div>
            <EditorContent editor={editor} className="h-screen" />
          </CardContent>
        </Card>
      </section>

      <NavIsland>
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
      </NavIsland>
    </>
  );
}
