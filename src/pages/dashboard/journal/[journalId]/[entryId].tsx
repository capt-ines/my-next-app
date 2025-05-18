import { useRouter } from "next/router";
import { createClient } from "@/utils/supabase/component";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically load your Editor to avoid SSR issues
const Editor = dynamic(() => import("@/components/ui/Editor"), {
  ssr: false,
});

const JournalEntryPage = () => {
  const router = useRouter();
  const { journalId, entryId } = router.query;
  const supabase = createClient();
  const [content, setContent] = useState(null);
  // TODO: color
  const [editorColor, setEditorColor] = useState("black");

  useEffect(() => {
    if (!entryId) return; // Ensure entryId is defined before fetching
    const fetchEntry = async () => {
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("id", entryId)
        .single();

      if (error) {
        console.error("Error fetching entry:", error);
      } else {
        console.log(data);
        setContent(data.content);
        setEditorColor(data.color);
      }
    };
    fetchEntry();
  }, [entryId, supabase]);

  if (!content) return <div>Loading...</div>;

  return (
    <section
      className="bg-mask/40 pt-13 shadow-lg backdrop-blur-lg md:rounded-md md:pt-17"
      style={{ backgroundColor: editorColor }}
    >
      <Editor
        initialContent={content}
        journalId={journalId}
        entryId={entryId}
      />
    </section>
  );
};

export default JournalEntryPage;
