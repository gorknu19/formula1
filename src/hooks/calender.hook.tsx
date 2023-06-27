import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

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
