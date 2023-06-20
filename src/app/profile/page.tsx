"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { LoginButton, LogoutButton } from "@/components/buttons.component";

export default function Navbar() {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <>
        <div className={`text-center content-center m-5 `}>
          <h1 className="mb-5">Hei, {session.user?.name}!</h1>
          <h1>Gmail: {session.user?.email}</h1>
          {/* @ts-ignore */}
          <p>unik bruker id: {session.user?.id}</p>
          <p>session expires on: {session.expires}</p>
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
