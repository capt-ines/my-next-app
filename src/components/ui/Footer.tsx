import React from "react";

const Footer = () => {
  return (
    <footer className="bg-background/20 border-foreground/20 flex items-end gap-4 border-t px-6 pt-5 pb-20 text-sm">
      <span translate="no" className="link text-foreground">
        © 2025 Soulscape
      </span>
      <span className="link text-foreground">Privacy & terms</span>
    </footer>
  );
};

export default Footer;
