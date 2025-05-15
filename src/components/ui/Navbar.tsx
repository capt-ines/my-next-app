import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { PiDoorOpenThin } from "react-icons/pi";
import { createClient } from "@/utils/supabase/component";
import { useUser } from "@/contexts/userContext";
import { GrNext } from "react-icons/gr";
import {
  publicNavLinksData,
  dashboardNavLinksData,
} from "@/constants/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/utils/auth/signOut";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "lucide-react";
import { sign } from "node:crypto";

const Navbar = () => {
  const pathname = usePathname();
  const isIndex = pathname === "/";
  const color = isIndex ? "white" : "foreground";
  const { user, username } = useUser();
  const router = useRouter();

  const navLinks =
    // pathname.startsWith("/dashboard")
    //   ? dashboardNavLinksData
    //   :
    publicNavLinksData;

  return (
    <nav>
      <ul className={`flex gap-6 text-${color}`}>
        {navLinks.map((link) => (
          <li
            key={link.href}
            className="transition duration-400 hover:scale-110"
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
        {user ? (
          <>
            <span>|</span>
            <li className="font-semibold transition duration-400 hover:scale-110">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2">
                  <GrNext className="size-3 rotate-90" />
                  {username}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mx-content min-w-36">
                  <DropdownMenuItem className="items-end">
                    <Link className="flex gap-2" href="/dashboard">
                      <span>My profile</span>
                      <div className="bg-accent h-5 w-5 rounded-full"></div>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <div className="flex items-center gap-2">
                        <span>Settings</span>
                        <CiSettings className="text-foreground size-5"></CiSettings>
                      </div>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="min-w-36">
                        <DropdownMenuItem className="items-end">
                          <Link href="/dashboard/settings/details">
                            {" "}
                            Profile details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="items-end">
                          <Link href="/dashboard/settings/aura">Aura</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="items-end">
                          More...
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="items-end">
                    <div
                      onClick={() => signOut(router)}
                      className="flex items-center gap-2"
                    >
                      <span>Sign out</span>
                      <PiDoorOpenThin className="text-foreground size-5"></PiDoorOpenThin>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </>
        ) : (
          <li className="transition duration-400 hover:scale-110">
            <Link href="/login">Sign in</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
