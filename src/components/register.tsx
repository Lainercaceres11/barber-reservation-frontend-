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
      <DialogContent className="w-[calc(100%-2rem)] max-w-lg! gap-0 rounded-sm border border-white/10 bg-pine p-6 text-bone shadow-2xl shadow-black/40 sm:p-8 [&>button:last-child]:text-neutral-400 [&>button:last-child]:hover:text-bone">
        <DialogHeader className="mb-7 text-left">
          <p className="mb-2 text-xs font-medium tracking-[0.16em] text-brass">
            KLIP BARBERSHOP
          </p>

          <DialogTitle className="font-heading text-2xl font-medium tracking-tight text-bone">
            Crea tu cuenta
          </DialogTitle>

          <DialogDescription className="mt-2 text-sm leading-6 text-neutral-400">
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
              aria-describedby={errors.name ? "register-name-error" : undefined}
              {...register("name")}
              className="w-full rounded-sm border border-white/10 bg-ink px-4 py-3 text-bone outline-none transition focus:border-brass"
              placeholder="Tu nombre"
            />

            {errors.name && (
              <p id="register-name-error" className="mt-1 text-sm text-red-400">
                {errors.name.message}
              </p>
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
              aria-describedby={
                errors.email ? "register-email-error" : undefined
              }
              {...register("email")}
              className="w-full rounded-sm border border-white/10 bg-ink px-4 py-3 text-bone outline-none transition focus:border-brass"
              placeholder="correo@ejemplo.com"
            />

            {errors.email && (
              <p id="register-email-error" className="mt-1 text-sm text-red-400">
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
              className="w-full rounded-sm border border-white/10 bg-ink px-4 py-3 text-bone outline-none transition focus:border-brass"
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
              aria-describedby={
                errors.password ? "register-password-error" : undefined
              }
              {...register("password")}
              className="w-full rounded-sm border border-white/10 bg-ink px-4 py-3 text-bone outline-none transition focus:border-brass"
              placeholder="Mínimo 8 caracteres"
            />

            {errors.password && (
              <p
                id="register-password-error"
                className="mt-1 text-sm text-red-400"
              >
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
            className="min-h-12 w-full rounded-sm bg-brass px-4 py-3 font-semibold text-ink transition-colors hover:bg-brass-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-400">
          ¿Ya tienes una cuenta?{" "}
          <button
            type="button"
            onClick={handleLoginClick}
            className="font-medium text-brass hover:text-brass-light hover:underline"
          >
            Inicia sesión
          </button>
        </p>

        <button
          type="button"
          onClick={handleClose}
          className="mt-4 min-h-10 w-full text-sm text-neutral-500 transition hover:text-bone"
        >
          Cancelar
        </button>
      </DialogContent>
    </Dialog>
  );
}
