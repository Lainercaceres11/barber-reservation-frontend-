import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth-service";

export default function useRegister() {
  return useMutation({
    mutationFn: authService.register,
  });
}
