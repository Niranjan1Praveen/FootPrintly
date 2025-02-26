"use client";
import React from "react";
import xmark from "../public/icons/xmark.svg";
import bars from "../public/icons/bars.svg";
import signIn from "../public/icons/sign-in.svg";
import logo from "../public/logo/logo.png";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  function displayNavbar() {
    document.getElementById("navbar").style.right = "0";
  }

  function closeNavbar() {
    document.getElementById("navbar").style.right = "-100%";
  }

  return (
    <header className="flex items-center justify-center gap-20 top-0 left-0 w-full shadow-sm z-50 flex px-6 py-4 section-p">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <Image src={logo} alt="Logo" width={30} height={30} />
        <h1 className="text-xl font-bold tracking-widest cursor-pointer">
          FootPrintly
        </h1>
      </div>
      {/* Navbar */}
      <ul
        id="navbar"
        className="flex items-center gap-6 transition-all duration-300 overflow-hidden h-screen absolute md:static bg-white md:bg-transparent right-0 top-0 md:h-auto w-64 md:w-auto md:flex-row flex-col shadow-lg md:shadow-none p-6 md:p-0"
      >
        <li className="md:hidden cursor-pointer" onClick={closeNavbar}>
          <Image src={xmark} alt="Close navbar" className="icon" />
        </li>
        <li>
          <Link href={"/"} className="text-gray-900 font-medium">
            Start
          </Link>
        </li>
        <li>
          <Link href={"/"} className="text-gray-900 font-medium">
            About
          </Link>
        </li>
        <li>
          <Link href={"/"} className="text-gray-900 font-medium">
            Contact
          </Link>
        </li>
        <li className="flex items-center gap-2 cursor-pointer">
          <Image src={signIn} className="w-5 h-5" alt="Logout" />
        </li>
      </ul>
      <div className="md:hidden cursor-pointer" onClick={displayNavbar}>
        <Image src={bars} alt="Close navbar" className="icon" />
      </div>
    </header>
  );
}
