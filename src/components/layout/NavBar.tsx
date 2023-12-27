import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="flex gap-[100px] justify-center">
      <Link href="/">HOME</Link>
      <Link href="/community">COMMUNITY</Link>
      <Link href="/about">ABOUT</Link>
    </nav>
  );
};

export default NavBar;
