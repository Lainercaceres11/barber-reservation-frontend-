import { useCreateAppointment } from "@/hooks/use-create-appoitments";
import { useState } from "react";
import { toast } from "../ui/toast";

import { DatePickerTime } from "../time-picker";

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

    if (serviceId === null || barberId === null || !startsAt) {
      setValidationError("Selecciona el servicio, el barbero y la fecha.");
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
          toast.add({
            type: "success",
            title: "¡Cita solicitada!",
            description: "Tu cita está pendiente de confirmación del barbero.",
          });
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-neutral-800 bg-[#111111] p-6"
    >
      <div>
        <h2 className="text-xl font-bold">Fecha y hora</h2>
        <p className="mt-2 text-sm text-neutral-400">
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
          className="w-full rounded-lg border border-neutral-700 bg-black p-3 text-white placeholder:text-neutral-500"
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

      <div className="flex justify-between border-t border-neutral-800 pt-6">
        <button
          type="button"
          onClick={onBack}
          disabled={createAppointment.isPending}
          className="text-neutral-300 hover:text-white disabled:opacity-40"
        >
          Volver
        </button>

        <button
          type="submit"
          disabled={createAppointment.isPending || createAppointment.isSuccess}
          className="rounded-lg bg-yellow-500 px-6 py-2 font-semibold text-black hover:bg-yellow-400 disabled:opacity-40"
        >
          {createAppointment.isPending ? "Solicitando..." : "Confirmar cita"}
        </button>
      </div>
    </form>
  );
}
