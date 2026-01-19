"use client";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  const navOptions = ["Home", "About Us", "Features"];

  return (
    <>
      <nav className="fixed  justify-center items-center bg-slate-900 w-full flex text-white shadow-lg shadow-slate-800 outline-0">
        <div id="logo" className="ml-6 hover:scale-105 cursor-pointer">
          <Image src="/logo.png" width={80} height={80} alt="logo"></Image>
        </div>
        <div id="navOptions" className="w-full">
          <ul className="flex justify-center items-center w-full gap-6 ml-auto  ">
            <span className="flex w-full justify-center items-center gap-6">
              {navOptions.map((option, index) => {
                return (
                  <li
                    key={index}
                    className="hover:text-slate-400 cursor-pointer text-[1.1em] px-3 py-2"
                  >
                    {option}
                  </li>
                );
              })}
            </span>

            <Link href="/register">
              <li className="ml-auto mr-6 hover:text-slate-400 cursor-pointer text-[1.1em] px-4 py-2 border border-blue-600 bg-blue-600 rounded-xl shadow hover:scale-105 shadow-blue-500 transition-transform ease-out duration-300">
                Login/Register
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </>
  );
}
