import ArrowButton from "@/components/ui/arrowButton";
import React from "react";
import Link from "next/link";

const Journal = () => {
  return (
    <div>
      <Link href="/dashboard">
        <ArrowButton direction="left" />
      </Link>
    </div>
  );
};

export default Journal;
