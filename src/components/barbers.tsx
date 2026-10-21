import useBarbers from "@/hooks/use-barbers";
import Title from "./title";
import { Phone, PhoneCall, PhoneCallIcon, PhoneIcon } from "lucide-react";

export default function Barbers() {
  const { barbers, isLoading, isError, error } = useBarbers();

  if (isLoading) {
    return (
      <section className="bg-black min-h-screen p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Array.from({ length: 4 }).map((_, i) => (
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
    return <p className="text-red-500">No se pudieron cargar los barbers.</p>;
  }
  return (
    <section className="max-w-7xl mx-auto p-4">
      <Title
        subtitle={{ number: "02", content: "The team" }}
        title="Conoce los barberos"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 p-2 gap-4">
        {barbers?.map((barber) => (
          <article
            key={barber.id}
            className="group grid overflow-hidden rounded-md [grid-template-areas:'barber'] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-400/10"
          >
            <img
              src={
                barber.image_url
                  ? barber.image_url
                  : "https://images.pexels.com/photos/1797137/pexels-photo-1797137.jpeg"
              }
              alt={barber.name}
              className="[grid-area:barber] z-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />

            <div className="[grid-area:barber] z-10 bg-linear-to-t from-black via-black/60 to-transparent" />

            <div className="[grid-area:barber] z-20 self-end space-y-2 p-4">
              <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-yellow-400">
                {barber.name}
              </h3>

              <p className="text-sm text-gray-300">{barber.role}</p>

              <p className="text-sm text-gray-300 flex gap-2">
                <PhoneIcon size="20" /> {barber.phone}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
