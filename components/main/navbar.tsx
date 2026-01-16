"use client";
import Link from "next/link";
import { useState } from "react";

import { LINKS, NAV_LINKS, SOCIALS } from "@/constants";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchModal } from "@/components/search-modal";
import { SocialShare } from "@/components/social-share";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    // Hidden on mobile, shown on desktop (md and up)
    <nav className="hidden md:block w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-md z-50 px-10">
      {/* Navbar Container */}
      <div className="w-full h-full flex items-center justify-between m-auto px-[10px]">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center">
          <div className="font-bold ml-[10px] text-gray-300">TBTR</div>
        </Link>

        {/* Web Navbar */}
        <div className="flex w-[500px] h-full flex-row items-center justify-between">
          <div className="flex items-center justify-between w-full h-auto border-[rgba(112,66,248,0.38)] bg-[rgba(3,0,20,0.37)] px-[20px] py-[10px] rounded-full text-gray-200">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="cursor-pointer hover:text-[rgb(112,66,248)] transition"
              >
                {link.title}
              </Link>
            ))}

            {/* Source Code */}
            <Link
              href={LINKS.sourceCode}
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer hover:text-[rgb(112,66,248)] transition"
            >
              Source Code
            </Link>
          </div>
        </div>

        {/* Social Icons (Web) */}
        <div className="flex flex-row gap-5">
          <SearchModal />
          <SocialShare
            url="https://tahmid.space"
            title="Tahmid - Senior Software Engineer"
          />
          <ThemeToggle />
          {SOCIALS.map(({ link, name, icon: Icon }) => (
            <Link
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              key={name}
              aria-label={name}
            >
              <Icon className="h-6 w-6 text-white" />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
