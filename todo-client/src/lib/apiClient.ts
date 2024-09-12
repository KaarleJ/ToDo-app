import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";
import { apiUrl, audience } from "./utils";

const apiClient = axios.create({
  baseURL: apiUrl,
});

export const useAxiosInterceptor = () => {
  const { getAccessTokenSilently } = useAuth0(); // Access the Auth0 token fetching method

  useMemo(() => {
    const requestInterceptor = apiClient.interceptors.request.use(
      async (config) => {
        try {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience,
            },
          });
          if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Add token to request headers
          }
        } catch (error) {
          console.error("Error fetching access token", error);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    
    return () => {
      apiClient.interceptors.request.eject(requestInterceptor);
    };
  }, [getAccessTokenSilently]);
};

export default apiClient;
