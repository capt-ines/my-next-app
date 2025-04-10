import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <ul className="flex gap-6">
        <li className="transition duration-400 hover:scale-110">
          <Link href="/register">
            <button className="transition duration-400 active:scale-120">
              Sign in
            </button>
          </Link>
        </li>
        <li className="transition duration-400 hover:scale-110">
          <button className="transition duration-400 active:scale-120">
            Our mission
          </button>
        </li>
        <li className="transition duration-400 hover:scale-110">
          <button>Find inspiration</button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
