'use client';
import Link from 'next/link';

import { NAV_LINKS, SOCIALS } from '@/constants';

export const Navbar = () => {
  return (
    // Hidden on mobile, shown on desktop (md and up)
    <nav
      aria-label="Main navigation"
      className="contrast-dark bg-space-950/15 shadow-space-700/50 fixed top-0 z-50 hidden h-16 w-full px-10 shadow-lg backdrop-blur-md md:block"
    >
      {/* Navbar Container */}
      <div className="m-auto flex h-full w-full items-center justify-between px-2.5">
        {/* Logo + Name */}
        <Link
          href="/"
          aria-label="Home - Tahmid Bin Taslim Rafi"
          className="flex items-center"
        >
          <div className="text-muted ml-2 font-bold">TBTR</div>
        </Link>

        {/* Web Navbar */}
        <div className="flex h-full w-1/2 flex-row items-center justify-between">
          <div className="bg-space-950/35 flex h-auto w-full items-center justify-between rounded-full px-5 py-2 text-ink">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="ui-pop hover:text-brand-500 cursor-pointer transition"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Social Icons (Web) */}
        <ul
          className="flex flex-row gap-5"
          role="list"
          aria-label="Social media links"
        >
          {SOCIALS.map(({ link, name, icon: Icon }) => (
            <li key={name} role="listitem">
              <Link
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Visit my ${name} profile`}
                className="ui-pop inline-flex"
              >
                <Icon className="h-6 w-6 text-white" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
