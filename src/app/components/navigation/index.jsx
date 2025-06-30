"use client";

import { BtnList } from "@/app/data";
import React from "react";
import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur p-4">
      <div className="flex justify-center gap-6">
        {BtnList.map((btn, index) => {
          const isExternal = btn.newTab;
          const linkProps = isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {};

          return isExternal ? (
            <a
              key={index}
              href={btn.link}
              {...linkProps}
              className="text-white hover:text-yellow-300 transition-colors"
            >
              {btn.label}
            </a>
          ) : (
            <Link key={index} href={btn.link} passHref>
              <span className="text-white hover:text-yellow-300 transition-colors cursor-pointer">
                {btn.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
