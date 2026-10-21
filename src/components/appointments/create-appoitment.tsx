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
    <section className="min-h-screen bg-black px-4 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">RESERVAR CITA</h1>

          <p className="mt-2 text-sm text-neutral-400">
            Sigue los pasos a continuación para reservar tu turno
          </p>
        </header>

        <ol className="mb-8 grid grid-cols-3 gap-3">
          {steps.map((label, index) => (
            <li
              key={label}
              className={`border-b-2 pb-3 text-sm ${
                step === index
                  ? "border-yellow-400 text-yellow-400"
                  : step > index
                    ? "border-yellow-400/50 text-white"
                    : "border-neutral-700 text-neutral-500"
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
