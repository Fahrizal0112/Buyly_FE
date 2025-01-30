"use client";
import Link from "next/link";

export default function HeaderPolos() {
  return (
    <header className="bg-white shadow-sm py-4 px-8 flex justify-between items-center">
      <a href="/" className="inline-block">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-black to-gray-50 text-transparent bg-clip-text hover:opacity-100">
          Buyly
        </h1>
      </a>

    </header>
  );
}
