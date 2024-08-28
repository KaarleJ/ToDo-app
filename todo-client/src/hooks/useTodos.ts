import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import useSWR from "swr";

const audience = import.meta.env.VITE_AUTH_AUDIENCE;

export default function useTodos() {
  const { getAccessTokenSilently, user } = useAuth0();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience,
          },
        });
        setToken(accessToken);
      } catch (e) {
        console.error(e);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  const todosFetcher = (url: string) =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    "http://localhost:8080/api/todos",
    todosFetcher
  );

  return { data, error, isLoading };
}
