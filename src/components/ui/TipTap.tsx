import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";

interface TipTapProps {
  editorContent: string;
  onUpdate: (content: string) => void;
}

export default function Tiptap({ editorContent, onUpdate }: TipTapProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, Underline, Highlight, Link, Image, Youtube],
    content: editorContent,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <Card className="w-full max-w-3xl">
      <CardContent className="space-y-4">
        <div className="flex gap-2">
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
        </div>
        <EditorContent editor={editor} className="bg-background h-screen" />
      </CardContent>
    </Card>
  );
}
