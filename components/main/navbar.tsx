'use client';
import Link from 'next/link';

import { LINKS, NAV_LINKS, SOCIALS } from '@/constants';

export const Navbar = () => {
  return (
    // Hidden on mobile, shown on desktop (md and up)
    <nav
      aria-label="Main navigation"
      className="fixed top-0 z-50 hidden h-[65px] w-full bg-[#03001427] px-10 shadow-lg shadow-[#2A0E61]/50 backdrop-blur-md md:block"
    >
      {/* Navbar Container */}
      <div className="m-auto flex h-full w-full items-center justify-between px-[10px]">
        {/* Logo + Name */}
        <Link
          href="/"
          aria-label="Home - Tahmid Bin Taslim Rafi"
          className="flex items-center"
        >
          <div className="ml-[10px] font-bold text-gray-300">TBTR</div>
        </Link>

        {/* Web Navbar */}
        <div className="flex h-full w-[500px] flex-row items-center justify-between">
          <div className="flex h-auto w-full items-center justify-between rounded-full border-[rgba(112,66,248,0.38)] bg-[rgba(3,0,20,0.37)] px-[20px] py-[10px] text-gray-200">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="cursor-pointer transition hover:text-[rgb(112,66,248)]"
              >
                {link.title}
              </Link>
            ))}

            {/* Source Code */}
            <Link
              href={LINKS.sourceCode}
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer transition hover:text-[rgb(112,66,248)]"
            >
              Source Code
            </Link>
          </div>
        </div>

        {/* Social Icons (Web) */}
        <div
          className="flex flex-row gap-5"
          role="list"
          aria-label="Social media links"
        >
          {SOCIALS.map(({ link, name, icon: Icon }) => (
            <Link
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              key={name}
              aria-label={`Visit my ${name} profile`}
              role="listitem"
            >
              <Icon className="h-6 w-6 text-white" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
