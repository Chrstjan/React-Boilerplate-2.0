import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";

export const useGraphFetch = (url, envKey, query) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [query],
    queryFn: async () => request(url || import.meta.env[envKey], query),
    staleTime: 600 * 10, //data is fresh for 1 minute,
    cacheTime: 3000 * 10, //In cache for 5 minutes
    retry: 1, //Retry fetch once if fail on the first fetch
  });
  return { data, isLoading, error };
};
