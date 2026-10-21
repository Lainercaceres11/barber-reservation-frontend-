import { authService } from "@/services/auth-service";
import { useQuery } from "@tanstack/react-query";

export default function useUserMe(token: string | null) {
  const {
    data: user,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: authService.me,
    enabled: Boolean(token),
    retry: false,
  });

  return { user, isLoading, error, isError };
}
