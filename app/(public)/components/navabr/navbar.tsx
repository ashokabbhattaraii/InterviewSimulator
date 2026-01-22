"use client";
import { link } from "fs";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  const navOptions = [
    { li: "Home", link: "/" },
    { li: "About Us", link: "#about" },
    { li: "Features", link: "#features" },
  ];

  return (
    <>
      <nav className="fixed  justify-center  items-center bg-primary w-full flex text-white text-xl shadow-lg shadow-primary/20 outline-0 z-50 ">
        <div id="logo" className="ml-6 hover:scale-105 cursor-pointer">
          <Image src="/logo.png" width={80} height={80} alt="logo"></Image>
        </div>
        <div id="navOptions" className="w-full">
          <ul className="flex justify-center items-center w-full gap-6 ml-auto  ">
            <span className="flex w-full justify-center items-center gap-6">
              {navOptions.map((option, index) => {
                return (
                  <li
                    onClick={() => (window.location.href = option.link)}
                    key={index}
                    className="hover:text-secondary cursor-pointer text-[1.1em] px-3 py-2 transition-colors"
                  >
                    {option.li}
                  </li>
                );
              })}
            </span>

            <Link href="/register">
              <li className="ml-auto mr-6 hover:bg-secondary/90 cursor-pointer text-[1.1em] px-4 py-2 border border-secondary bg-secondary text-secondary-foreground rounded-xl shadow hover:scale-105 shadow-secondary/50 transition-all ease-out duration-300 font-semibold">
                Login/Register
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </>
  );
}
