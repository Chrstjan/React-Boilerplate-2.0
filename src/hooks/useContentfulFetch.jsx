import { useEffect, useState } from "react";
import * as contentful from "contentful";

export const useContentfulFetch = async (
  spaceKey,
  accessTokenKey,
  contentType
) => {
  const [data, setData] = useState([]);

  const client = contentful.createClient({
    space: import.meta.env[spaceKey],
    accessToken: import.meta.env[accessTokenKey],
  });

  useEffect(() => {
    client
      .getEntries({ content_type: `${contentType}` })
      .then((res) => setData(res))
      .catch((error) => console.error(error));
  }, []);

  return { data };
};
