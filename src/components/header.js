"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm py-4 px-8 flex justify-between items-center">
      <a href="/" className="inline-block">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-black to-gray-500 text-transparent bg-clip-text hover:opacity-100">
          Buyly
        </h1>
      </a>

      <div className="flex items-center gap-4">
        <button className="flex items-center">
          <span className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </span>
        </button>
        <Link href="/login" className="px-4 py-2 border rounded-md text-black">
          Login
        </Link>
        <Link href="/register" className="px-4 py-2 bg-black text-white rounded-md">
          Register
        </Link>
      </div>
    </header>
  );
}
