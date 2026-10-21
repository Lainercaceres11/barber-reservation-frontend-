import { useEffect } from "react";
import { useAuth } from "../hooks/use-auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router";

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
      setFormError("root", { message: "Correo o contraseña incorrectos" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={closeDialog}
      />

      <div className="relative w-full max-w-120 rounded-xl border border-neutral-800 bg-[#111111] p-8 text-white shadow-2xl shadow-black/50">
        <button
          onClick={closeDialog}
          className="absolute right-4 top-4 text-neutral-400 transition-colors duration-200 hover:text-white"
          aria-label="Cerrar"
          type="button"
        >
          <X size={20} strokeWidth={2} />
        </button>

        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-black uppercase tracking-wider">
            DE VUELTA EN KLIP
          </h2>
          <p className="text-sm text-neutral-400">
            Un buen estilo nunca pasa de moda.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Correo electrónico:
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              placeholder="tu@correo.com"
              className="w-full rounded-lg border border-neutral-800 bg-[#0a0a0a] px-4 py-3.5 text-sm text-white placeholder-neutral-500 transition-all duration-200 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />
            {errors.email && (
              <p className="text-sm text-red-500" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium">
              Contraseña:
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password")}
              placeholder="Tu contraseña"
              className="w-full rounded-lg border border-neutral-800 bg-[#0a0a0a] px-4 py-3.5 text-sm text-white placeholder-neutral-500 transition-all duration-200 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />
            {errors.password && (
              <p className="text-sm text-red-500" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {errors.root && (
            <p className="text-red-500 text-center text-sm">
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
            onClick={onRegisterClick}
            className="font-bold text-[#d4b06a] transition-colors duration-200 hover:text-[#c2a05e]"
          >
            Crea tu cuenta
          </button>
        </div>
      </div>
    </div>
  );
}
