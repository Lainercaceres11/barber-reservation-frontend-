import background from "/images/barber-bg.webp";
import { ArrowRightIcon } from "lucide-react";
import Services from "./services";
import Barbers from "@/components/barbers";
import FeatureBar from "@/components/featured-bar";
import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <header
        className="relative flex min-h-136 w-full items-center overflow-hidden border-b border-brass/20 bg-cover bg-position-[center_45%] px-6 py-20 sm:min-h-152 sm:px-10 lg:min-h-168 lg:px-16"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="absolute inset-0 bg-ink/55" />

        <div className="absolute inset-0 bg-linear-to-r from-ink/95 via-ink/75 to-ink/10" />

        <div className="relative z-10 max-w-4xl space-y-7">
          <p className="flex items-center gap-3 text-xs font-medium tracking-[0.18em] text-brass-light sm:text-sm">
            <span aria-hidden="true" className="h-px w-8 bg-brass" />
            Cuidado personal de primera calidad
          </p>

          <h1 className="font-heading text-5xl font-medium leading-[0.98] tracking-[-0.045em] text-bone sm:text-6xl lg:text-8xl">
            Luce impecable.
            <span className="mt-2 block text-brass">Siéntete impecable.</span>
          </h1>

          <p className="max-w-xl text-base leading-7 text-neutral-200 sm:text-lg sm:leading-8">
            Cortes de precisión, modelado de la barba y afeitados tradicionales
            con toalla caliente. Reserva con un maestro barbero en menos de un
            minuto.
          </p>

          <div className="flex flex-col items-stretch gap-4 pt-2 sm:flex-row sm:items-center">
            <Link
              to="/books"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-brass px-7 py-3 text-sm font-semibold text-ink transition-colors hover:bg-brass-light sm:text-base"
            >
              Agendar una cita
              <ArrowRightIcon size={17} strokeWidth={2} aria-hidden="true" />
            </Link>

            <Link
              to="/services"
              className="inline-flex min-h-12 items-center justify-center border-b border-brass/60 px-2 py-3 text-sm font-medium text-bone transition-colors hover:border-brass hover:text-brass-light sm:text-base"
            >
              Explorar servicios
            </Link>
          </div>
        </div>
      </header>
      <FeatureBar />
      <Services isHome />
      <Barbers />
    </>
  );
}
