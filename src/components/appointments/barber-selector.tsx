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
    return (
      <p role="alert" className="text-red-500">
        No se pudieron cargar los barberos.
      </p>
    );
  }

  return (
    <section className="mx-auto">
      <div className="w-full">
        <div className="w-full max-w-3xl border-y border-white/10 bg-pine p-5 sm:p-7">
          <h2 className="mb-6 font-heading text-xl font-medium tracking-tight text-bone">
            Elige un barbero
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
                    ? "border-brass bg-brass/10"
                    : "border-white/10 bg-pine-soft hover:border-brass/50"
                }`}
              >
                <div className="group flex w-full overflow-hidden">
                  <div className="w-25 h-25 shrink-0 overflow-hidden relative">
                    <img
                      src={
                        barber.image_url ||
                        "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop"
                      }
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col justify-center p-3 w-full gap-2">
                    <h3 className="font-heading text-sm font-medium leading-tight text-bone">
                      {barber.name}
                    </h3>

                    <p className="flex items-center text-xs font-medium text-neutral-400">
                      <Phone className="mr-1" />
                      {barber.phone}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
            <button
              type="button"
              onClick={onBack}
              className="text-sm font-medium text-neutral-400 transition-colors hover:text-bone"
            >
              Volver
            </button>

            <button
              type="button"
              disabled={selectedBarberId === null}
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
