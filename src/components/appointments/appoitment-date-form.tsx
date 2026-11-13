import { useCreateAppointment } from "@/hooks/use-create-appoitments";
import { useState } from "react";

import { DatePickerTime } from "../time-picker";
import toast from "react-hot-toast";

type AppointmentDateFormProps = {
  serviceId: number | null;
  barberId: number | null;
  startsAt: string;
  customerNotes: string;
  serviceDuration: number;
  onChange: (values: { startsAt?: string; customerNotes?: string }) => void;
  onBack: () => void;
};

export default function AppointmentDateForm({
  serviceId,
  barberId,
  startsAt,
  customerNotes,
  serviceDuration,
  onChange,
  onBack,
}: AppointmentDateFormProps) {
  const createAppointment = useCreateAppointment();
  const [validationError, setValidationError] = useState("");

  const now = new Date();
  const localNow = new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 16);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationError("");

    if (
      serviceId === null ||
      barberId === null ||
      !/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(startsAt)
    ) {
      setValidationError(
        "Selecciona el servicio, el barbero, la fecha y una hora disponible.",
      );
      return;
    }

    const selectedDate = new Date(startsAt);

    if (Number.isNaN(selectedDate.getTime())) {
      setValidationError("Selecciona una fecha válida.");
      return;
    }

    if (selectedDate.getTime() <= Date.now()) {
      setValidationError("Selecciona una fecha y hora futuras.");
      return;
    }

    createAppointment.mutate(
      {
        service_id: serviceId,
        barber_id: barberId,
        starts_at: selectedDate.toISOString(),
        customer_notes: customerNotes.trim() || undefined,
      },
      {
        onSuccess: () => {
          toast.success("Cita agendada correctamente!", {
            position: "bottom-right",
          });
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 border-y border-white/10 bg-pine p-5 sm:p-7"
    >
      <div>
        <h2 className="font-heading text-xl font-medium tracking-tight text-bone">
          Fecha y hora
        </h2>
        <p className="mt-2 text-sm leading-6 text-neutral-400">
          Selecciona cuándo quieres venir a la barbería.
        </p>
      </div>

      <div className="space-y-3">
        <DatePickerTime
          value={startsAt}
          min={localNow}
          barberId={barberId}
          serviceDuration={serviceDuration}
          onChange={(value) => {
            setValidationError("");
            onChange({ startsAt: value });
          }}
        />

        <p className="text-xs text-neutral-500">
          Selecciona el día y la hora que mejor te convengan.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="customerNotes" className="text-sm text-neutral-300">
          Notas (opcional)
        </label>

        <textarea
          id="customerNotes"
          rows={3}
          value={customerNotes}
          onChange={(event) => onChange({ customerNotes: event.target.value })}
          placeholder="¿Alguna indicación para el barbero?"
          className="w-full border border-white/15 bg-ink p-3 text-bone placeholder:text-neutral-500 focus-visible:border-brass"
        />
      </div>

      {validationError && (
        <p role="alert" className="text-sm text-red-400">
          {validationError}
        </p>
      )}

      {createAppointment.isError && (
        <p role="alert" className="text-sm text-red-400">
          {createAppointment.error instanceof Error
            ? createAppointment.error.message
            : "No se pudo solicitar la cita. Inténtalo nuevamente."}
        </p>
      )}

      <div className="flex justify-between border-t border-white/10 pt-5">
        <button
          type="button"
          onClick={onBack}
          disabled={createAppointment.isPending}
          className="min-h-11 px-2 text-sm font-medium text-neutral-400 transition-colors hover:text-bone disabled:opacity-40"
        >
          Volver
        </button>

        <button
          type="submit"
          disabled={createAppointment.isPending || createAppointment.isSuccess}
          className="min-h-11 rounded-sm bg-brass px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-brass-light disabled:opacity-40"
        >
          {createAppointment.isPending ? "Solicitando..." : "Confirmar cita"}
        </button>
      </div>
    </form>
  );
}
