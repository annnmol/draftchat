"use server";

import { FC } from "react";
import { GITHUB_URL } from "@/lib/dummy-data";

interface Props {}

const Footer: FC<Props> = () => {
  return (
    <>
      <p className="max-w-[150px] sm:max-w-lg">
        Built by{" "}
        <a
          className="font-semibold"
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Anmol Tanwar
        </a>
        .
      </p>
      <p className="max-w-[150px] sm:max-w-lg text-right">
        Source code available on{" "}
        <a
          className="font-semibold"
          href={`${GITHUB_URL}/draftchat`}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </p>
    </>
  );
};

export default Footer;
