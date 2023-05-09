"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { LoginButton, LogoutButton } from "@/components/buttons.component";

export default function Navbar() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <div className={`text-center content-center m-5 `}>
          <h1 className="mb-5">
            Hei, du er logget inn som: {session.user?.name}!
          </h1>
          <h1>Gmail: {session.user?.email}</h1>

          <LogoutButton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className={`text-center`}>
        <h1>Du er ikke logget inn! Logg inn her:</h1>
        <LoginButton />
      </div>
    </>
  );
}
