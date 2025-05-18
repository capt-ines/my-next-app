import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  publicNavLinksData,
  dashboardNavLinksData,
} from "@/constants/navigation";
import { useUser } from "@/contexts/userContext";
import { signOut } from "@/utils/auth/signOut";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { CiSettings } from "react-icons/ci";
import { GrNext } from "react-icons/gr";
import {
  IoCompass,
  IoCompassOutline,
  IoHeart,
  IoHeartOutline,
} from "react-icons/io5";
import { PiDoorOpenThin } from "react-icons/pi";

const Navbar = () => {
  const pathname = usePathname();
  const isIndex = pathname === "/";
  const color = isIndex ? "white" : "foreground";
  const colorVariants = {
    white: "text-white/60 ",
    foreground: "text-foreground/60 ",
  };
  const { user, username } = useUser();
  const router = useRouter();
  console.log(router);
  const navLinks =
    pathname === "/" ? publicNavLinksData : dashboardNavLinksData;

  return (
    <nav className="">
      <ul className={`mx-auto flex w-full gap-8 ${colorVariants[color]}`}>
        {navLinks.map((link) => (
          <li
            key={link.href}
            className={`transition duration-400 hover:scale-102 hover:text-white ${pathname.includes(link.href) ? `text-white` : ``}`}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
      {user ? (
        <div className="absolute top-9 right-13">
          <div className="flex items-center font-semibold transition duration-400 hover:scale-102 hover:text-white">
            <Link className="px-1" href="/explore">
              <IoHeartOutline />
            </Link>
            <Link className="px-1" href="/explore">
              <IoCompassOutline />
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="ml-3 flex cursor-pointer items-center gap-2">
                {username}
                <GrNext className="size-3 rotate-90" />
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
          </div>
        </div>
      ) : (
        <div className="w-full text-right transition duration-400 hover:scale-110">
          <Link href="/login">Sign in</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
