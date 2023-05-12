"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import useSWR from "swr";
import axios, { AxiosRequestConfig } from "axios";
import { Teams } from "@/types/teams.types";
import Link from "next/link";
export const fetcher = (url: string, config?: RequestInit | undefined) =>
  fetch(url, config).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  });

// const CalenderHook = () => {
//   const { data: calender, error, isLoading } = useSWR("/api/calender", fetcher);
//   return { calender, error, isLoading };
// };

export let CalenderHook = () => {
  let { data, error, mutate } = useSWR(`/api/teams`, fetcher);

  let loading = !data && !error;
  if (data) {
    data = JSON.parse(data);
    data = data.elements[1].elements[0].elements;
    console.log(data);
  }
  return { teams: data, error, loading };
};

export default function Calender() {
  const { data: session } = useSession();
  const { teams, error, loading } = CalenderHook();
  console.log(teams);
  return (
    <>
      <div className={`text-center content-center m-5 `}>
        {teams &&
          teams.map((o: Teams) => {
            console.log(o);
            return (
              <div
                key={o}
                id={o.attributes.constructorId}
                className={`bg-slate-800 m-10 rounded-md`}
              >
                <Link href={o.attributes.url}>
                  <h1>{o.elements[0].elements[0].text}</h1>
                  <p>Team Id: {o.attributes.constructorId}</p>
                  <p>Nationality of Team: {o.elements[1].elements[0].text}</p>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
}
