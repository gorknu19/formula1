"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/components/buttons.component";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState<boolean>(false);

  function clickModal() {
    setShowModal(!showModal);
  }

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <Image
                  width={100}
                  height={50}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1.svg/2560px-F1.svg.png"
                  alt="F1"
                  priority
                  className={`w-auto h-auto`}
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a
                  href="/teams"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Teams
                </a>
                <a
                  href="/standings"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Standings
                </a>
                <a
                  href="/calender"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Calendar
                </a>
                <a
                  href="/races"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Find Races
                </a>
                <a
                  href="/forum"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Forum
                </a>
              </div>
            </div>
          </div>
          <div className=" inset-y-0 right-0 flex space-x-4 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {!session && (
              <>
                <LoginButton />
                <RegisterButton />
              </>
            )}
            {session?.user && (
              <>
                <div>
                  <p className="text-gray-300 rounded-md px-3 py-2 text-sm font-medium">
                    Logget inn som: {session.user.name}
                  </p>
                </div>
                <div className="relative ml-3">
                  <div>
                    <button
                      type="button"
                      className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      aria-expanded="false"
                      aria-haspopup="true"
                      onClick={clickModal}
                    >
                      <span className="sr-only">Open user menu</span>
                      {session.user && (
                        <svg
                          className="block h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {showModal && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md  bg-slate-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      <ProfileButton />
                      <LogoutButton />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
