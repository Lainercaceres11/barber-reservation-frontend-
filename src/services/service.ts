import { api } from "../lib/api";

export type ServiceData = {
  id: string;
  name: string;
  image_url: string | null;
  description: string;
  price: number;
  duration_minutes: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type ServicesResponse = {
  message: string;
  data: ServiceData[];
};

export const service = {
  getServices: async (): Promise<ServiceData[]> => {
    const { data: response } = await api.get<ServicesResponse>("/services");

    return response.data;
  },
};
