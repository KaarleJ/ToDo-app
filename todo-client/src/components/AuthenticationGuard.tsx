import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType } from "react";
import { LoaderCircle as Loader } from "lucide-react";

export const AuthenticationGuard = ({
  component,
}: {
  component: ComponentType<object>;
}) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <div className="h-[30rem] w-full flex justify-center items-center"><Loader size={42} className="animate-spin" /></div>,
  });

  return <Component />;
};
