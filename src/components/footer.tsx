import { Link } from "react-router";
import { Scissors, MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";

const footerLinks = [
  { title: "Inicio", url: "/" },
  { title: "Servicios", url: "/services" },
  { title: "Reservar cita", url: "/books" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-bone">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-sm bg-brass text-ink">
                <Scissors size={23} />
              </div>

              <div>
                <h2 className="font-heading text-lg font-semibold tracking-[0.12em]">
                  Klip
                </h2>
                <p className="text-[10px] tracking-[0.24em] text-brass">
                  BARBERÍA
                </p>
              </div>
            </Link>

            <p className="max-w-xs text-sm leading-6 text-neutral-400">
              Más que un corte de cabello. Una tradición de precisión, estilo y
              confianza.
            </p>

            {/* <div className="flex gap-3">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center rounded-lg border border-white/10 text-neutral-400 transition-colors duration-300 hover:border-yellow-400 hover:bg-yellow-400 hover:text-black"
              >
                <Instagram size={19} />
              </a>

              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="flex size-10 items-center justify-center rounded-lg border border-white/10 text-neutral-400 transition-colors duration-300 hover:border-yellow-400 hover:bg-yellow-400 hover:text-black"
              >
                <Facebook size={19} />
              </a>
            </div> */}
          </div>

          {/* Navegación */}
          <div>
            <h3 className="mb-5 font-heading text-sm font-medium text-bone">
              Enlaces rápidos
            </h3>

            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.url}>
                  <Link
                    to={link.url}
                    className="group inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors duration-200 hover:text-brass-light"
                  >
                    {link.title}
                    <ArrowUpRight
                      size={14}
                      aria-hidden="true"
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horarios */}
          <div>
            <h3 className="mb-5 font-heading text-sm font-medium text-bone">
              Horarios de atención
            </h3>

            <div className="mb-4 flex items-start gap-3">
              <Clock size={18} className="mt-0.5 shrink-0 text-brass" aria-hidden="true" />
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-neutral-200">Lunes a viernes</p>
                  <p className="mt-1 text-neutral-400">
                    9:00 a. m. – 8:00 p. m.
                  </p>
                </div>

                <div>
                  <p className="text-neutral-200">Sábado</p>
                  <p className="mt-1 text-neutral-400">
                    9:00 a. m. – 6:00 p. m.
                  </p>
                </div>

                <div>
                  <p className="text-neutral-200">Domingo</p>
                  <p className="mt-1 text-brass-light">Cerrado</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="mb-5 font-heading text-sm font-medium text-bone">
              Contáctanos
            </h3>

            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin size={19} className="mt-0.5 shrink-0 text-brass" aria-hidden="true" />
                <div className="text-sm">
                  <p className="text-neutral-200">Visita nuestra barbería</p>
                  <p className="mt-1 leading-6 text-neutral-400">
                    Aquí va tu dirección
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-brass" aria-hidden="true" />
                <div className="text-sm">
                  <p className="text-neutral-200">Llámanos</p>
                  <a
                    href="tel:+570000000000"
                    className="mt-1 inline-block text-neutral-400 transition-colors hover:text-yellow-400"
                  >
                    +57 000 000 0000
                  </a>
                </div>
              </li>
            </ul>

            <Link
              to="/books"
              className="mt-6 inline-flex min-h-11 items-center gap-3 rounded-sm bg-brass px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-brass-light"
            >
              Reserva tu cita
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Klip Barbershop. Todos los derechos
            reservados.
          </p>

          <p className="flex items-center gap-2">
            Creado con precisión
            <Scissors size={14} className="text-brass" aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  );
}
