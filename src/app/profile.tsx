import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

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
          {session.user?.image && (
            <Image
              src={session.user?.image}
              height={200}
              width={200}
              alt="pfp"
              className="rounded-full m-auto mt-10"
            />
          )}
          <button
            onClick={() => signOut()}
            className={`mt-10 text-gray-300 bg-gray-700 hover:bg-gray-800 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}
          >
            Logg ut
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={`text-center`}>
        <h1>Du er ikke logget inn! Logg inn her:</h1>
        <button
          onClick={() => signIn()}
          className={`mt-5 text-gray-300 bg-gray-700 hover:bg-gray-800 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}
        >
          Login
        </button>
      </div>
    </>
  );
}
