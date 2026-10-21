const features = [
  {
    id: 1,
    title: "Barberos expertos",
    description:
      "Años de experiencia y formación continua en las técnicas más novedosas.",
  },
  {
    id: 2,
    title: "Productos de primera calidad",
    description:
      "Solo utilizamos los mejores productos de cuidado para tu cabello y tu piel.",
  },
  {
    id: 3,
    title: "Ambiente relajante",
    description:
      "Un espacio diseñado para que los hombres se relajen y disfruten de la experiencia.",
  },
];

export default function WhyChooseKlip() {
  return (
    <article className="pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#111111] border border-neutral-800 rounded-2xl p-8 lg:p-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-white uppercase tracking-wider mb-10">
            ¿POR QUÉ ELEGIR KLIP?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature) => (
              <div key={feature.id} className="flex items-start gap-4">
                {/* Caja del Icono (Check) */}
                <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-[#1a1a1a] border border-neutral-800">
                  <svg
                    className="w-4 h-4 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-white font-bold text-base mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
