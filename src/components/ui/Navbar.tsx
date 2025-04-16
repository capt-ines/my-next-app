import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/component";
import { useUser } from "@/contexts/userContext";
import {
  publicNavLinksData,
  dashboardNavLinksData,
} from "@/constants/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const isIndex = pathname === "/";
  const color = isIndex ? "white" : "foreground";
  const { user, username } = useUser();

  const navLinks = pathname.startsWith("/dashboard")
    ? dashboardNavLinksData
    : publicNavLinksData;

  return (
    <nav>
      <ul className={`flex gap-6 text-${color}`}>
        {user ? (
          <li className="text-accent transition duration-400 hover:scale-110">
            <Link href="/dashboard">{username}</Link>
          </li>
        ) : (
          <li className="transition duration-400 hover:scale-110">
            <Link href="/login">Sign in</Link>
          </li>
        )}
        {navLinks.map((link) => (
          <li
            key={link.href}
            className="transition duration-400 hover:scale-110"
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
