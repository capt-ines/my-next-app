import React from "react";
import { CiSearch } from "react-icons/ci";
import Container from "./Container";
import { Input } from "./input";

const Searchbar = () => {
  return (
    <Container className="flex items-center justify-between gap-0.5 px-2 py-2">
      <CiSearch
        size={20}
        className="text-muted-foreground peer-focus:text-foreground"
      />
      <input
        className="peer focus:text-foreground focus:border-foreground placeholder:text-muted-foreground w-full bg-transparent focus:ring-0 focus:ring-transparent focus:outline-none"
        placeholder="Search"
      />
    </Container>
  );
};

export default Searchbar;
