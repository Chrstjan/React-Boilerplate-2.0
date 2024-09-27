import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";

export const useGraphFetch = (
  url,
  envKey,
  query,
  querySelector,
  selectorValue
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [query],
    queryFn: async () =>
      request(
        url || import.meta.env[envKey], //This makes it able to use either a url to the api or a env key
        query, //This takes the query that gets fetched
        querySelector && selectorValue //This checks if querySelector and selectorValue are defined when the function gets called, Used to sending mutation fetches. Otherwise it dosen't send the mutation
          ? {
              [querySelector]: selectorValue,
            }
          : {}
      ),
    staleTime: 600 * 10, //data is fresh for 1 minute,
    cacheTime: 3000 * 10, //In cache for 5 minutes
    retry: 1, //Retry fetch once if fail on the first fetch
  });
  return { data, isLoading, error };
};
