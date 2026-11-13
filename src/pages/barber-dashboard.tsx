import { useMemo, useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
} from "lucide-react";

import useAppoitments from "@/hooks/use-appoitments";
import useConfirmAppointment from "@/hooks/mutation/appointments/use-confirm-appoitment";
import useCompletedAppoitment from "@/hooks/mutation/appointments/use-completed-appoitment";
import useCancelAppoitment from "@/hooks/mutation/appointments/use-cancel-appoitment";
import { useAuth } from "@/hooks/use-auth";

type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

interface Appointment {
  id: string | number;
  customer_id: string | number;
  barber_id: string | number;
  service_id: string | number;
  starts_at: string;
  ends_at: string;
  service_price: string | number;
  service_duration_minutes: number;
  status: AppointmentStatus;
  customer_notes: string | null;
  created_at: string;
  updated_at: string;
  customer: {
    id: string | number;
    name: string;
    email: string;
    phone: string | null;
  };
  barber: {
    id: string | number;
    name: string;
    email: string;
    phone: string | null;
  };
  service: {
    id: string | number;
    name: string;
    price: string | number;
    duration_minutes: number;
  };
}

const tabs = [
  { label: "Todas", value: "all" },
  { label: "Pendientes", value: "pending" },
  { label: "Confirmadas", value: "confirmed" },
  { label: "Completadas", value: "completed" },
  { label: "Canceladas", value: "cancelled" },
] as const;

const statusLabels: Record<AppointmentStatus, string> = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  completed: "Completada",
  cancelled: "Cancelada",
};

function getLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getAppointmentDateKey(value: string): string {
  return getLocalDateKey(new Date(value));
}

function getStatusClass(status: AppointmentStatus): string {
  switch (status) {
    case "pending":
      return "text-yellow-500";
    case "confirmed":
      return "text-blue-400";
    case "completed":
      return "text-green-500";
    case "cancelled":
      return "text-red-500";
  }
}

function getAppointmentArray(response: unknown): Appointment[] {
  if (Array.isArray(response)) {
    return response as Appointment[];
  }

  if (!response || typeof response !== "object") {
    return [];
  }

  const result = response as {
    data?: unknown;
    appointments?: unknown;
    appoitments?: unknown;
  };

  // Respuesta del backend: { message, data: [...] }
  if (Array.isArray(result.data)) {
    return result.data as Appointment[];
  }

  // Respuesta de Axios: { data: { message, data: [...] } }
  if (result.data && typeof result.data === "object") {
    const nested = result.data as {
      data?: unknown;
      appointments?: unknown;
      appoitments?: unknown;
    };

    if (Array.isArray(nested.data)) {
      return nested.data as Appointment[];
    }

    if (Array.isArray(nested.appointments)) {
      return nested.appointments as Appointment[];
    }

    if (Array.isArray(nested.appoitments)) {
      return nested.appoitments as Appointment[];
    }
  }

  if (Array.isArray(result.appointments)) {
    return result.appointments as Appointment[];
  }

  if (Array.isArray(result.appoitments)) {
    return result.appoitments as Appointment[];
  }

  return [];
}

