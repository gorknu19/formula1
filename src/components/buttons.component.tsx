"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <button
      onClick={() => signIn()}
      className={`mt-5 text-gray-300 bg-gray-700 hover:bg-gray-800 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}
    >
      Sign in
    </button>
  );
};

export const RegisterButton = () => {
  return (
    <Link
      href="/register"
      className={`m-5 text-gray-300 bg-gray-700 hover:bg-gray-800 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}
    >
      Register
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <button
      onClick={() => signIn()}
      className={`m-5 text-gray-300 bg-gray-700 hover:bg-gray-800 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}
    >
      Sign out
    </button>
  );
};

export const ProfileButton = () => {
  return (
    <Link
      href="/profile"
      className={`m-5  text-gray-300 bg-gray-700 hover:bg-gray-800 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}
    >
      Profile
    </Link>
  );
};
