import { useAxiosInterceptor } from "@/lib/apiClient";
import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const domain = import.meta.env.VITE_AUTH_DOMAIN;
const clientId = import.meta.env.VITE_AUTH_ID;
const audience = import.meta.env.VITE_AUTH_AUDIENCE;

if (!domain || !clientId) {
  throw new Error("Missing Auth0 environment variables");
}

export default function Auth0ProviderWithNavigate({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  const onRedirectCallback = (appState: AppState | undefined) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience,
        scope: "access:todos profile email",
      }}
      onRedirectCallback={onRedirectCallback}
    >
      <AxiosWrapper>{children}</AxiosWrapper>
    </Auth0Provider>
  );
}

function AxiosWrapper({ children }: { children: React.ReactNode }) {
  useAxiosInterceptor();

  return <>{children}</>;
}