export default function BarberDashboard() {
  const { appoitments, isLoading, error } = useAppoitments();
  const { user } = useAuth();

  const confirmMutation = useConfirmAppointment();
  const completedMutation = useCompletedAppoitment();
  const cancelMutation = useCancelAppoitment();

  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [activeTab, setActiveTab] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<string | number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const barberName = user?.name;

  const appointmentsList = useMemo(
    () => getAppointmentArray(appoitments),
    [appoitments],
  );

  const selectedDateKey = getLocalDateKey(selectedDate);

  const dayAppointments = useMemo(() => {
    return appointmentsList.filter((appointment) => {
      const date = new Date(appointment.starts_at);

      return (
        !Number.isNaN(date.getTime()) &&
        getAppointmentDateKey(appointment.starts_at) === selectedDateKey
      );
    });
  }, [appointmentsList, selectedDateKey]);

  const stats = useMemo(
    () => ({
      total: dayAppointments.length,
      pending: dayAppointments.filter(
        (appointment) => appointment.status === "pending",
      ).length,
      confirmed: dayAppointments.filter(
        (appointment) => appointment.status === "confirmed",
      ).length,
      completed: dayAppointments.filter(
        (appointment) => appointment.status === "completed",
      ).length,
    }),
    [dayAppointments],
  );

  const filteredAppointments = useMemo(() => {
    if (activeTab === "all") {
      return dayAppointments;
    }

    return dayAppointments.filter(
      (appointment) => appointment.status === activeTab,
    );
  }, [dayAppointments, activeTab]);

  const formatDateHeader = (date: Date) => {
    return date
      .toLocaleDateString("es-CO", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      .toUpperCase();
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "--:--";
    }

    return date.toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const changeDay = (amount: number) => {
    setSelectedDate((currentDate) => {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + amount);
      return newDate;
    });
  };

  const handleUpdateAppointment = async (appointment: Appointment) => {
    setActionError(null);
    setUpdatingId(appointment.id);

    try {
      if (appointment.status === "pending") {
        await confirmMutation.mutateAsync(Number(appointment.id));
      } else if (appointment.status === "confirmed") {
        await completedMutation.mutateAsync(Number(appointment.id));
      }
    } catch (error) {
      console.error("Error al actualizar la cita:", error);
      setActionError(
        "No fue posible actualizar la cita. Inténtalo nuevamente.",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCancelAppointment = async (appointment: Appointment) => {
    setActionError(null);
    setUpdatingId(appointment.id);

    try {
      await cancelMutation.mutateAsync(Number(appointment.id));
    } catch (error) {
      console.error("Error al cancelar la cita:", error);
      setActionError("No fue posible cancelar la cita. Inténtalo nuevamente.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) {
    return (
      <section
        aria-live="polite"
        aria-busy="true"
        className="flex min-h-screen items-center justify-center bg-ink text-bone"
      >
        <p className="text-sm text-neutral-400">Cargando agenda...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section
        role="alert"
        className="flex min-h-screen flex-col items-center justify-center gap-3 bg-ink text-bone"
      >
        <p className="text-red-400">Error al cargar las citas.</p>
        <p className="text-sm text-neutral-500">
          Verifica la conexión con el backend e inténtalo nuevamente.
        </p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-ink px-5 py-10 text-bone sm:px-8 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-3 text-xs font-medium tracking-[0.18em] text-brass">
              <span aria-hidden="true" className="h-px w-8 bg-brass/60" />
              ESPACIO DEL BARBERO
            </div>

            <h1 className="mb-2 font-heading text-3xl font-medium tracking-tight sm:text-4xl">
              Buen día, {barberName}.
            </h1>

            <p className="text-sm text-neutral-400">
              Tu agenda. Tu ritmo. Tu mejor trabajo.
            </p>
          </div>

        </header>

        <div className="mb-8 border-t border-white/10" />

        <div className="mb-10 grid grid-cols-2 border-y border-white/10 sm:grid-cols-4">
          <div className="border-b border-white/10 py-5 pr-4 sm:border-b-0 sm:border-r sm:pr-6">
            <p className="mb-3 text-xs tracking-wide text-neutral-400">
              Citas del día
            </p>
            <p className="font-heading text-3xl font-medium text-bone">{stats.total}</p>
          </div>

          <div className="border-b border-white/10 py-5 pl-4 sm:border-b-0 sm:border-r sm:px-6">
            <p className="mb-3 text-xs tracking-wide text-neutral-400">
              Pendientes
            </p>
            <p className="font-heading text-3xl font-medium text-brass">
              {stats.pending}
            </p>
          </div>

          <div className="py-5 pr-4 sm:border-r sm:px-6">
            <p className="mb-3 text-xs tracking-wide text-neutral-400">
              Confirmadas
            </p>
            <p className="font-heading text-3xl font-medium text-blue-300">
              {stats.confirmed}
            </p>
          </div>

          <div className="py-5 pl-4 sm:pl-6">
            <p className="mb-3 text-xs tracking-wide text-neutral-400">
              Completadas
            </p>
            <p className="font-heading text-3xl font-medium text-green-400">
              {stats.completed}
            </p>
          </div>
        </div>

        <div className="mb-8 border-t border-white/10" />

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-brass" aria-hidden="true" />
            <h2 className="font-heading text-lg font-medium tracking-tight text-bone sm:text-2xl">
              {formatDateHeader(selectedDate)}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Día anterior"
              onClick={() => changeDay(-1)}
              className="flex size-10 items-center justify-center text-neutral-400 transition-colors hover:text-brass"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() => setSelectedDate(new Date())}
              className="min-h-10 border border-white/15 px-5 py-2 text-sm text-neutral-300 transition-colors hover:border-brass hover:text-brass"
            >
              Hoy
            </button>

            <button
              type="button"
              aria-label="Día siguiente"
              onClick={() => changeDay(1)}
              className="flex size-10 items-center justify-center text-neutral-400 transition-colors hover:text-brass"
            >
              <ChevronRight size={20} />
            </button>

          </div>
        </div>

        <div
          role="group"
          aria-label="Filtrar citas por estado"
          className="mb-2 flex gap-5 overflow-x-auto border-b border-white/10"
        >
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              aria-pressed={activeTab === tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.value
                  ? "border-brass text-brass"
                  : "border-transparent text-neutral-400 hover:text-bone"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {filteredAppointments.length}{" "}
          {filteredAppointments.length === 1
            ? "cita en la agenda"
            : "citas en la agenda"}
        </p>

        {actionError && (
          <div
            role="alert"
            className="mt-4 rounded-lg border border-red-900 bg-red-950/30 p-3 text-sm text-red-300"
          >
            {actionError}
          </div>
        )}

        <div className="flex flex-col">
          {filteredAppointments.length === 0 ? (
            <div             className="mt-4 border-y border-white/10 bg-pine py-16 text-center">
              <Calendar size={30} className="mx-auto mb-3 text-neutral-600" />

              <p className="text-neutral-300">
                No hay citas para este día o filtro.
              </p>

              <p className="mt-2 text-sm text-neutral-500">
                {appointmentsList.length === 0
                  ? "No se recibieron citas desde el backend."
                  : `Hay ${appointmentsList.length} citas en total. Prueba con otra fecha.`}
              </p>
            </div>
          ) : (
            filteredAppointments.map((appointment) => {
              const isUpdating = updatingId === appointment.id;
              const canConfirm = appointment.status === "pending";
              const canComplete = appointment.status === "confirmed";

              return (
                <article
                  key={appointment.id}
                  className="flex flex-col justify-between gap-4 border-b border-white/10 px-2 py-6 transition-colors hover:bg-pine sm:flex-row sm:items-center"
                >
                  <div className="flex items-start gap-6 sm:items-center">
                    <span className="w-12 shrink-0 pt-1 text-sm font-semibold text-brass sm:pt-0">
                      {formatTime(appointment.starts_at)}
                    </span>

                    <div className="min-w-0">
                      <h3 className="mb-1 wrap-break-word font-heading text-base font-medium capitalize text-bone">
                        {appointment.customer?.name ?? "Cliente sin nombre"}
                      </h3>

                      <p className="text-xs text-neutral-400">
                        {appointment.service?.name ?? "Servicio no disponible"}
                        {" · "}
                        {appointment.service?.duration_minutes ??
                          appointment.service_duration_minutes}{" "}
                        min
                      </p>

                      <p className="mt-1 text-xs text-neutral-500">
                        {appointment.customer?.phone ?? "Sin teléfono"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                    <span
                      className={`flex items-center gap-1.5 text-xs ${getStatusClass(
                        appointment.status,
                      )}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {statusLabels[appointment.status] ?? appointment.status}
                    </span>

                    <span className="text-sm text-neutral-300">
                      $
                      {Number(appointment.service_price).toLocaleString(
                        "es-CO",
                      )}
                    </span>

                    <div className="ml-auto flex items-center gap-2 sm:ml-2">
                      {(canConfirm || canComplete) && (
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => handleUpdateAppointment(appointment)}
                          className="flex items-center gap-2 rounded-md border border-neutral-700 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Check size={14} />
                          {isUpdating
                            ? "Actualizando..."
                            : canConfirm
                              ? "Confirmar"
                              : "Completar"}
                        </button>
                      )}

                      {appointment.status !== "completed" &&
                        appointment.status !== "cancelled" && (
                          <button
                            type="button"
                            disabled={isUpdating}
                            aria-label={`Cancelar cita de ${appointment.customer?.name ?? "cliente"}`}
                            onClick={() => handleCancelAppointment(appointment)}
                            className="rounded-md p-1.5 text-neutral-500 transition-colors hover:text-red-500 disabled:opacity-50"
                          >
                            <X size={16} />
                          </button>
                        )}
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
