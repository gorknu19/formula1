'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import useSWR from 'swr';
import axios, { AxiosRequestConfig } from 'axios';
import fetcher from '@/util/fetcher';

// const CalenderHook = () => {
//   const { data: calender, error, isLoading } = useSWR("/api/calender", fetcher);
//   return { calender, error, isLoading };
// };

export let CalenderHook = () => {
  let { data, error, mutate } = useSWR(`/api/calender`, fetcher);

  let loading = !data && !error;

  return { calender: data, error, loading };
};

export default function Calender() {
  const { data: session } = useSession();
  const { calender, error, loading } = CalenderHook();
  if (calender) {
    let parsedCalender = JSON.parse(calender);
    let raceAmount = parsedCalender.elements[1].attributes.total;
    let season = parsedCalender.elements[1].elements[0].attributes.season;
    let races = parsedCalender.elements[1].elements[0].elements;
    console.log(parsedCalender.elements[1].elements[0].elements);
  }
  // async function getCalender() {
  // await axios
  //   .get("http://localhost:3000/api/calender")
  //   .then((res) => (calender = res.data));
  // }

  // const getCalender = useCallback(async () => {
  //   await axios
  //     .get("http://localhost:3000/api/calender")
  //     .then((res) => setCalender(res.data));
  // }, []);

  // useEffect(() => {
  //   getCalender();
  // }, [getCalender]);

  // console.log(calender);

  return (
    <>
      <div className={`text-center content-center m-5 `}></div>
    </>
  );
}
