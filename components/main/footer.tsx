import { FOOTER_DATA } from '@/constants';
import Link from 'next/link';
import { FaLock, FaRobot, FaUniversalAccess } from 'react-icons/fa';
import { SiGooglecloud, SiOpenai } from 'react-icons/si';

export const Footer = () => {
  return (
    <footer className="relative mt-20 w-full bg-linear-to-b from-transparent via-[#030014] to-[#0a0a1a] pb-24 text-gray-200 md:pb-0">
      {/* Decorative top border */}
      <div className="absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Main Footer Content */}
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">
          {FOOTER_DATA.map((column) => (
            <div key={column.title} className="flex flex-col space-y-5">
              {/* Section Title */}
              <h2 className="mb-2 bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-xl font-bold text-transparent">
                {column.title}
              </h2>

              {/* Links */}
              <div className="flex flex-col space-y-3">
                {column.data.map(({ icon: Icon, name, link }) => (
                  <Link
                    key={`${column.title}-${name}`}
                    href={link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex w-fit items-center gap-3 text-gray-400 transition-all duration-300 hover:text-white"
                  >
                    {Icon && (
                      <div className="rounded-lg border border-purple-500/20 bg-linear-to-br from-purple-500/10 to-cyan-500/10 p-2 transition-all duration-300 group-hover:scale-110 group-hover:border-purple-500/50">
                        <Icon />
                      </div>
                    )}
                    <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                      {name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mb-8 h-px w-full bg-linear-to-r from-transparent via-purple-500/30 to-transparent" />

        {/* Certifications & Badges Section */}
        <div className="mb-8 flex flex-col items-center gap-6">
          <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
            Certifications & Compliance
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {/* Security Badge */}
            <div className="group flex items-center gap-2 rounded-lg border border-green-500/30 bg-linear-to-br from-green-500/10 to-emerald-500/10 px-4 py-2 transition-all duration-300 hover:border-green-500/60">
              <FaLock className="text-lg text-green-400" />
              <span className="text-xs font-medium text-gray-300">
                SSL Secured
              </span>
            </div>

            {/* Accessibility Badge */}
            <div className="group flex items-center gap-2 rounded-lg border border-blue-500/30 bg-linear-to-br from-blue-500/10 to-cyan-500/10 px-4 py-2 transition-all duration-300 hover:border-blue-500/60">
              <FaUniversalAccess className="text-lg text-blue-400" />
              <span className="text-xs font-medium text-gray-300">
                Accessibility-Focused
              </span>
            </div>

            {/* AI-Ready Badge */}
            <div className="group flex items-center gap-2 rounded-lg border border-purple-500/30 bg-linear-to-br from-purple-500/10 to-pink-500/10 px-4 py-2 transition-all duration-300 hover:border-purple-500/60">
              <FaRobot className="text-lg text-purple-400" />
              <span className="text-xs font-medium text-gray-300">
                AI-Ready (LLM.txt)
              </span>
            </div>

            {/* Google Cloud Expertise */}
            <div className="group flex items-center gap-2 rounded-lg border border-blue-400/30 bg-linear-to-br from-blue-400/10 to-cyan-400/10 px-4 py-2 transition-all duration-300 hover:border-blue-400/60">
              <SiGooglecloud className="text-lg text-blue-400" />
              <span className="text-xs font-medium text-gray-300">
                Google Cloud
              </span>
            </div>

            {/* OpenAI Integration */}
            <div className="group flex items-center gap-2 rounded-lg border border-green-400/30 bg-linear-to-br from-green-400/10 to-emerald-400/10 px-4 py-2 transition-all duration-300 hover:border-green-400/60">
              <SiOpenai className="text-lg text-green-400" />
              <span className="text-xs font-medium text-gray-300">
                OpenAI Expert
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-8 h-px w-full bg-linear-to-r from-transparent via-purple-500/30 to-transparent" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Copyright */}
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()}{' '}
            <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text font-semibold text-transparent">
              TBTR
            </span>
            . All rights reserved.
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:tahmidbintaslimrafi@gmail.com"
              className="text-sm text-gray-400 transition-colors duration-300 hover:text-purple-400"
            >
              Contact
            </a>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-gray-400 transition-colors duration-300 hover:text-cyan-400"
            >
              Sitemap
            </a>
            <a
              href="/llm.txt"
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-gray-400 transition-colors duration-300 hover:text-green-400"
              title="AI/LLM-ready information file"
            >
              LLM.txt
            </a>
            <a
              href="https://github.com/tahmidbintaslim/tahmid.github.io"
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-gray-400 transition-colors duration-300 hover:text-cyan-400"
            >
              Source Code
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 -z-10 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>
    </footer>
  );
};
