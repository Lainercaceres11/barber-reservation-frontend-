import Title from "@/components/title";
import WhyChooseKlip from "@/components/why-choose-kyp";
import useServices from "@/hooks/use-services";
import { currencyFormatter } from "@/utils/format-price";
import { Link } from "react-router";

type ServicesProps = {
  isHome?: boolean;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop";

export default function Services({ isHome }: ServicesProps) {
  const { services, isLoading, isError, error } = useServices();
  const Heading = isHome ? "h2" : "h1";

  if (isLoading) {
    return (
      <section
        aria-busy="true"
        className="min-h-screen bg-ink px-5 py-12 sm:px-8"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-4/5 animate-pulse border border-white/5 bg-pine"
            />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    console.error("Error al obtener servicios:", error?.cause);
    return (
      <section className="grid min-h-screen place-content-center bg-ink p-6">
        <p role="alert" className="text-red-300">
          No se pudieron cargar los servicios.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-10 bg-ink px-5 py-10 text-bone sm:px-8 sm:py-14">
      {isHome && (
        <Title
          className="mx-auto max-w-6xl"
          subtitle={{ number: "01", content: "Servicios" }}
          title="¿Qué hacemos?"
        />
      )}
      <div className="mx-auto max-w-6xl py-4">
        <p className="mb-5 text-xs font-medium tracking-[0.18em] text-brass">
          La experiencia KLIP
        </p>

        <Heading className="max-w-4xl font-heading text-4xl font-medium leading-[1.05] tracking-tight text-bone sm:text-5xl lg:text-6xl">
          Más que un simple corte de pelo
          <span className="mt-2 block text-brass">Es tu estilo</span>
        </Heading>

        <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base">
          Cortes de precisión. Cuidado personal experto. Un look que habla por
          sí solo.
        </p>

        <div className="mt-9 flex max-w-6xl items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-brass/60" />
          <span className="text-xs font-medium tracking-[0.12em] text-neutral-300">
            Nuestros servicios
          </span>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services?.map((service) => (
          <article
            key={service.id}
            className="group flex flex-col overflow-hidden border border-white/10 bg-pine transition-colors duration-300 hover:border-brass/50"
          >
            <div className="relative aspect-4/3 w-full overflow-hidden bg-pine-light">
              <img
                src={service.image_url || FALLBACK_IMAGE}
                alt=""
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute right-0 top-0 bg-ink/90 px-4 py-3 text-sm font-semibold text-brass">
                {currencyFormatter(service.price)}
              </div>
            </div>

            <div className="flex grow flex-col p-5 sm:p-6">
              <h3 className="mb-3 font-heading text-lg font-medium tracking-tight text-bone">
                {service.name}
              </h3>

              <p className="mb-6 grow text-sm leading-6 text-neutral-400">
                {service.description}
              </p>

              <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex items-center text-sm text-neutral-300">
                  <svg
                    className="mr-2 size-4 text-brass"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
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

                <Link
                  to="/books"
                  className="inline-flex min-h-10 items-center gap-2 px-1 text-sm font-medium text-brass transition-colors hover:text-brass-light"
                >
                  Agendar
                  <svg
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      <WhyChooseKlip />
    </section>
  );
}
