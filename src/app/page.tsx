import Image from "next/image";
// import { useSession, signIn, signOut } from "next-auth/react";
import Bingus from "@/components/randomshit";
import { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/auth-options";
export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  // const { data: session } = useSession();
  return (
    <main className={`flex min-h-screen bg-slate-600`}>
      <Suspense
        fallback={
          <div>
            <h1>loading</h1>
          </div>
        }
      >
        <Bingus />
      </Suspense>
    </main>
  );
}
