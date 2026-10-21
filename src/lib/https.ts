import { api } from "./api";

export const http = {
  get: async <T>(url: string): Promise<T> => {
    const { data } = await api.get<T>(url);
    return data;
  },

  post: async <TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
  ): Promise<TResponse> => {
    const { data } = await api.post<TResponse>(url, body);
    return data;
  },

  put: async <TResponse, TBody = unknown>(
    url: string,
    body: TBody,
  ): Promise<TResponse> => {
    const { data } = await api.put<TResponse>(url, body);
    return data;
  },

  patch: async <TResponse, TBody = unknown>(
    url: string,
    body: TBody,
  ): Promise<TResponse> => {
    const { data } = await api.patch<TResponse>(url, body);
    return data;
  },

  delete: async <T>(url: string): Promise<T> => {
    const { data } = await api.delete<T>(url);
    return data;
  },
};
