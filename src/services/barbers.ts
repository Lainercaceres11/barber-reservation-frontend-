import { api } from "../lib/api";

export interface BarbersData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  is_active: boolean;
  image_url: null | string;
  created_at: Date;
  updated_at: Date;
}

type BarbersResponse = {
  message: string;
  data: BarbersData[];
};

export const barberService = {
  getBarbers: async (): Promise<BarbersData[]> => {
    const { data: response } = await api.get<BarbersResponse>("/barbers");

    return response.data;
  },
};
