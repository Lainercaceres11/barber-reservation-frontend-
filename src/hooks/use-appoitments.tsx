import { appointmentService } from "@/services/appoitments-service";

import { useQuery } from "@tanstack/react-query";

export default function useAppoitments() {
  const {
    data: appoitments,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["apointments"],
    queryFn: appointmentService.getAppoitments,
    retry: false,
  });

  return { appoitments, isLoading, error, isError };
}
