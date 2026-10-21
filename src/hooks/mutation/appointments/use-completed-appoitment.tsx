import { appointmentService } from "@/services/appoitments-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCompletedAppoitment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: appointmentService.completeAppoitments,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apointments"] });
    },
  });
}
