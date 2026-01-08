import Link from "next/link";
import { FOOTER_DATA } from "@/constants";
import { SiGooglecloud, SiOpenai } from "react-icons/si";
import { FaLock, FaUniversalAccess, FaRobot } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="relative w-full bg-gradient-to-b from-transparent via-[#030014] to-[#0a0a1a] text-gray-200 mt-20 pb-24 md:pb-0">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {FOOTER_DATA.map((column, index) => (
            <div
              key={column.title}
              className="flex flex-col space-y-5"
            >
              {/* Section Title */}
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">
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
                    className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 w-fit"
                  >
                    {Icon && (
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 group-hover:border-purple-500/50 group-hover:scale-110 transition-all duration-300">
                        <Icon />
                      </div>
                    )}
                    <span className="text-base group-hover:translate-x-1 transition-transform duration-300">
                      {name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-8" />

        {/* Certifications & Badges Section */}
        <div className="flex flex-col items-center gap-6 mb-8">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Certifications & Compliance</h3>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {/* Security Badge */}
            <div className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 hover:border-green-500/60 transition-all duration-300">
              <FaLock className="text-green-400 text-lg" />
              <span className="text-xs font-medium text-gray-300">SSL Secured</span>
            </div>

            {/* Accessibility Badge */}
            <div className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300">
              <FaUniversalAccess className="text-blue-400 text-lg" />
              <span className="text-xs font-medium text-gray-300">Accessibility-Focused</span>
            </div>

            {/* AI-Ready Badge */}
            <div className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300">
              <FaRobot className="text-purple-400 text-lg" />
              <span className="text-xs font-medium text-gray-300">AI-Ready (LLM.txt)</span>
            </div>

            {/* Google Cloud Expertise */}
            <div className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-blue-400/10 to-cyan-400/10 border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300">
              <SiGooglecloud className="text-blue-400 text-lg" />
              <span className="text-xs font-medium text-gray-300">Google Cloud</span>
            </div>

            {/* OpenAI Integration */}
            <div className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-green-400/10 to-emerald-400/10 border border-green-400/30 hover:border-green-400/60 transition-all duration-300">
              <SiOpenai className="text-green-400 text-lg" />
              <span className="text-xs font-medium text-gray-300">OpenAI Expert</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-semibold">TBTR</span>. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a 
              href="mailto:tahmidbintaslimrafi@gmail.com" 
              className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-300"
            >
              Contact
            </a>
            <a 
              href="/sitemap.xml" 
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            >
              Sitemap
            </a>
            <a 
              href="/llm.txt" 
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-300"
              title="AI/LLM-ready information file"
            >
              LLM.txt
            </a>
            <a 
              href="https://github.com/tahmidbintaslim/tahmid.github.io" 
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            >
              Source Code
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10" />
      </div>
    </footer>
  );
};
