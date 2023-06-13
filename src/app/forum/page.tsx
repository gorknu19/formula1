"use client";
import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { LoginButton, LogoutButton } from "@/components/buttons.component";
import axios, { AxiosRequestConfig } from "axios";

export default function Navbar() {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState<boolean>(false);

  function clickModal() {
    setShowModal(!showModal);
  }

  if (!session) {
    return (
      <>
        <div className={`text-center`}>
          <h1>Du er ikke logget inn! Logg inn her:</h1>
          <LoginButton />
        </div>
      </>
    );
  }

  async function createPost(req: any) {
    event?.preventDefault();
    const body = {
      postTitle: req.target[0].value,
      postBody: req.target[1].value,
      posterName: session?.user?.name,
      // posterId: JSON.stringify(session?.token?.id),
    };

    const options = {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    };
    //@ts-ignore
    let test = await fetch("./api/forum", options)
      .then(function (response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
      })
      .then(function (data) {
        // `data` is the parsed version of the JSON returned from the above endpoint.
        console.log(data); // { "userId": 1, "id": 1, "title": "...", "body": "..." }
      });
    console.log(test);
  }

  return (
    <>
      <div className={`text-center content-center m-5 `}>
        <button
          className=" rounded-full bg-gray-800 p-1.5 inline-flex items-center justify-center"
          onClick={clickModal}
        >
          Create Post
        </button>
        {/* <dialog open={showModal}> */}
        {showModal && (
          <div className="fixed w-full p-4 md:inset-0 h-[calc(100%-1rem)] max-h-full text-center m-auto">
            <div className="relative w-full max-w-md max-h-full m-auto">
              <div className="bg-slate-500 rounded-lg shadow dark:bg-gray-700  border border-black ">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                  onClick={clickModal}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="px-6 py-6 lg:px-8">
                  <form className="space-y-6" onSubmit={createPost}>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="bg-slate-600 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Title"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">
                        Content
                      </label>
                      <textarea
                        name="content"
                        id="content"
                        placeholder="text"
                        className="bg-slate-600 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-slate-700 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Create post
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* </dialog> */}
      </div>
    </>
  );
}
