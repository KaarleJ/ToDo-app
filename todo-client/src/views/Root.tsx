import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Landing from "./Landing";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useAxiosInterceptor } from "@/lib/apiClient";

const domain = import.meta.env.VITE_AUTH_DOMAIN;
const clientId = import.meta.env.VITE_AUTH_ID;
const audience = import.meta.env.VITE_AUTH_AUDIENCE;

if (!domain || !clientId) {
  throw new Error("Missing Auth0 environment variables");
}

export default function Root() {
  const { pathname } = useLocation();
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
      <AxiosWrapper>
        <div className="font-sans antialiased min-h-screen mt-20">
          <Navbar />
          <div className="md:px-28 py-5 md:py-24 flex flex-col justify-start items-start w-full">
            {pathname === "/" ? <Landing /> : <Outlet />}
          </div>
          <Footer />
        </div>
      </AxiosWrapper>
    </Auth0Provider>
  );
}

function AxiosWrapper({ children }: { children: React.ReactNode }) {
  useAxiosInterceptor();

  return <>{children}</>;
}
