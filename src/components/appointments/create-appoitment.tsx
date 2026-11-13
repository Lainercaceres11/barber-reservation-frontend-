"use client";

import { useState } from "react";
import BarberSelector from "@/components/appointments/barber-selector";
import ServicesSelector from "./service-selector";
import AppointmentDateForm from "./appoitment-date-form";

type AppointmentDraft = {
  serviceId: number | null;
  barberId: number | null;
  startsAt: string;
  customerNotes: string;
  service_duration_minutes: number;
};

const steps = ["Servicio", "Barbero", "Fecha y hora"];

export const CreateAppoitment = () => {
  const [step, setStep] = useState(0);

  const [appointment, setAppointment] = useState<AppointmentDraft>({
    serviceId: null,
    barberId: null,
    startsAt: "",
    customerNotes: "",
    service_duration_minutes: 0,
  });

  const updateAppointment = (values: Partial<AppointmentDraft>) => {
    setAppointment((current) => ({
      ...current,
      ...values,
    }));
  };

  const goNext = () => setStep((current) => current + 1);
  const goBack = () => setStep((current) => current - 1);

  return (
    <section className="min-h-screen bg-ink px-5 py-10 text-bone sm:px-8 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <p className="mb-3 text-xs font-medium tracking-[0.18em] text-brass">
            Reserva en tres pasos
          </p>
          <h1 className="font-heading text-3xl font-medium tracking-tight sm:text-4xl">
            Reserva tu cita
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-400">
            Sigue los pasos a continuación para reservar tu turno
          </p>
        </header>

        <ol className="mb-8 grid grid-cols-3 gap-3 border-y border-white/10 py-4">
          {steps.map((label, index) => (
            <li
              key={label}
              aria-current={step === index ? "step" : undefined}
              className={`border-b-2 pb-3 text-xs sm:text-sm ${
                step === index
                  ? "border-brass text-brass"
                  : step > index
                    ? "border-brass/50 text-neutral-200"
                    : "border-white/10 text-neutral-500"
              }`}
            >
              <span className="mr-2">{index + 1}.</span>
              {label}
            </li>
          ))}
        </ol>

        {step === 0 && (
          <ServicesSelector
            selectedServiceId={appointment.serviceId}
            onSelect={(service) =>
              updateAppointment({
                serviceId: service.id,
                service_duration_minutes: service.duration_minutes,
              })
            }
            onNext={goNext}
          />
        )}

        {step === 1 && (
          <BarberSelector
            selectedBarberId={appointment.barberId}
            onSelect={(barberId) => updateAppointment({ barberId })}
            onBack={goBack}
            onNext={goNext}
          />
        )}

        {step === 2 && (
          <AppointmentDateForm
            serviceId={appointment.serviceId}
            barberId={appointment.barberId}
            startsAt={appointment.startsAt}
            serviceDuration={appointment.service_duration_minutes}
            customerNotes={appointment.customerNotes}
            onChange={updateAppointment}
            onBack={goBack}
          />
        )}
      </div>
    </section>
  );
};
