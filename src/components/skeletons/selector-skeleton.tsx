export function SelectorSkeleton() {
  return (
    <section
      className="mx-auto min-h-screen animate-pulse bg-black p-4"
      aria-label="Cargando servicios"
      aria-busy="true"
    >
      <div className="flex items-center justify-center bg-[#0a0a0a] font-sans">
        <div className="w-full max-w-3xl rounded-2xl border border-neutral-800 bg-[#111111] p-6 shadow-2xl shadow-black/50 sm:p-8">
          <div className="mb-6 h-6 w-56 rounded bg-neutral-800" />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex w-full overflow-hidden rounded-xl border border-neutral-800 bg-[#161616]"
              >
                <div className="h-25 w-25 shrink-0 bg-neutral-800" />

                <div className="flex w-full flex-col justify-center gap-3 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="h-4 w-28 rounded bg-neutral-800" />
                    <div className="h-4 w-16 shrink-0 rounded bg-neutral-800" />
                  </div>

                  <div className="h-3 w-full rounded bg-neutral-800" />

                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-neutral-800" />
                    <div className="h-3 w-14 rounded bg-neutral-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-neutral-800 pt-6">
            <div className="h-4 w-20 rounded bg-neutral-800" />
            <div className="h-10 w-32 rounded-lg bg-yellow-500/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
