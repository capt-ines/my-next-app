import React, { useState } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isPinging, setIsPinging] = useState(false);
  const router = useRouter();

  const handlePingAndRedirect = (url: string) => {
    setIsPinging(true);

    // Wait for the animation to complete before navigating
    setTimeout(() => {
      setIsPinging(false);
      router.push(url); // Navigate to the desired page
    }, 1000); // Tailwind's `animate-ping` lasts 1 second
  };

  return (
    <div>
      <ul className="flex gap-6">
        <li className="transition duration-400 hover:scale-110">
          <button className="transition duration-400 active:scale-120">
            Sign in
          </button>
        </li>
        <li className="transition duration-400 hover:scale-110">
          <button className="transition duration-400 active:scale-120">
            Our mission
          </button>
        </li>
        <li className="transition duration-400 hover:scale-110">
          <button
            onClick={() => handlePingAndRedirect("/auth")}
            className={`transition duration-400 ${
              isPinging ? "animate-ping" : ""
            }`}
          >
            Find inspiration
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
