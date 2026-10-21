import { api } from "@/lib/api";

export type CreateAppointmentPayload = {
  barber_id: number;
  service_id: number;
  starts_at: string;
  customer_notes?: string;
};

export type CreateAppointmentResponse = {
  message: string;
  data: {
    id: number | string;
    status: "pending";
  };
};

export interface Appointments {
  message: string;
  data: Datum[];
}

export interface Datum {
  id: string;
  customer_id: string;
  barber_id: string;
  service_id: string;
  starts_at: Date;
  ends_at: Date;
  service_price: string;
  service_duration_minutes: number;
  status: string;
  customer_notes: null;
  created_at: Date;
  updated_at: Date;
  customer: Barber;
  barber: Barber;
  service: Service;
}

export interface Barber {
  id: string;
  name: string;
  email: string;
  phone: null | string;
}

export interface Service {
  id: string;
  name: string;
  price: string;
  duration_minutes: number;
}

export const appointmentService = {
  create: async (
    payload: CreateAppointmentPayload,
  ): Promise<CreateAppointmentResponse> => {
    const { data } = await api.post<CreateAppointmentResponse>(
      "/appointments",
      payload,
    );

    return data;
  },
  getAppoitments: async (): Promise<Appointments> => {
    const { data: response } = await api.get("/appointments");

    return response.data;
  },
  cancelAppoiment: async (appoinmentId: number) => {
    const { data: response } = await api.patch(
      `/appointments/${appoinmentId}/cancel`,
    );

    return response.data;
  },

  confirmAppoiment: async (appoinmentId: number) => {
    const { data: response } = await api.patch(
      `/appointments/${appoinmentId}/confirm`,
    );

    return response.data;
  },

  completeAppoitments: async (appoinmentId: number) => {
    const { data: response } = await api.patch(
      `/appointments/${appoinmentId}/complete`,
    );

    return response.data;
  },
  getBarberAvailability: async (id: string, date: string) => {
    const { data: response } = await api.get(`/barbers/${id}/availability`, {
      params: { date },
    });

    return response.data;
  },
};
