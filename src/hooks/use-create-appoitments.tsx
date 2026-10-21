import {
  appointmentService,
  type CreateAppointmentPayload,
} from "@/services/appoitments-service";
import { useMutation } from "@tanstack/react-query";

export const useCreateAppointment = () => {
  return useMutation({
    mutationFn: (payload: CreateAppointmentPayload) =>
      appointmentService.create(payload),
  });
};
