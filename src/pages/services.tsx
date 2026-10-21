import Title from "@/components/title";
import WhyChooseKlip from "@/components/why-choose-kyp";
import useServices from "@/hooks/use-services";
import { currencyFormatter } from "@/utils/format-price";

type ServicesProps = {
  isHome?: boolean;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop";

export default function Services({ isHome }: ServicesProps) {
  const { services, isLoading, isError, error } = useServices();

  if (isLoading) {
    return (
      <section className="bg-black min-h-screen p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-96 rounded-2xl bg-[#111111] border border-neutral-800 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    console.error("Error al obtener servicios:", error?.cause);
    return (
      <section className="bg-black min-h-screen grid place-content-center p-4">
        <p className="text-red-500">No se pudieron cargar los servicios.</p>
      </section>
    );
  }

  return (
    <section className="space-y-4 mx-auto p-4 bg-black">
      {isHome && (
        <Title
          className="max-w-6xl mx-auto"
          subtitle={{ number: "01", content: "Servicios" }}
          title="Qué hacemos?"
        />
      )}
      <div className="mx-auto max-w-6xl py-10 text-center md:py-16">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-yellow-500">
          The KLIP experience
        </p>

        <h2 className="mx-auto max-w-4xl text-4xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-5xl md:text-7xl">
          Más que un simple corte de pelo
          <span className="mt-2 block text-yellow-400">Es tu estilo</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base">
          Cortes de precisión. Cuidado personal experto. Un look que habla por
          sí solo.
        </p>

        <div className="mx-auto mt-10 flex max-w-6xl items-center gap-4">
          <span className="h-px flex-1 bg-neutral-800" />

          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-300">
            Nuestros servicios
          </span>

          <span className="h-px flex-1 bg-neutral-800" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {services?.map((service) => (
          <article
            key={service.id}
            className="group flex flex-col bg-[#111111] rounded-2xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-all duration-300 hover:shadow-xl hover:shadow-black/50 "
          >
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src={service.image_url || FALLBACK_IMAGE}
                alt={service.name}
                loading="lazy"
                className="h-full w-full object-cover bg-neutral-900 transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 font-bold bg-slate-800 rounded-full p-2 text-sm text-yellow-400 drop-shadow-lg">
                {currencyFormatter(service.price)}
              </div>
            </div>

            <div className="flex flex-col grow p-6">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-3">
                {service.name}
              </h3>

              <p className="text-neutral-400 text-sm mb-6 grow leading-relaxed">
                {service.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-800">
                <div className="flex items-center text-neutral-400 text-sm">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {service.duration_minutes} min
                </div>

                <button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black text-sm font-bold py-2.5 px-5 rounded-lg transition-colors duration-200">
                  Book
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <WhyChooseKlip />
    </section>
  );
}
