import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from "./components/theme-provider.tsx";
import Layout from "./Layout.tsx";

const domain = import.meta.env.VITE_AUTH_DOMAIN;
const clientId = import.meta.env.VITE_AUTH_ID;

if (!domain || !clientId) {
  throw new Error("Missing Auth0 environment variables");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
          <App />
        </Layout>
      </ThemeProvider>
    </Auth0Provider>
  </StrictMode>
);
