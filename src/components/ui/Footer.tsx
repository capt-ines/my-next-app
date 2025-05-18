import React from "react";

const Footer = () => {
  return (
    <footer className="bg-background/50 border-foreground/20 flex items-end gap-4 border-t px-8 pt-7 pb-20 text-sm">
      <span translate="no" className="link text-foreground">
        © {new Date().getFullYear()} Soulscape
      </span>
      <span className="link text-foreground">Privacy & terms</span>
    </footer>
  );
};

export default Footer;
