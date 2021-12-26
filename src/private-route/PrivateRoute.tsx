// A wrapper for <Route> that redirects to the login

import { Redirect, Route } from "react-router";
import { useAuthentication, useRole } from "../providers/AuthenticateProvider";
import { Role } from "../types/role";

const redirectTo = ({ role, userRole }: { role: Role; userRole?: Role }) => {
  switch (role) {
    case Role.ADMIN: {
      return userRole === Role.ADMIN ? null : "/dashboard";
    }
    case Role.USER: {
      return userRole === Role.USER ? null : "/dashboard-admin";
    }
  }
};

// screen if you're not yet authenticated.
export function PrivateRoute({
  children,
  ...rest
}: {
  children: any;
  path: string;
  role: Role;
}) {
  const authentication = useAuthentication();
  const role = useRole();

  const redirect = redirectTo({ role: rest.role, userRole: role });

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authentication ? (
          redirect ? (
            <Redirect
              to={{
                pathname: redirect,
                state: { from: location },
              }}
            />
          ) : (
            children
          )
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
