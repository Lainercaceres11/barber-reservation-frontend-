import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth-service";
import { authToken } from "@/lib/auth-token";

export default function useLogin() {
  return useMutation({
    mutationFn: authService.login,

    onSuccess: ({ token }) => {
      authToken.set(token);
    },
  });
}
