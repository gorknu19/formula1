export const fetcher = (url: string, config?: RequestInit | undefined) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  });
