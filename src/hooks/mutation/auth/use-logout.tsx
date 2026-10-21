import { useQueryClient } from "@tanstack/react-query";
import { authToken } from "@/lib/auth-token";

export default function useLogout() {
  const queryClient = useQueryClient();

  return () => {
    authToken.clear();

    queryClient.setQueryData(["auth", "me"], undefined);

    queryClient.removeQueries({
      predicate: (query) => query.queryKey[0] !== "auth",
    });
  };
}
