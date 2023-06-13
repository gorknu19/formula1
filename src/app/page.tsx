"use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return <main className={`flex min-h-screen bg-slate-600`}></main>;
}
