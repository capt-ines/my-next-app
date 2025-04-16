import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/component";
import { useUser } from "@/contexts/userContext";

const Navbar = () => {
  const pathname = usePathname();
  const isIndex = pathname === "/";
  const color = isIndex ? "white" : "foreground";
  const { user } = useUser();
  console.log(user);

  return (
    <nav>
      <ul className={`flex gap-6 text-${color}`}>
        <li className="transition duration-400 hover:scale-110">
          {user ? (
            <Link className="text-accent" href="/dashboard">
              {user?.user_metadata.username}
            </Link>
          ) : (
            <Link href="/login">Sign in</Link>
          )}
        </li>

        <li className="transition duration-400 hover:scale-110">
          <Link href="/about"> Our mission </Link>
        </li>

        <li className="transition duration-400 hover:scale-110">
          Find inspiration
        </li>

        <li translate="no" className="transition duration-400 hover:scale-110">
          Soulscape blog
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
