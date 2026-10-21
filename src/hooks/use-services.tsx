import { service } from "@/services/service";
import { useQuery } from "@tanstack/react-query";

export default function useServices() {
  const {
    data: services,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: service.getServices,
    retry: false,
  });

  return { services, isLoading, error, isError };
}
