// import Logo from "../../../public/logospiral";
import useMediaQuery from "@/hooks/useMediaQuery";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { PiSpiralFill } from "react-icons/pi";
import HamburgerMenu from "./HamburgerMenu";
import Navbar from "./Navbar";
import { useUser } from "@/contexts/userContext";

const Header = () => {
  const { user } = useUser();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const pathname = usePathname();
  const isIndex = pathname === "/";
  // const isDashboard = pathname.startsWith("/dashboard");
  const color = isIndex ? "white" : "foreground";
  const colorVariants = {
    white: "text-white",
    foreground: "text-foreground",
  };
  // TODO: if is workspace, return hamburger or side bar
  return (
    <header
      className={clsx(
        "blur-gradient fixed z-[20] flex w-full items-center justify-center px-6 pt-3 pb-20 md:px-13 md:pt-9 md:pb-18",
      )}
    >
      <Link href={user ? "/explore" : "/"}>
        <div className="group absolute top-5 left-8 my-2 flex items-center gap-0.5 md:top-6.5 md:left-13">
          <h1
            translate="no"
            className={`${colorVariants[color]} text-logo hidden md:block`}
          >
            soulscape
          </h1>
          <PiSpiralFill
            size={20}
            className={`${colorVariants[color]} animate-quickspin my-1 scale-130 md:my-0 md:scale-100`}
          />
        </div>
      </Link>
      {isDesktop ? (
        <Navbar />
      ) : (
        // isDashboard ? (
        //   <DropdownMenu>
        //     <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2">
        //       <RxDotsHorizontal size={30} />
        //     </DropdownMenuTrigger>
        //     <DropdownMenuContent className="mx-content min-w-36">
        //       <DropdownMenuLabel>
        //         <div className="flex gap-2 items-center">
        //           <CiSettings size={20} />
        //           <span>Create</span>
        //         </div>
        //       </DropdownMenuLabel>
        //       <DropdownMenuItem className="">
        //         <Link
        //           href="/dashboard/dream-preview"
        //           className="flex gap-2 items-center"
        //         >
        //           <span>Dream Preview</span>
        //         </Link>
        //       </DropdownMenuItem>
        //       <DropdownMenuItem className="">
        //         <Link
        //           href="/dashboard/journal"
        //           className="flex gap-2 items-center"
        //         >
        //           <span>Journal</span>
        //         </Link>
        //       </DropdownMenuItem>
        //       <DropdownMenuItem className="">
        //         <Link
        //           href="/dashboard/affirmations"
        //           className="flex gap-2 items-center"
        //         >
        //           <span>Affirmations</span>
        //         </Link>
        //       </DropdownMenuItem>
        //       <DropdownMenuItem className="">
        //         <Link
        //           href="/dashboard/mockup-studio"
        //           className="flex gap-2 items-center"
        //         >
        //           <span>Mockup Studio</span>
        //         </Link>
        //       </DropdownMenuItem>
        //       <DropdownMenuSeparator />
        //       <DropdownMenuLabel>
        //         <div className="flex items-center gap-2">
        //           <CiSettings size={20} />
        //           <span>Settings</span>
        //         </div>
        //       </DropdownMenuLabel>
        //       <DropdownMenuItem className="">
        //         <Link
        //           href="/dashboard/settings/details"
        //           className="flex items-center gap-2"
        //         >
        //           <span>Personal details</span>
        //         </Link>
        //       </DropdownMenuItem>
        //       <DropdownMenuItem className="">
        //         <Link
        //           href="/dashboard/settings/details"
        //           className="flex items-center gap-2"
        //         >
        //           <span>Profile management</span>
        //         </Link>
        //       </DropdownMenuItem>
        //       <DropdownMenuItem className="">
        //         <Link
        //           href="/dashboard/settings/aura"
        //           className="flex items-center gap-2"
        //         >
        //           <span>Aura</span>
        //         </Link>
        //       </DropdownMenuItem>
        //       <DropdownMenuSeparator />
        //       <DropdownMenuItem className="">
        //         <div
        //           onClick={() => signOut(router)}
        //           className="flex items-center gap-2"
        //         >
        //           <PiDoorOpenThin className="text-foreground size-5"></PiDoorOpenThin>
        //           <span>Sign out</span>
        //         </div>
        //       </DropdownMenuItem>
        //     </DropdownMenuContent>
        //   </DropdownMenu>
        // ) :
        <HamburgerMenu />
      )}
    </header>
  );
};

export default Header;
