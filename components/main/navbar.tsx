"use client";
import Link from "next/link";

import { LINKS, NAV_LINKS, SOCIALS } from "@/constants";

export const Navbar = () => {
  return (
    // Hidden on mobile, shown on desktop (md and up)
    <nav
      className="hidden md:block w-full h-16.25 fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-md z-50 px-10"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Navbar Container */}
      <div className="w-full h-full flex items-center justify-between m-auto px-2.5">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center" aria-label="TBTR - Home">
          <div className="font-bold ml-2.5 text-gray-300">TBTR</div>
        </Link>

        {/* Web Navbar */}
        <div className="flex w-125 h-full flex-row items-center justify-between">
          <div className="flex items-center justify-between w-full h-auto border-[rgba(112,66,248,0.38)] bg-[rgba(3,0,20,0.37)] px-5 py-2.5 rounded-full text-gray-200">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="cursor-pointer hover:text-[rgb(112,66,248)] transition focus-visible:outline-2 focus-visible:outline-[#7c3aed] focus-visible:outline-offset-2"
                aria-label={link.title}
              >
                {link.title}
              </Link>
            ))}

            {/* Source Code */}
            <Link
              href={LINKS.sourceCode}
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer hover:text-[rgb(112,66,248)] transition focus-visible:outline-2 focus-visible:outline-[#7c3aed] focus-visible:outline-offset-2"
              aria-label="View source code on GitHub"
            >
              Source Code
            </Link>
          </div>
        </div>

        {/* Social Icons (Web) */}
        <div className="flex flex-row gap-5">
          {SOCIALS.map(({ link, name, icon: Icon }) => (
            <Link
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              key={name}
              aria-label={`${name} (opens in new tab)`}
              className="focus-visible:outline-2 focus-visible:outline-[#7c3aed] focus-visible:outline-offset-2 rounded"
            >
              <Icon className="h-6 w-6 text-white hover:text-[rgb(112,66,248)] transition" />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
