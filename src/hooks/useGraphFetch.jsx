import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";

/**
 * Custom hook that performs a GraphQL fetch using either a URL string or an env key as a string.
 * It also supports optional mutations if you want to fetch based on a specific ID.
 * If `querySelector` and `selectorValue` are not provided in the function call, it will perform a basic fetch without targeting a specific ID.
 * Usage:
 * Without mutation
 *  @example
 * ```js
 * import { useGraphFetch } from "./hooks/useGraphFetch";
 * import { allCharacters } from "./queries/allCharacters";
 * import { character } from "./queries/character";
 * const { data, isLoading, error } = useGraphFetch("https://swapi-graphql.netlify.app/.netlify/functions/index", undefined, character,)
 * ```
 * Usage:
 * With mutation
 *  @example
 * ```js
 * import { useGraphFetch } from "./hooks/useGraphFetch";
 * import { allCharacters } from "./queries/allCharacters";
 * import { character } from "./queries/character";
 * const characterId = "cGVvcGxlOjE=";
 * const { data, isLoading, error } = useGraphFetch("https://swapi-graphql.netlify.app/.netlify/functions/index", undefined, character, "personId", characterId)
 * ```
 * @param {string | undefined} url - url string to api. must be undefined if using env key instead
 * @param {string | undefined} envKey - string of the env key name. must be undefined if using url instead
 * @param {variable} query - variable with query in template string
 * @param {string} querySelector - string of the query mutation from the query file. Don't add anything if not using mutation
 * @param {variable} selectorValue - variable of the query mutaion that you want to send. Don't add anything if not using mutation
 *
 */

//Look at the jsDoc for guidance or ask me :)
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
