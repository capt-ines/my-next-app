import dynamic from "next/dynamic";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
const Editor = dynamic(() => import("../../../components/ui/Editor"), {
  ssr: false,
});

export default function AddJournal() {
  return (
    <section className="bg-background/70 shadow-lg backdrop-blur-lg md:mx-4.5 md:rounded-md">
      <Editor isNew={true} />
    </section>
  );
}
