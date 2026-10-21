import { appointmentService } from "@/services/appoitments-service";
import { useQuery } from "@tanstack/react-query";

export const useBarberAvailability = (
  barberId: number | null,
  date: string,
) => {
  return useQuery({
    queryKey: ["barber-availability", barberId, date],
    queryFn: () =>
      appointmentService.getBarberAvailability(String(barberId), date),
    enabled: barberId !== null && date !== "",
  });
};
