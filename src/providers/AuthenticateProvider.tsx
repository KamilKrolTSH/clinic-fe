import React, { useContext, useEffect, useState } from "react";
import { Role } from "../types/role";
import { decode } from "jsonwebtoken";

const AuthenticateContext = React.createContext<string | undefined>(undefined);
const UpdateAuthenticateContext = React.createContext(undefined as any);
const RoleContext = React.createContext<Role | undefined>(undefined);

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

  const [roleContext, setRoleContext] = useState<Role | undefined>(undefined);

  useEffect(() => {
    localStorage.setItem("authentication", authenticateContext || "");

    if (authenticateContext) {
      const decoded = decode(authenticateContext) as { role: Role };
      setRoleContext(decoded.role);
    } else {
      setRoleContext(undefined);
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
