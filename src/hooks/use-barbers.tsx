import { barberService } from "@/services/barbers";
import { useQuery } from "@tanstack/react-query";

export default function useBarbers() {
  const {
    data: barbers,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["barbers"],
    queryFn: barberService.getBarbers,
    retry: false,
  });

  return { barbers, isLoading, error, isError };
}
