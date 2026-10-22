import { useEffect } from "react";
import { useAuth } from "../hooks/use-auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type FormData = {
  email: string;
  password: string;
};

type LoginFormProps = {
  isOpen: boolean;
  onClose?: () => void;
  onRegisterClick?: () => void;
};

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z.string().min(8, "Password is too short").max(100),
});

export default function LoginForm({
  isOpen,
  onClose,
  onRegisterClick,
}: LoginFormProps) {
  const navigate = useNavigate();
  const closeDialog = onClose ?? (() => navigate("/"));

  const { login, isLoggingIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError: setFormError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await login(data);
      closeDialog();
    } catch {
      setFormError("root", {
        message: "Correo o contraseña incorrectos",
      });
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeDialog();
    }
  };

  const handleRegisterClick = () => {
    onRegisterClick?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-xl! gap-0 rounded-xl border border-neutral-800 bg-[#111111] p-8 text-white shadow-2xl shadow-black/50 [&>button:last-child]:text-neutral-400 [&>button:last-child]:hover:text-white">
        <DialogHeader className="mb-8 space-y-2 text-left">
          <DialogTitle className="text-3xl font-black uppercase tracking-wider text-white">
            DE VUELTA EN KLIP
          </DialogTitle>

          <DialogDescription className="text-sm text-neutral-400">
            Un buen estilo nunca pasa de moda.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="login-email" className="text-sm font-medium">
              Correo electrónico:
            </label>

            <input
              id="login-email"
              type="email"
              autoComplete="email"
              {...register("email")}
              placeholder="tu@correo.com"
              aria-invalid={!!errors.email}
              className="w-full rounded-lg border border-neutral-800 bg-[#0a0a0a] px-4 py-3.5 text-sm text-white placeholder-neutral-500 transition-all duration-200 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />

            {errors.email && (
              <p className="text-sm text-red-500" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="login-password" className="text-sm font-medium">
              Contraseña:
            </label>

            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              {...register("password")}
              placeholder="Tu contraseña"
              aria-invalid={!!errors.password}
              className="w-full rounded-lg border border-neutral-800 bg-[#0a0a0a] px-4 py-3.5 text-sm text-white placeholder-neutral-500 transition-all duration-200 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />

            {errors.password && (
              <p className="text-sm text-red-500" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {errors.root && (
            <p className="text-center text-sm text-red-500" role="alert">
              {errors.root.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoggingIn}
            className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#d4b06a] px-4 py-3.5 font-bold text-black transition-colors duration-200 hover:bg-[#c2a05e] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoggingIn ? "Iniciando sesión..." : "Iniciar sesión"}
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <span className="text-neutral-400">
            ¿Primera vez en KLIP Barber?{" "}
          </span>

          <button
            type="button"
            onClick={handleRegisterClick}
            className="font-bold text-[#d4b06a] transition-colors duration-200 hover:text-[#c2a05e]"
          >
            Crea tu cuenta
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
