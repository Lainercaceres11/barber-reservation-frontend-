import useBarbers from "@/hooks/use-barbers";
import { ChevronRight, Phone } from "lucide-react";
import { SelectorSkeleton } from "../skeletons/selector-skeleton";

type BarberSelectorProps = {
  selectedBarberId: number | null;
  onSelect: (barberId: number) => void;
  onBack: () => void;
  onNext: () => void;
};

export default function ServicesSelector({
  onBack,
  onNext,
  onSelect,
  selectedBarberId,
}: BarberSelectorProps) {
  const { barbers, isLoading, isError, error } = useBarbers();

  if (isLoading) {
    return <SelectorSkeleton />;
  }

  if (isError) {
    console.error("Error al obtener servicios:", error?.cause);
    return <p className="text-red-500">No se pudieron cargar los barbers.</p>;
  }

  return (
    <section className="mx-auto p-4 bg-black min-h-screen">
      <div className="bg-[#0a0a0a] flex items-center justify-center font-sans">
        <div className="bg-[#111111] border border-neutral-800 rounded-2xl p-6 sm:p-8 w-full max-w-3xl shadow-2xl shadow-black/50">
          <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-6">
            ELIGE UN BARBERO
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {barbers?.map((barber) => (
              <button
                key={barber.id}
                type="button"
                aria-pressed={selectedBarberId === Number(barber.id)}
                onClick={() => onSelect(Number(barber.id))}
                className={`group flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors ${
                  selectedBarberId === Number(barber.id)
                    ? "border-yellow-400 bg-yellow-400/10"
                    : "border-neutral-800 bg-[#161616] hover:border-neutral-600"
                }`}
              >
                <article className="group flex w-full bg-[#161616] rounded-xl overflow-hidden transition-all duration-300 cursor-pointer">
                  <div className="w-25 h-25 shrink-0 overflow-hidden relative">
                    <img
                      src={
                        barber.image_url ||
                        "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop"
                      }
                      alt={barber.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col justify-center p-3 w-full gap-2">
                    <h3 className="text-white font-bold text-sm tracking-wide leading-tight">
                      {barber.name}
                    </h3>

                    <p className="flex items-center text-neutral-500 text-[11px] font-medium">
                      <Phone className="mr-1" />
                      {barber.phone}
                    </p>
                  </div>
                </article>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-800">
            <button
              onClick={onBack}
              className="text-neutral-300 hover:text-white font-medium text-sm transition-colors"
            >
              Volver
            </button>

            <button
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
