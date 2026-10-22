import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const registerSchema = z.object({
  name: z.string().trim().min(2, "Ingresa tu nombre."),
  email: z.string().trim().email("Ingresa un correo válido."),
  phone: z.string().optional(),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

type RegisterFormProps = {
  open: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  onSubmitRegister: (data: RegisterFormData) => Promise<void>;
};

export default function RegisterForm({
  open,
  onClose,
  onLoginClick,
  onSubmitRegister,
}: RegisterFormProps) {
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      handleClose();
    }
  };

  const handleClose = () => {
    reset();
    clearErrors();
    setSubmitError("");
    onClose();
  };

  const onSubmit = async (data: RegisterFormData) => {
    setSubmitError("");

    try {
      await onSubmitRegister(data);

      toast.success("Usuario registrado correctamente", {
        position: "bottom-right",
      });

      reset();
      clearErrors();
      onClose();
    } catch (error) {
      toast.error("No se pudo registrar el usuario");
      setSubmitError(
        error instanceof Error
          ? error.message
          : "No fue posible crear la cuenta.",
      );
    }
  };

  const handleLoginClick = () => {
    reset();
    clearErrors();
    setSubmitError("");
    onLoginClick();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-xl! gap-0 rounded-xl border border-neutral-800 bg-[#111111] p-8 text-white shadow-2xl shadow-black/50 [&>button:last-child]:text-neutral-400 [&>button:last-child]:hover:text-white">
        <DialogHeader className="mb-7 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4b06a]">
            KLIP BARBERSHOP
          </p>

          <DialogTitle className="text-2xl font-bold text-white">
            Crea tu cuenta
          </DialogTitle>

          <DialogDescription className="mt-2 text-sm text-gray-400">
            Regístrate para gestionar tus citas.
          </DialogDescription>
        </DialogHeader>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <label htmlFor="register-name" className="mb-1 block text-sm">
              Nombre completo
            </label>

            <input
              id="register-name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              {...register("name")}
              className="w-full rounded-lg border border-white/10 bg-[#222] px-4 py-3 outline-none transition focus:border-[#d4b06a]"
              placeholder="Tu nombre"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="register-email" className="mb-1 block text-sm">
              Correo electrónico
            </label>

            <input
              id="register-email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register("email")}
              className="w-full rounded-lg border border-white/10 bg-[#222] px-4 py-3 outline-none transition focus:border-[#d4b06a]"
              placeholder="correo@ejemplo.com"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="register-phone" className="mb-1 block text-sm">
              Teléfono <span className="text-gray-500">(opcional)</span>
            </label>

            <input
              id="register-phone"
              type="tel"
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              {...register("phone")}
              className="w-full rounded-lg border border-white/10 bg-[#222] px-4 py-3 outline-none transition focus:border-[#d4b06a]"
              placeholder="Tu número de teléfono"
            />
          </div>

          <div>
            <label htmlFor="register-password" className="mb-1 block text-sm">
              Contraseña
            </label>

            <input
              id="register-password"
              type="password"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              {...register("password")}
              className="w-full rounded-lg border border-white/10 bg-[#222] px-4 py-3 outline-none transition focus:border-[#d4b06a]"
              placeholder="Mínimo 8 caracteres"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {submitError && (
            <p role="alert" className="text-sm text-red-400">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[#d4b06a] px-4 py-3 font-bold text-black transition hover:bg-[#e4c17f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          ¿Ya tienes una cuenta?{" "}
          <button
            type="button"
            onClick={handleLoginClick}
            className="font-bold text-[#d4b06a] hover:underline"
          >
            Inicia sesión
          </button>
        </p>

        <button
          type="button"
          onClick={handleClose}
          className="mt-4 w-full text-sm text-gray-500 transition hover:text-white"
        >
          Cancelar
        </button>
      </DialogContent>
    </Dialog>
  );
}
