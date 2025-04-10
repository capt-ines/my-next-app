import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex gap-6">
        <li className="transition duration-400 hover:scale-110">
          <Link href="/register">
            <button className="transition duration-400 active:scale-120">
              Sign in
            </button>
          </Link>
        </li>
        <Link href="/about">
          <li className="transition duration-400 hover:scale-110">
            <button className="transition duration-400 active:scale-120">
              Our mission
            </button>
          </li>
        </Link>
        <li className="transition duration-400 hover:scale-110">
          <button>Find inspiration</button>
        </li>
        <li translate="no" className="transition duration-400 hover:scale-110">
          <button>Soulscape blog</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
