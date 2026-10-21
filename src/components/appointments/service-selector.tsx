import useServices from "@/hooks/use-services";
import { ChevronRight, Clock } from "lucide-react";
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
    return <p className="text-red-500">No se pudieron cargar los servicios.</p>;
  }

  return (
    <section className="mx-auto p-4 bg-black min-h-screen">
      <div className="bg-[#0a0a0a] flex items-center justify-center font-sans">
        <div className="bg-[#111111] border border-neutral-800 rounded-2xl p-6 sm:p-8 w-full max-w-3xl shadow-2xl shadow-black/50">
          <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-6">
            ELIGE UN SERVICIO
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
                    ? "border-yellow-400 bg-yellow-400/10"
                    : "border-neutral-800 bg-[#161616] hover:border-neutral-600"
                }`}
              >
                <article
                  key={service.id}
                  className="group flex bg-[#161616] rounded-xl overflow-hidden w-full transition-all duration-300 cursor-pointer"
                >
                  <div className="w-25 h-25 shrink-0 overflow-hidden relative">
                    <img
                      src={
                        service.image_url ||
                        "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop"
                      }
                      alt={service.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col justify-center p-3 w-full">
                    {/* Fila superior: Título y Precio */}
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-white font-bold text-sm tracking-wide leading-tight">
                        {service.name}
                      </h3>

                      <span className="text-[#d4b06a] font-bold text-sm shrink-0 whitespace-nowrap">
                        {Number(service.price).toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                          maximumFractionDigits: 0,
                        })}
                      </span>
                    </div>

                    <p className="text-neutral-400 text-xs mt-1 mb-2 truncate">
                      {service.description}
                    </p>

                    <div className="flex items-center text-neutral-500 text-[11px] font-medium">
                      <Clock size={12} className="mr-1" />
                      {service.duration_minutes} min
                    </div>
                  </div>
                </article>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-800">
            <button
              onClick={onNext}
              className="text-neutral-300 hover:text-white font-medium text-sm transition-colors"
            >
              Cancelar
            </button>

            <button
              type="button"
              disabled={selectedServiceId === null}
              onClick={onNext}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded-lg transition-colors duration-200 text-sm"
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
