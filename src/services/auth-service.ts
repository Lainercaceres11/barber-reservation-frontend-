import type { User } from "@/context/auth-context";
import { api } from "../lib/api";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type RegisterCredentials = {
  name: string;
  email: string;
  phone?: string;
  password: string;
};

type RegisterResponse = {
  message: string;
  data: unknown;
};

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>("/auth/login", credentials);

    return data;
  },

  me: async (): Promise<User> => {
    const { data: response } = await api.get<{
      message: string;
      data: User;
    }>("/auth/me");

    return response.data;
  },

  register: async (
    credentials: RegisterCredentials,
  ): Promise<RegisterResponse> => {
    try {
      const { data } = await api.post<RegisterResponse>(
        "/auth/register",
        credentials,
      );

      return data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ??
        error.response?.data?.detail ??
        "No fue posible crear la cuenta.";

      throw new Error(message);
    }
  },
};
