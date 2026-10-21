import { Link } from "react-router";
import { Scissors, Home, SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#111110] px-6 py-16 text-white">
   
      <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-yellow-400/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 size-96 rounded-full bg-yellow-400/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">

        <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-2xl border border-yellow-400/20 bg-yellow-400/10">
          <Scissors className="size-9 text-yellow-400" />
        </div>

     
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-yellow-400">
          Looks like a bad cut
        </p>

        <h1 className="text-8xl font-black tracking-tighter text-white sm:text-9xl">
          4<span className="text-yellow-400">0</span>4
        </h1>

        <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
          Página no encontrada
        </h2>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-neutral-400">
          Parece que te has salido del camino. La página que buscas no existe o
          ha sido movida. Pero tranquilo, siempre podemos arreglar el corte.
        </p>

 
        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-yellow-400 px-6 py-3.5 font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-lg hover:shadow-yellow-400/10"
          >
            <Home size={18} />
            Volver al inicio
          </Link>

          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition-all duration-300 hover:border-yellow-400/50 hover:bg-yellow-400/10 hover:text-yellow-400"
          >
            <SearchX size={18} />
            Ver servicios
          </Link>
        </div>

      
        <div className="mt-12 flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">
          <span className="h-px w-10 bg-neutral-700" />
          Premium Grooming
          <span className="h-px w-10 bg-neutral-700" />
        </div>
      </div>
    </main>
  );
};

export default NotFound;
