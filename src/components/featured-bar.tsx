import { Scissors, Calendar, ShieldCheck, Clock } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Barberos expertos",
    description: "Pasión y precisión en cada corte",
    Icon: Scissors,
  },
  {
    id: 2,
    title: "Reserva en minutos",
    description: "Tu cita, sin llamadas ni esperas",
    Icon: Calendar,
  },
  {
    id: 3,
    title: "Experiencia premium",
    description: "El cuidado que te mereces",
    Icon: ShieldCheck,
  },
  {
    id: 4,
    title: "Tu tiempo importa",
    description: "Puntuales. Siempre.",
    Icon: Clock,
  },
];

export default function FeatureBar() {
  return (
    <section
      aria-label="Ventajas de reservar en Klip"
      className="border-b border-white/10 bg-pine"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <ul className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
          {features.map((feature, index) => {
            const { Icon } = feature;

            return (
              <li
                key={feature.id}
                className={`flex items-center gap-4 py-5 sm:px-5 lg:py-7 ${
                  index % 2 === 0 ? "sm:pl-0" : ""
                } ${index === 0 ? "lg:pl-0" : ""} ${
                  index === features.length - 1 ? "lg:pr-0" : ""
                }`}
              >
                <Icon
                  aria-hidden="true"
                  size={22}
                  strokeWidth={1.5}
                  className="shrink-0 text-brass"
                />

                <div className="flex flex-col">
                  <h3 className="mb-1 text-sm font-medium tracking-wide text-bone">
                    {feature.title}
                  </h3>
                  <p className="text-xs leading-5 text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
