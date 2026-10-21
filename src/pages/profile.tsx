import { ProfileSkeleton } from "@/components/skeletons/profile-skeleton";
import useAppoitments from "@/hooks/use-appoitments";
import { useAuth } from "@/hooks/use-auth";
import {
  Pencil,
  Mail,
  Calendar,
  Scissors,
  Star,
  ArrowRight,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

export default function Profile() {
  const { isAuthenticated, user, logout, isLoadingUser } = useAuth();
  const navigate = useNavigate();

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
      label: "Upcoming",
      value: upcomingCount,
      icon: Calendar,
      color: "text-[#d4b06a]",
    },
    {
      label: "Completed",
      value: completedCount,
      icon: Scissors,
      color: "text-green-500",
    },
    {
      label: "Total Visits",
      value: totalVisits,
      icon: Star,
      color: "text-white",
    },
  ];

  if (isLoadingUser) {
    return <ProfileSkeleton />;
  }

  if (!isAuthenticated || !user) {
    return navigate("/");
  }

  return (
    <section className="bg-[#0a0a0a] min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black text-white uppercase tracking-wider mb-8">
          Perfil
        </h1>

        <div className="bg-[#111111] border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-xl bg-[#2a2514] flex items-center justify-center shrink-0">
              <span className="text-4xl font-bold text-[#d4b06a]">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">
                {user.name}
              </h2>
              <div className="flex items-center justify-center sm:justify-start text-neutral-400 text-sm">
                <Mail size={16} className="mr-2" />
                {user.email}
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 text-neutral-300 hover:text-white font-medium text-sm transition-colors px-4 py-2 rounded-lg hover:bg-neutral-800">
            <Pencil size={16} />
            Editar
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-[#111111] border border-neutral-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-neutral-700 transition-colors"
              >
                <Icon
                  size={24}
                  className={`${stat.color} mb-3`}
                  strokeWidth={1.5}
                />
                <span className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </span>
                <span className="text-neutral-500 text-xs">{stat.label}</span>
              </div>
            );
          })}
        </div>

        <div className="bg-[#111111] border border-neutral-800 rounded-2xl p-6 sm:p-8">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
            Acciones rapidas
          </h3>

          <div className="flex flex-col gap-3">
            <Link
              to="/books"
              className="group w-full flex items-center justify-between p-4 rounded-xl bg-[#1a1a1a] hover:bg-[#222222] border border-transparent hover:border-neutral-700 transition-all duration-200"
            >
              <div className="flex items-center gap-4 text-white">
                <Calendar size={20} className="text-[#d4b06a]" />
                <span className="font-medium text-sm">Crear nueva cita</span>
              </div>
              <ArrowRight
                size={18}
                className="text-neutral-600 group-hover:text-white transition-colors"
              />
            </Link>

            <Link
              to="/appointments"
              className="group w-full flex items-center justify-between p-4 rounded-xl bg-[#1a1a1a] hover:bg-[#222222] border border-transparent hover:border-neutral-700 transition-all duration-200"
            >
              <div className="flex items-center gap-4 text-white">
                <Scissors size={20} className="text-[#d4b06a]" />
                <span className="font-medium text-sm">Ver mis citas</span>
              </div>
              <ArrowRight
                size={18}
                className="text-neutral-600 group-hover:text-white transition-colors"
              />
            </Link>

            <button
              onClick={logout}
              className="group w-full flex items-center justify-between p-4 rounded-xl bg-[#1c0f0f] hover:bg-[#2a1515] border border-red-900/30 hover:border-red-900/60 transition-all duration-200 mt-2"
            >
              <div className="flex items-center gap-4 text-red-500">
                <LogOut size={20} />
                <span className="font-medium text-sm">Cerrar sesión</span>
              </div>
              <ArrowRight
                size={18}
                className="text-red-900/50 group-hover:text-red-500 transition-colors"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
