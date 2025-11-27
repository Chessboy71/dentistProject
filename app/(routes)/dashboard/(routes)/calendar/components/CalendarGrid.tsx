import { useDroppable } from "@dnd-kit/core";

import { AppointmentCard } from "./AppointmentCard";
import { cn } from "@/lib/utils";
import { Appointment, DaySlot, TimeSlot } from "./types";
import { motion } from "motion/react";

interface CalendarGridProps {
  days: DaySlot[];
  timeSlots: TimeSlot[];
  appointments: Appointment[];
}

interface CalendarCellProps {
  day: string;
  timeSlot: string;
  appointment?: Appointment;
}

function CalendarCell({ day, timeSlot, appointment }: CalendarCellProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `${day}-${timeSlot}`,
    data: { day, timeSlot },
  });

  return (
    <motion.div
      ref={setNodeRef}
      className={cn(
        "border-r border-b border-border min-h-[120px] p-2 transition-colors",
        isOver && "bg-accent/50"
      )}
      whileHover={{ backgroundColor: "hsl(var(--accent) / 0.3)" }}
    >
      {appointment && (
        <AppointmentCard appointment={appointment} isInCalendar />
      )}
    </motion.div>
  );
}

export function CalendarGrid({
  days,
  timeSlots,
  appointments,
}: CalendarGridProps) {
  const getAppointment = (day: string, timeSlot: string) => {
    return appointments.find(
      (apt) => apt.day === day && apt.timeSlot === timeSlot
    );
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="inline-block min-w-full">
        {/* Header with time slots */}
        <div className="grid grid-cols-[140px_repeat(auto-fit,minmax(180px,1fr))] bg-card sticky top-0 z-10 border-b border-border">
          <div className="p-4 border-r border-border"></div>
          {timeSlots.map((slot) => (
            <div
              key={slot.id}
              className="p-4 text-center font-medium border-r border-border"
            >
              {slot.time}
            </div>
          ))}
        </div>

        {/* Calendar body */}
        {days.map((day) => (
          <div
            key={day.id}
            className="grid grid-cols-[140px_repeat(auto-fit,minmax(180px,1fr))]"
          >
            <div className="p-4 font-medium border-r border-b border-border bg-card">
              {day.day}
            </div>
            {timeSlots.map((slot) => (
              <CalendarCell
                key={`${day.id}-${slot.id}`}
                day={day.day}
                timeSlot={slot.time}
                appointment={getAppointment(day.day, slot.time)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
