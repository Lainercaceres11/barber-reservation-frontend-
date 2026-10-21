export function AppointmentsSkeleton() {
  return (
    <section
      aria-label="Cargando citas"
      aria-busy="true"
      className="min-h-screen bg-[#0a0a0a] px-4 py-12 font-sans text-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-4xl">
        {/* Encabezado */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="w-full space-y-3">
            <div className="h-9 w-48 animate-pulse rounded-md bg-neutral-800" />
            <div className="h-4 w-64 max-w-full animate-pulse rounded bg-neutral-800/70" />
          </div>

          <div className="h-11 w-full animate-pulse rounded-lg bg-[#d4b06a]/20 sm:w-36" />
        </div>

        {/* Pestañas */}
        <div className="mb-6 flex gap-2">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className={`h-10 animate-pulse rounded-lg bg-neutral-800/70 ${
                item === 1 ? "w-28" : "w-24"
              }`}
            />
          ))}
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <article
              key={item}
              className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-[#111111] sm:flex-row"
            >
              {/* Fecha y hora */}
              <div className="flex items-center gap-4 border-b border-neutral-800 p-5 sm:w-32 sm:shrink-0 sm:flex-col sm:items-start sm:justify-center sm:gap-2 sm:border-b-0 sm:border-r">
                <div className="h-9 w-10 rounded bg-neutral-800" />
                <div className="h-3 w-12 rounded bg-neutral-800/80" />
                <div className="ml-auto h-3 w-14 rounded bg-neutral-800/70 sm:ml-0 sm:mt-2" />
              </div>

              <div className="flex grow flex-col justify-center gap-3 p-5">
                <div className="h-5 w-40 max-w-full rounded bg-neutral-800" />
                <div className="h-4 w-36 max-w-full rounded bg-neutral-800/70" />
                <div className="h-5 w-24 rounded bg-[#d4b06a]/20" />
              </div>

              <div className="flex flex-col justify-between gap-5 p-5 sm:w-48 sm:shrink-0 sm:items-end">
                <div className="h-7 w-28 rounded-full bg-neutral-800" />
                <div className="h-10 w-full rounded-lg bg-neutral-800/70 sm:w-28" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
