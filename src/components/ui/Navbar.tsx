import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/component";

const Navbar = () => {
  const pathname = usePathname();
  const isIndex = pathname === "/";
  const color = isIndex ? "white" : "foreground";
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

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
