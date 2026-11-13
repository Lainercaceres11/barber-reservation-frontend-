import LoginForm from "@/components/login";
import { ProfileSkeleton } from "@/components/skeletons/profile-skeleton";
import useAppoitments from "@/hooks/use-appoitments";
import { useAuth } from "@/hooks/use-auth";
import {
  Mail,
  Calendar,
  Scissors,
  Star,
  ArrowRight,
  LogOut,
} from "lucide-react";
import { Link } from "react-router";

export default function Profile() {
  const { isAuthenticated, user, logout, isLoadingUser } = useAuth();

  const { appoitments } = useAppoitments();
  const appointmentsList = Array.isArray(appoitments)
    ? appoitments
    : appoitments?.data || [];

  const now = new Date();

  const upcomingCount = appointmentsList.filter(
    (app) => new Date(app.starts_at) > now && app.status !== "cancelled",
  ).length;

  const completedCount = appointmentsList.filter(
    (app) => app.status === "completed",
  ).length;

  const totalVisits = appointmentsList.filter(
    (app) => app.status !== "cancelled",
  ).length;

  const stats = [
    {
      label: "Próximas",
      value: upcomingCount,
      icon: Calendar,
      color: "text-brass",
    },
    {
      label: "Completadas",
      value: completedCount,
      icon: Scissors,
      color: "text-emerald-300",
    },
    {
      label: "Visitas realizadas",
      value: totalVisits,
      icon: Star,
      color: "text-neutral-200",
    },
  ];

  if (isLoadingUser) {
    return <ProfileSkeleton />;
  }

  if (!isAuthenticated || !user) {
    return <LoginForm isOpen />;
  }

  return (
    <section className="min-h-screen bg-ink px-5 py-10 text-bone sm:px-8 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 font-heading text-3xl font-medium tracking-tight sm:text-4xl">
          Perfil
        </h1>

        <div className="mb-8 flex flex-col items-center gap-6 border-y border-white/10 bg-pine px-5 py-7 sm:flex-row sm:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex size-20 shrink-0 items-center justify-center border border-brass/30 bg-pine-soft">
              <span className="font-heading text-3xl font-medium text-brass">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="text-center sm:text-left">
              <h2 className="mb-2 font-heading text-2xl font-medium tracking-tight text-bone">
                {user.name}
              </h2>
              <div className="flex items-center justify-center sm:justify-start text-neutral-400 text-sm">
                <Mail size={16} className="mr-2" />
                {user.email}
              </div>
            </div>
          </div>

        </div>

        <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex flex-col items-start border-t border-white/15 py-5"
              >
                <Icon
                  size={24}
                  className={`${stat.color} mb-5`}
                  strokeWidth={1.5}
                />
                <span className="mb-1 font-heading text-3xl font-medium text-bone">
                  {stat.value}
                </span>
                <span className="text-sm text-neutral-400">{stat.label}</span>
              </div>
            );
          })}
        </div>

        <div className="border-t border-white/15 pt-6">
          <h3 className="mb-4 font-heading text-lg font-medium text-bone">
            Acciones rápidas
          </h3>

          <div className="flex flex-col">
            <Link
              to="/books"
              className="group flex min-h-14 w-full items-center justify-between border-b border-white/10 px-2 py-4 transition-colors hover:bg-pine"
            >
              <div className="flex items-center gap-4 text-bone">
                <Calendar size={18} className="text-brass" />
                <span className="font-medium text-sm">Crear nueva cita</span>
              </div>
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="text-neutral-500 transition-colors group-hover:text-brass"
              />
            </Link>

            <Link
              to="/appointments"
              className="group flex min-h-14 w-full items-center justify-between border-b border-white/10 px-2 py-4 transition-colors hover:bg-pine"
            >
              <div className="flex items-center gap-4 text-bone">
                <Scissors size={18} className="text-brass" />
                <span className="font-medium text-sm">Ver mis citas</span>
              </div>
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="text-neutral-500 transition-colors group-hover:text-brass"
              />
            </Link>

            <button
              onClick={logout}
              className="group mt-3 flex min-h-14 w-full items-center justify-between border-b border-red-900/40 px-2 py-4 text-red-300 transition-colors hover:bg-red-950/30"
            >
              <div className="flex items-center gap-4 text-red-500">
                <LogOut size={20} />
                <span className="font-medium text-sm">Cerrar sesión</span>
              </div>
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="text-red-900/50 group-hover:text-red-500 transition-colors"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
