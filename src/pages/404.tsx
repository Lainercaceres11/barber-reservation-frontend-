import { Link } from "react-router";
import { Scissors, Home, SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-ink px-6 py-16 text-bone">
   
      <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-yellow-400/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 size-96 rounded-full bg-yellow-400/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">

        <div className="mx-auto mb-8 flex size-16 items-center justify-center border border-brass/20 bg-pine text-brass">
          <Scissors className="size-8" aria-hidden="true" />
        </div>

     
        <p className="mb-3 text-xs font-medium tracking-[0.18em] text-brass">
          Parece que algo salió mal
        </p>

        <h1 className="font-heading text-7xl font-medium tracking-tight text-bone sm:text-8xl">
          4<span className="text-brass">0</span>4
        </h1>

        <h2 className="mt-5 font-heading text-2xl font-medium tracking-tight sm:text-3xl">
          Página no encontrada
        </h2>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-neutral-400">
          Parece que te has salido del camino. La página que buscas no existe o
          ha sido movida. Pero tranquilo, siempre podemos arreglar el corte.
        </p>

 
        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-brass px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-brass-light"
          >
            <Home size={18} />
            Volver al inicio
          </Link>

          <Link
            to="/services"
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/15 px-6 py-3.5 text-sm font-medium text-neutral-200 transition-colors hover:border-brass hover:text-brass"
          >
            <SearchX size={18} />
            Ver servicios
          </Link>
        </div>

      
        <div className="mt-12 flex items-center justify-center gap-3 text-xs font-medium tracking-[0.16em] text-neutral-500">
          <span className="h-px w-10 bg-neutral-700" />
          Cuidado personal de primera
          <span className="h-px w-10 bg-neutral-700" />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
