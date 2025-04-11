import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const isIndex = pathname === "/";
  const color = isIndex ? "white" : "foreground";
  return (
    <nav>
      <ul className={`flex gap-6 text-${color}`}>
        <li className="transition duration-400 hover:scale-110">
          <Link href="/register">Sign in</Link>
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
