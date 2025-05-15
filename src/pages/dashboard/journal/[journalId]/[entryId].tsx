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

  useEffect(() => {
    if (!entryId) return; // Ensure entryId is defined before fetching
    const fetchEntry = async () => {
      const { data, error } = await supabase
        .from("journal_entries")
        .select("content")
        .eq("id", entryId)
        .single();

      if (error) {
        console.error("Error fetching entry:", error);
      } else {
        setContent(data.content);
      }
    };

    fetchEntry();
  }, [entryId, supabase]);

  if (!content) return <div>Loading...</div>;

  return (
    <section className="bg-background/90 shadow-lg backdrop-blur-lg md:mx-4.5 md:rounded-md">
      <Editor
        initialContent={content}
        journalId={journalId}
        entryId={entryId}
      />
    </section>
  );
};

export default JournalEntryPage;
