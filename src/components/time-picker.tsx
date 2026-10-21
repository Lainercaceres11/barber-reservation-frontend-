"use client";

import * as React from "react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarDays, ChevronDownIcon, Clock3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useBarberAvailability } from "@/hooks/use-barber-avalaible";

type Appointment = {
  starts_at: string;
  ends_at: string;
};

type Schedule = {
  day_of_week: number;
  start_time: string;
  end_time: string;
};

type DatePickerTimeProps = {
  value: string;
  min?: string;
  barberId: number | null;
  serviceDuration: number;
  onChange: (value: string) => void;
};

export function DatePickerTime({
  value,
  min,
  barberId,
  serviceDuration,
  onChange,
}: DatePickerTimeProps) {
  const [open, setOpen] = React.useState(false);

  const date = value ? parseISO(value) : undefined;
  const selectedDate = date && !Number.isNaN(date.getTime()) ? date : undefined;

  const dateString = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";

  const time = selectedDate ? format(selectedDate, "HH:mm") : "";

  const { data, isLoading, isError } = useBarberAvailability(
    barberId,
    dateString,
  );

  const schedules: Schedule[] = data?.schedules ?? [];
  const appointments: Appointment[] = data?.booked_appointments ?? [];

  const availableTimes = React.useMemo(() => {
    if (!dateString || !schedules.length || !serviceDuration) {
      return [];
    }

    const dayOfWeek = new Date(`${dateString}T12:00:00`).getDay();

    const daySchedules = schedules.filter(
      (schedule) => schedule.day_of_week === dayOfWeek,
    );

    const now = Date.now();

    return daySchedules.flatMap((schedule) => {
      const [startHour, startMinute] = schedule.start_time
        .split(":")
        .map(Number);

      const [endHour, endMinute] = schedule.end_time.split(":").map(Number);

      const startMinutes = startHour * 60 + startMinute;
      const endMinutes = endHour * 60 + endMinute;

      const slots: string[] = [];

      for (
        let minutes = startMinutes;
        minutes + serviceDuration <= endMinutes;
        minutes += 30
      ) {
        const hour = Math.floor(minutes / 60);
        const minute = minutes % 60;

        const slot = `${String(hour).padStart(2, "0")}:${String(
          minute,
        ).padStart(2, "0")}`;

        const slotStart = new Date(`${dateString}T${slot}:00-05:00`);

        const slotEnd = new Date(
          slotStart.getTime() + serviceDuration * 60_000,
        );

        if (slotStart.getTime() <= now) continue;

        const overlaps = appointments.some((appointment) => {
          const bookedStart = new Date(appointment.starts_at).getTime();
          const bookedEnd = new Date(appointment.ends_at).getTime();

          return (
            slotStart.getTime() < bookedEnd && slotEnd.getTime() > bookedStart
          );
        });

        if (!overlaps) slots.push(slot);
      }

      return slots;
    });
  }, [dateString, schedules, appointments, serviceDuration]);

  const updateDate = (newDate?: Date) => {
    if (!newDate) {
      onChange("");
      return;
    }

    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");

    onChange(`${year}-${month}-${day}T${time || ""}`);
  };

  const updateTime = (newTime: string) => {
    if (dateString) {
      onChange(`${dateString}T${newTime}`);
    }
  };

  const minDate = min ? parseISO(min) : undefined;

  return (
    <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Field className="gap-2">
        <FieldLabel className="flex items-center gap-2 text-sm font-semibold text-neutral-200">
          <CalendarDays size={16} className="text-yellow-500" />
          Fecha
        </FieldLabel>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <Button
                type="button"
                variant="outline"
                className="h-12 w-full justify-between rounded-xl border-neutral-800 bg-[#191919] px-4 font-normal text-white hover:bg-neutral-800 hover:text-white"
              >
                <span className="truncate">
                  {selectedDate
                    ? format(selectedDate, "PPP", { locale: es })
                    : "Seleccionar fecha"}
                </span>
                <ChevronDownIcon className="size-4 text-neutral-400" />
              </Button>
            }
          />

          <PopoverContent
            align="start"
            className="w-auto rounded-xl border-neutral-800 bg-[#191919] p-0 text-white"
          >
            <Calendar
              mode="single"
              selected={selectedDate}
              defaultMonth={selectedDate ?? minDate}
              locale={es}
              disabled={(day) =>
                day < new Date(new Date().setHours(0, 0, 0, 0))
              }
              onSelect={(newDate) => {
                if (newDate) {
                  updateDate(newDate);
                  setOpen(false);
                }
              }}
              className="bg-[#191919] text-white"
            />
          </PopoverContent>
        </Popover>
      </Field>

      <Field className="gap-2">
        <FieldLabel className="flex items-center gap-2 text-sm font-semibold text-neutral-200">
          <Clock3 size={16} className="text-yellow-500" />
          Horarios disponibles
        </FieldLabel>

        <select
          value={time}
          onChange={(event) => updateTime(event.target.value)}
          disabled={!dateString || isLoading || !availableTimes.length}
          className="h-12 w-full rounded-xl border border-neutral-800 bg-[#191919] px-4 text-white disabled:opacity-50"
        >
          <option value="">
            {!dateString
              ? "Selecciona una fecha"
              : isLoading
                ? "Consultando horarios..."
                : "Selecciona una hora"}
          </option>

          {availableTimes.map((availableTime) => (
            <option key={availableTime} value={availableTime}>
              {availableTime}
            </option>
          ))}
        </select>

        {isError && (
          <p className="text-sm text-red-400">
            No se pudieron consultar los horarios.
          </p>
        )}

        {!isLoading && dateString && !isError && !availableTimes.length && (
          <p className="text-xs text-neutral-400">
            No hay horarios disponibles para esta fecha.
          </p>
        )}
      </Field>
    </FieldGroup>
  );
}
