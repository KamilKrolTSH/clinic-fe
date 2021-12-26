// A wrapper for <Route> that redirects to the login

import { Redirect, Route } from "react-router";
import { useAuthentication, useRole } from "../providers/AuthenticateProvider";
import { Role } from "../types/role";

// screen if you're not yet authenticated.
export function NoAuthRoute({
  children,
  ...rest
}: {
  children: any;
  path: string;
}) {
  const authentication = useAuthentication();
  const role = useRole();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authentication && role ? (
          <Redirect
            to={{
              pathname: role === Role.ADMIN ? "/admin-dashboard" : "/dashboard",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
}
