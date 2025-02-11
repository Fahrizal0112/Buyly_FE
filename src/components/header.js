"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataString = Cookies.get("userData");
    if (userDataString) {
      setUserData(JSON.parse(userDataString));
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userData");
    window.location.href = "/login";
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-black">
            Buyly
          </Link>

          <div className="flex items-center gap-4">
            {userData ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 hover:bg-gray-100 rounded-full p-1"
                >
                  <div className="w-8 h-8 relative rounded-full overflow-hidden">
                    <Image
                      src={userData.photo_url || "/default-avatar.png"}
                      alt={userData.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-black">{userData.name}</span>
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Pesanan Saya
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-4">
                <Link
                  href="/login"
                  className="text-black hover:text-gray-600"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-black hover:text-gray-600"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
