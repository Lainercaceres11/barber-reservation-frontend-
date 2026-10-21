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
    <article className="bg-[#0a0a0a] py-8 border-y border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {features.map((feature, index) => {
            const { Icon } = feature;

            return (
              <div
                key={feature.id}
                className={`flex items-center gap-4 
                  ${index !== features.length - 1 ? "lg:border-r lg:border-neutral-800" : ""} 
                  ${index !== 0 ? "lg:pl-8" : ""} 
                  ${index !== features.length - 1 ? "lg:pr-8" : ""}
                  sm:justify-center lg:justify-start
                `}
              >
                <div className="shrink-0 text-yellow-400">
                  <Icon size={28} strokeWidth={1.5} />
                </div>

                <div className="flex flex-col">
                  <h3 className="text-white font-bold text-sm tracking-wide mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-500 text-xs">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}
