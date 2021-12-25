import React, { useContext, useEffect, useState } from "react";
import { Role } from "../types/role";
import { decode } from "jsonwebtoken";

const AuthenticateContext = React.createContext<undefined | string>(undefined);
const UpdateAuthenticateContext = React.createContext(undefined as any);
const RoleContext = React.createContext<Role>(Role.USER);

export function useAuthentication() {
  return useContext(AuthenticateContext);
}

export function useUpdateAuthentication() {
  return useContext(UpdateAuthenticateContext);
}

export function useRole() {
  return useContext(RoleContext);
}

export function AuthenticateProvider({ children }: { children: any }) {
  const [authenticateContext, setAuthenticateContext] = useState<
    string | undefined
  >(undefined);

  const [roleContext, setRoleContext] = useState<Role>(Role.USER);

  useEffect(() => {
    localStorage.setItem("authentication", authenticateContext || "");

    if (authenticateContext) {
      const decoded = decode(authenticateContext) as { role: Role };
      setRoleContext(decoded.role);
    }
  }, [authenticateContext]);

  return (
    <AuthenticateContext.Provider value={authenticateContext}>
      <UpdateAuthenticateContext.Provider value={setAuthenticateContext}>
        <RoleContext.Provider value={roleContext}>
          {children}
        </RoleContext.Provider>
      </UpdateAuthenticateContext.Provider>
    </AuthenticateContext.Provider>
  );
}
