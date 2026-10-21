import { appointmentService } from "@/services/appoitments-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCancelAppoitment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: appointmentService.cancelAppoiment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apointments"] });
    },
  });
}
