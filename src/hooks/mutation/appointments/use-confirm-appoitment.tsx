import { appointmentService } from "@/services/appoitments-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useConfirmAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: appointmentService.confirmAppoiment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apointments"] });
    },
  });
}
