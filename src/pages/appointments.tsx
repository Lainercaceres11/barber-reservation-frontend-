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
    <section className="bg-[#0a0a0a] min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-1">
              MIS CITAS
            </h1>
            <p className="text-neutral-400 text-sm">
              Gestiona tus visitas futuras y pasadas
            </p>
          </div>
          <Link
            to="/books"
            className="flex items-center justify-center gap-2 bg-[#d4b06a] hover:bg-[#c2a05e] text-black font-bold py-2.5 px-6 rounded-lg transition-colors duration-200"
          >
            <Calendar size={18} strokeWidth={2.5} />
            Nueva cita
          </Link>
        </div>
        <div
          role="group"
          aria-label="Filtrar citas"
          className="flex items-center gap-2 mb-6"
        >
          {appointmentFilters.map((tab) => (
            <button
              key={tab.value}
              type="button"
              aria-pressed={activeTab === tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 border capitalize ${
                activeTab === tab.value
                  ? "bg-[#1a1a1a] border-[#d4b06a] text-[#d4b06a]"
                  : "bg-transparent border-transparent text-neutral-400 hover:text-white"
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
            className="text-center py-12 bg-[#111111] border border-neutral-800 rounded-2xl"
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
          <div className="space-y-4">
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
                  className="bg-[#111111] border border-neutral-800 rounded-2xl flex flex-col sm:flex-row overflow-hidden hover:border-neutral-700 transition-colors duration-300"
                >
                  {/* Columna Izquierda: Fecha y Hora */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-start justify-center sm:justify-start p-5 sm:w-32 shrink-0 border-b sm:border-b-0 sm:border-r border-neutral-800 gap-4 sm:gap-1">
                    <time
                      dateTime={appointment.starts_at}
                      aria-label={dateLabel}
                      className="text-3xl font-bold text-[#d4b06a] leading-none"
                    >
                      {day}
                    </time>
                    <span
                      aria-hidden="true"
                      className="text-xs font-bold text-neutral-400 tracking-wider"
                    >
                      {month}
                    </span>
                    <div className="flex items-center text-neutral-400 text-xs sm:mt-2 ml-auto sm:ml-0">
                      <Clock size={12} className="mr-1" />
                      {time}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-5 grow">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {appointment.service.name}
                    </h3>

                    <div className="flex items-center text-neutral-400 text-sm mb-3">
                      <Scissors size={14} className="mr-2 text-neutral-500" />
                      con {appointment.barber.name}
                    </div>

                    <div className="text-[#d4b06a] font-bold">
                      {formatPrice(appointment.service_price)}
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-end justify-between p-5 sm:w-48 shrink-0">
                    {appointment.status.toLowerCase() === "pending" ? (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border border-yellow-700/50 bg-yellow-900/20 text-yellow-500 mb-4 sm:mb-0">
                        <AlertCircle size={12} />
                        Pendiente
                      </div>
                    ) : appointment.status.toLowerCase() === "confirmed" ? (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border border-green-700/50 bg-green-900/20 text-green-500 mb-4 sm:mb-0">
                        <CheckCircle2 size={12} />
                        Confirmada
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border border-neutral-700 bg-neutral-800/50 text-neutral-400 mb-4 sm:mb-0">
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
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-red-900/50 text-red-500 hover:bg-red-900/20 transition-colors duration-200 w-full sm:w-auto justify-center disabled:cursor-not-allowed disabled:opacity-50"
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
