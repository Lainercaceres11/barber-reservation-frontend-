import useBarbers from "@/hooks/use-barbers";
import Title from "./title";
import { PhoneIcon } from "lucide-react";

export default function Barbers() {
  const { barbers, isLoading, isError, error } = useBarbers();

  if (isLoading) {
    return (
      <section aria-busy="true" className="bg-ink p-6 sm:p-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/5] animate-pulse border border-white/5 bg-pine"
            />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    console.error("Error al obtener servicios:", error?.cause);
    return (
      <p role="alert" className="bg-ink p-6 text-red-300">
        No se pudieron cargar los barberos.
      </p>
    );
  }
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 pt-6 sm:px-8">
      <Title
        subtitle={{ number: "02", content: "El equipo" }}
        title="Conoce los barberos"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {barbers?.map((barber) => (
          <article
            key={barber.id}
            className="group relative grid aspect-[4/5] overflow-hidden border border-white/10 bg-pine [grid-template-areas:'barber']"
          >
            <img
              src={
                barber.image_url
                  ? barber.image_url
                  : "https://images.pexels.com/photos/1797137/pexels-photo-1797137.jpeg"
              }
              alt=""
              className="[grid-area:barber] z-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />

            <div className="[grid-area:barber] z-10 bg-linear-to-t from-ink/95 via-ink/15 to-transparent" />

            <div className="[grid-area:barber] z-20 self-end space-y-2 p-5">
              <h3 className="font-heading text-xl font-medium text-bone transition-colors group-hover:text-brass-light">
                {barber.name}
              </h3>

              <p className="text-sm text-neutral-300">{barber.role}</p>

              <p className="flex items-center gap-2 text-sm text-neutral-300">
                <PhoneIcon size="16" className="text-brass" aria-hidden="true" />
                {barber.phone}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
