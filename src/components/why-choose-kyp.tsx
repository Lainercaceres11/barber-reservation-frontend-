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
    <section className="mx-auto max-w-7xl px-5 pb-20 pt-6 sm:px-8">
      <div className="border-t border-white/15 pt-8">
        <h2 className="mb-8 font-heading text-2xl font-medium tracking-tight text-bone sm:text-3xl">
          ¿Por qué elegir Klip?
        </h2>

        <ul className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li
              key={feature.id}
              className="flex items-start gap-4 border-t border-white/10 py-6 sm:pr-8 lg:pr-10"
            >
              <svg
                aria-hidden="true"
                className="mt-1 size-4 shrink-0 text-brass"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>

              <div>
                <h3 className="mb-2 font-heading text-base font-medium text-bone">
                  {feature.title}
                </h3>
                <p className="text-sm leading-6 text-neutral-400">
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
