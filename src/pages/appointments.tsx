import { useState } from "react";
import useAppoitments from "@/hooks/use-appoitments";
import {
  Calendar,
  Clock,
  Scissors,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import LoginForm from "@/components/login";
import useCancelAppoitment from "@/hooks/mutation/appointments/use-cancel-appoitment";
import { AppointmentsSkeleton } from "@/components/skeletons/appoitment-skeleton";
import toast from "react-hot-toast";

type AppointmentFilter = "upcoming" | "past" | "all";

const appointmentFilters: { value: AppointmentFilter; label: string }[] = [
  { value: "upcoming", label: "Próximas" },
  { value: "past", label: "Pasadas" },
  { value: "all", label: "Todas" },
];

const appointmentStatusLabels: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  completed: "Completada",
  cancelled: "Cancelada",
};

export default function Appointments() {
  const { isAuthenticated, user } = useAuth();

  const { appoitments, isLoading } = useAppoitments();
  const cancelMutation = useCancelAppoitment();

  const [activeTab, setActiveTab] = useState<AppointmentFilter>("upcoming");

  if (!isAuthenticated || !user) {
    return <LoginForm isOpen />;
  }

  const formatPrice = (priceString: string) => {
    return Number(priceString).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });
  };

  const appointmentsList = Array.isArray(appoitments)
    ? appoitments
    : appoitments?.data && Array.isArray(appoitments.data)
      ? appoitments.data
      : [];

  const now = Date.now();
  const filteredAppointments = appointmentsList.filter((appointment) => {
    const appointmentTime = new Date(appointment.starts_at).getTime();

    if (!Number.isFinite(appointmentTime)) {
      return false;
    }

    if (activeTab === "all") {
      return true;
    }

    return activeTab === "upcoming"
      ? appointmentTime >= now && appointment.status.toLowerCase() !== "cancelled"
      : appointmentTime < now;
  });

  if (isLoading) {
    return <AppointmentsSkeleton />;
  }

  const handleCancelMutation = async (id: number) => {
    try {
      await cancelMutation.mutateAsync(id);
    } catch {
      toast.error("No se pudo cancelar la cita. Inténtalo nuevamente.");
    }
  };

  return (
    <section className="min-h-screen bg-ink px-5 py-10 text-bone sm:px-8 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-medium tracking-[0.18em] text-brass">
              Tu agenda
            </p>
            <h1 className="mb-2 font-heading text-3xl font-medium tracking-tight sm:text-4xl">
              Mis citas
            </h1>
            <p className="text-neutral-400 text-sm">
              Gestiona tus visitas futuras y pasadas
            </p>
          </div>
          <Link
            to="/books"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-brass px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-brass-light"
          >
            <Calendar size={18} strokeWidth={2.5} />
            Nueva cita
          </Link>
        </div>
        <div
          role="group"
          aria-label="Filtrar citas"
          className="mb-6 flex items-center gap-5 border-b border-white/10"
        >
          {appointmentFilters.map((tab) => (
            <button
              key={tab.value}
              type="button"
              aria-pressed={activeTab === tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
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
            ? "cita encontrada"
            : "citas encontradas"}
        </p>

        {filteredAppointments.length === 0 ? (
          <div
            role="status"
            className="border-y border-white/10 bg-pine px-5 py-12 text-center"
          >
            <p className="text-neutral-400">
              {appointmentsList.length === 0
                ? "No tienes citas agendadas por el momento."
                : activeTab === "upcoming"
                  ? "No tienes citas próximas."
                  : "No se encontraron citas para este filtro."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAppointments.map((appointment) => {
              const dateObj = new Date(appointment.starts_at);
              const day = dateObj.getDate().toString().padStart(2, "0");
              const month = dateObj
                .toLocaleString("es-CO", { month: "short" })
                .replace(".", "");
              const dateLabel = dateObj.toLocaleDateString("es-CO", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              });
              const time = dateObj.toLocaleTimeString("es-CO", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });

              const isCancelled =
                appointment.status.toLowerCase() === "cancelled";

              return (
                <article
                  key={appointment.id}
                  className="flex flex-col border-y border-white/10 bg-pine transition-colors hover:bg-pine-light sm:flex-row"
                >
                  {/* Columna Izquierda: Fecha y Hora */}
                  <div className="flex shrink-0 flex-row items-center justify-center gap-4 border-b border-white/10 p-5 sm:w-32 sm:flex-col sm:items-start sm:justify-start sm:gap-1 sm:border-b-0 sm:border-r">
                    <time
                      dateTime={appointment.starts_at}
                      aria-label={dateLabel}
                      className="font-heading text-3xl font-medium leading-none text-brass"
                    >
                      {day}
                    </time>
                    <span
                      aria-hidden="true"
                      className="text-xs font-medium tracking-wider text-neutral-400"
                    >
                      {month}
                    </span>
                    <div className="ml-auto flex items-center text-xs text-neutral-400 sm:ml-0 sm:mt-2">
                      <Clock size={12} className="mr-1" />
                      {time}
                    </div>
                  </div>

                  <div className="flex grow flex-col justify-center p-5">
                    <h3 className="mb-1 font-heading text-lg font-medium text-bone">
                      {appointment.service.name}
                    </h3>

                    <div className="mb-3 flex items-center text-sm text-neutral-400">
                      <Scissors size={14} className="mr-2 text-neutral-500" />
                      con {appointment.barber.name}
                    </div>

                    <div className="font-medium text-brass">
                      {formatPrice(appointment.service_price)}
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-start justify-between gap-4 p-5 sm:w-48 sm:items-end">
                    {appointment.status.toLowerCase() === "pending" ? (
                      <div className="flex items-center gap-2 text-xs font-medium text-brass">
                        <AlertCircle size={12} />
                        Pendiente
                      </div>
                    ) : appointment.status.toLowerCase() === "confirmed" ? (
                      <div className="flex items-center gap-2 text-xs font-medium text-green-400">
                        <CheckCircle2 size={12} />
                        Confirmada
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
                        {appointmentStatusLabels[appointment.status.toLowerCase()] ??
                          appointment.status}
                      </div>
                    )}

                    {!isCancelled && (
                      <button
                        type="button"
                        disabled={cancelMutation.isPending}
                        onClick={() => handleCancelMutation(appointment.id)}
                        aria-label={`Cancelar cita de ${appointment.service.name} con ${appointment.barber.name}`}
                        className="flex min-h-10 w-full items-center justify-center gap-2 border border-red-900/50 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-950/30 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                      >
                        <X size={16} aria-hidden="true" />
                        Cancelar cita
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
