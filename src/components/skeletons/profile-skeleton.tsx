export function ProfileSkeleton() {
  return (
    <section
      className="min-h-screen animate-pulse bg-[#0a0a0a] px-4 py-12 font-sans sm:px-6 lg:px-8"
      aria-label="Cargando perfil"
      aria-busy="true"
    >
      <div className="mx-auto max-w-3xl">
      
        <div className="mb-8 h-10 w-48 rounded bg-neutral-800" />

      
        <div className="mb-6 flex flex-col items-center justify-between gap-6 rounded-2xl border border-neutral-800 bg-[#111111] p-6 sm:flex-row sm:items-start sm:p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
       
            <div className="h-24 w-24 shrink-0 rounded-xl bg-[#2a2514]" />

          
            <div className="flex w-full flex-col items-center gap-3 sm:items-start">
              <div className="h-7 w-48 max-w-full rounded bg-neutral-800" />
              <div className="h-4 w-56 max-w-full rounded bg-neutral-800" />
            </div>
          </div>

          <div className="h-10 w-24 rounded-lg bg-neutral-800" />
        </div>

    
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex flex-col items-center justify-center rounded-2xl border border-neutral-800 bg-[#111111] p-6"
            >
              <div className="mb-3 h-6 w-6 rounded bg-neutral-800" />
              <div className="mb-2 h-9 w-12 rounded bg-neutral-800" />
              <div className="h-3 w-20 rounded bg-neutral-800" />
            </div>
          ))}
        </div>

       
        <div className="rounded-2xl border border-neutral-800 bg-[#111111] p-6 sm:p-8">
          <div className="mb-6 h-4 w-36 rounded bg-neutral-800" />

          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className={`flex items-center justify-between rounded-xl border border-neutral-800 p-4 ${
                  item === 3 ? "bg-[#1c0f0f]" : "bg-[#1a1a1a]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`h-5 w-5 rounded ${
                      item === 3 ? "bg-red-900/50" : "bg-neutral-800"
                    }`}
                  />
                  <div
                    className={`h-4 w-32 rounded ${
                      item === 3 ? "bg-red-900/50" : "bg-neutral-800"
                    }`}
                  />
                </div>

                <div
                  className={`h-5 w-5 rounded ${
                    item === 3 ? "bg-red-900/50" : "bg-neutral-800"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
