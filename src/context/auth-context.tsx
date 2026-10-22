import { createContext, useState, type ReactNode } from "react";

import { authToken } from "@/lib/auth-token";
import type { LoginCredentials } from "@/services/auth-service";

import useUserMe from "@/hooks/use-user-me";
import useLogin from "@/hooks/mutation/auth/use-login";
import useLogout from "@/hooks/mutation/auth/use-logout";

export type UserRole = "customer" | "barber" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type AuthContextType = {
  token: string | null;
  user: User | undefined;
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  isLoadingUser: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => authToken.get());

  const loginMutation = useLogin();
  const clearSession = useLogout();

  const { user, isLoading: isLoadingUser } = useUserMe(token);

  const login = async (credentials: LoginCredentials) => {
    const result = await loginMutation.mutateAsync(credentials);
    setToken(result.token);
  };

  const logout = () => {
    clearSession();
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user: token ? user : undefined,
        isAuthenticated: Boolean(token && user),
        isLoggingIn: loginMutation.isPending,
        isLoadingUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
