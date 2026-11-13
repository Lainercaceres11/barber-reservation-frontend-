import useServices from "@/hooks/use-services";
import { ChevronRight, Clock } from "lucide-react";
import { Link } from "react-router";
import { SelectorSkeleton } from "../skeletons/selector-skeleton";

type Service = {
  id: number;
  duration_minutes: number;
};

type ServicesSelectorProps = {
  selectedServiceId: number | null;
  onSelect: (service: Service) => void;
  onNext: () => void;
};

export default function ServicesSelector({
  onNext,
  onSelect,
  selectedServiceId,
}: ServicesSelectorProps) {
  const { services, isLoading, isError, error } = useServices();

  if (isLoading) {
    return <SelectorSkeleton />;
  }

  if (isError) {
    console.error("Error al obtener servicios:", error?.cause);
    return (
      <p role="alert" className="text-red-500">
        No se pudieron cargar los servicios.
      </p>
    );
  }

  return (
    <section className="mx-auto">
      <div className="w-full">
        <div className="w-full max-w-3xl border-y border-white/10 bg-pine p-5 sm:p-7">
          <h2 className="mb-6 font-heading text-xl font-medium tracking-tight text-bone">
            Elige un servicio
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services?.map((service) => (
              <button
                key={service.id}
                type="button"
                aria-pressed={selectedServiceId === Number(service.id)}
                onClick={() =>
                  onSelect({
                    id: Number(service.id),
                    duration_minutes: Number(service.duration_minutes),
                  })
                }
                className={`group flex w-full overflow-hidden rounded-xl border text-left transition-all ${
                  selectedServiceId === Number(service.id)
                    ? "border-brass bg-brass/10"
                    : "border-white/10 bg-pine-soft hover:border-brass/50"
                }`}
              >
                <div
                  className="group flex w-full overflow-hidden"
                >
                  <div className="w-25 h-25 shrink-0 overflow-hidden relative">
                    <img
                      src={
                        service.image_url ||
                        "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop"
                      }
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col justify-center p-3 w-full">
                    {/* Fila superior: Título y Precio */}
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-heading text-sm font-medium leading-tight text-bone">
                        {service.name}
                      </h3>

                      <span className="shrink-0 whitespace-nowrap text-sm font-medium text-brass">
                        {Number(service.price).toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                          maximumFractionDigits: 0,
                        })}
                      </span>
                    </div>

                    <p className="mb-2 mt-1 truncate text-xs text-neutral-400">
                      {service.description}
                    </p>

                    <div className="flex items-center text-xs font-medium text-neutral-400">
                      <Clock size={12} className="mr-1" />
                      {service.duration_minutes} min
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
            <Link
              to="/"
              className="text-sm font-medium text-neutral-400 transition-colors hover:text-bone"
            >
              Cancelar
            </Link>

            <button
              type="button"
              disabled={selectedServiceId === null}
              onClick={onNext}
              className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-brass px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-brass-light disabled:cursor-not-allowed disabled:opacity-50"
            >
              Siguiente
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
