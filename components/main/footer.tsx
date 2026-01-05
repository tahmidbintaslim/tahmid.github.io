import Link from "next/link";

import { FOOTER_DATA } from "@/constants";

export const Footer = () => {
  return (
    <footer className="w-full h-full bg-transparent text-gray-200 shadow-lg p-[15px]">
      <div className="w-full flex flex-col items-center justify-center m-auto">
        <div className="w-full h-full flex flex-row items-center justify-around flex-wrap">
          {FOOTER_DATA.map((column) => (
            <div
              key={column.title}
              className="min-w-[200px] h-auto flex flex-col items-center justify-start"
            >
              <h2 className="p-2 font-bold text-[18px]">{column.title}</h2>
              {column.data.map(({ icon: Icon, name, link }) => (
                <Link
                  key={`${column.title}-${name}`}
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex flex-row items-center my-[16px]"
                >
                  {Icon && <Icon />}
                  <span className="text-[16px] ml-[6px]">{name}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="w-full max-w-screen-xl mx-auto p-2 pt-12 pb-4 block text-sm text-white-500 text-center">
          &copy; TBTR {new Date().getFullYear()} Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
