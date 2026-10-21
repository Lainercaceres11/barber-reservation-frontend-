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
        className="relative w-full flex min-h-150 items-center overflow-hidden rounded-xl bg-cover bg-center px-8 py-16 sm:px-12 lg:px-20"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="absolute inset-0 bg-black/65" />

        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-transparent" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
            ---- Cuidado personal de primera calidad
          </span>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Luce impecable
            <br />
            <span className="text-yellow-400">Sientete impecable.</span>
          </h1>

          <p className="max-w-lg text-base leading-7 text-gray-200 sm:text-lg">
            Cortes de precisión, modelado de la barba y afeitados tradicionales
            con toalla caliente. Reserva cita con un maestro barbero en menos de
            un minuto.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/books"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-xl bg-yellow-500 text-black font-bold text-sm sm:text-base hover:bg-[#c2a05e] transition-all duration-300 shadow-[0_0_20px_rgba(212,176,106,0.15)] hover:shadow-[0_0_25px_rgba(212,176,106,0.3)]"
            >
              <span>Agendar cita</span>
              <ArrowRightIcon size={18} strokeWidth={2.5} />
            </Link>

            <Link
              to="/services"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-xl bg-transparent border-2 border-[#d4b06a] text-[#d4b06a] font-semibold text-sm sm:text-base hover:bg-[#d4b06a]/10 transition-all duration-300"
            >
              <span>Ver servicios</span>
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
