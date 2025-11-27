"use client";

import { use, useState } from "react";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { Appointment, DaySlot, TimeSlot } from "./types";
import { CalendarGrid } from "./CalendarGrid";
import { motion } from "motion/react";
import { SidebarCard } from "./SidebarCard";
import { AppointmentCard } from "./AppointmentCard";

const DAYS: DaySlot[] = [
  { id: "dimanche", day: "Dimanche" },
  { id: "lundi", day: "Lundi" },
  { id: "mardi", day: "Mardi" },
  { id: "mercredi", day: "Mercredi" },
  { id: "jeudi", day: "Jeudi" },
  { id: "vendredi", day: "Vendredi" },
  { id: "samedi", day: "Samedi" },
];

const TIME_SLOTS: TimeSlot[] = [
  { id: "10:00", time: "10:00" },
  { id: "12:00", time: "12:00" },
  { id: "14:00", time: "14:00" },
  { id: "17:00", time: "17:00" },
  { id: "19:00", time: "19:00" },
];

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-1",
    name: "Jane Doe",
    subtitle: "Branchement",
    urgency: "urgent",
    day: "Lundi",
    timeSlot: "10:00",
  },
  {
    id: "apt-2",
    name: "Ms3oud",
    subtitle: "Soins",
    urgency: "medium-urgent",
    day: "Lundi",
    timeSlot: "12:00",
  },
  {
    id: "apt-3",
    name: "Ms3oud",
    subtitle: "Soins",
    urgency: "medium-urgent",
    day: "Lundi",
    timeSlot: "17:00",
  },
  {
    id: "apt-4",
    name: "Ms3oud",
    subtitle: "Soins",
    urgency: "medium-urgent",
    day: "Lundi",
    timeSlot: "19:00",
  },
];

const UNASSIGNED_APPOINTMENTS: Appointment[] = [
  {
    id: "unassigned-1",
    name: "Jane Doe",
    subtitle: "Branchement",
    urgency: "urgent",
  },
  {
    id: "unassigned-2",
    name: "Jane Doe",
    subtitle: "Branchement",
    urgency: "urgent",
  },
  {
    id: "unassigned-3",
    name: "Jane Doe",
    subtitle: "Branchement",
    urgency: "urgent",
  },
  {
    id: "unassigned-4",
    name: "Jane Doe",
    subtitle: "Branchement",
    urgency: "urgent",
  },
  {
    id: "unassigned-5",
    name: "Jane Doe",
    subtitle: "Branchement",
    urgency: "urgent",
  },
  {
    id: "unassigned-6",
    name: "Jane Doe",
    subtitle: "Branchement",
    urgency: "urgent",
  },
  {
    id: "unassigned-7",
    name: "Jane Doe",
    subtitle: "Branchement",
    urgency: "urgent",
  },
  {
    id: "unassigned-8",
    name: "Jane Doe",
    subtitle: "Branchement",
    urgency: "urgent",
  },
];

const ScheduleBoard = () => {
  const [appointments, setAppointments] =
    useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [unassigned, setUnassigned] = useState<Appointment[]>(
    UNASSIGNED_APPOINTMENTS
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const draggedAppointment = active.data.current as Appointment;
    const dropTarget = over.data.current as { day: string; timeSlot: string };

    if (dropTarget && dropTarget.day && dropTarget.timeSlot) {
      // Remove from unassigned if it was there
      setUnassigned((prev) =>
        prev.filter((apt) => apt.id !== draggedAppointment.id)
      );

      // Update or add to calendar
      setAppointments((prev) => {
        const existing = prev.find((apt) => apt.id === draggedAppointment.id);
        if (existing) {
          return prev.map((apt) =>
            apt.id === draggedAppointment.id
              ? { ...apt, day: dropTarget.day, timeSlot: dropTarget.timeSlot }
              : apt
          );
        } else {
          return [
            ...prev,
            {
              ...draggedAppointment,
              day: dropTarget.day,
              timeSlot: dropTarget.timeSlot,
            },
          ];
        }
      });
    }
  };

  const handleAssignFromDropdown = (
    appointmentId: string,
    day: string,
    timeSlot: string
  ) => {
    const appointment = unassigned.find((apt) => apt.id === appointmentId);
    if (!appointment) return;

    setUnassigned((prev) => prev.filter((apt) => apt.id !== appointmentId));
    setAppointments((prev) => [...prev, { ...appointment, day, timeSlot }]);
  };

  const activeDragItem = activeId
    ? [...appointments, ...unassigned].find((apt) => apt.id === activeId)
    : null;

  return (
    <DndContext
      onDragStart={(event) => setActiveId(event.active.id as string)}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-screen bg-background">
        {/* Calendar Section */}
        <div className="flex-1 flex flex-col">
          <header className="bg-card border-b border-border p-4">
            <h1 className="text-2xl font-bold">Planning</h1>
          </header>
          <CalendarGrid
            days={DAYS}
            timeSlots={TIME_SLOTS}
            appointments={appointments}
          />
        </div>

        {/* Sidebar */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-80 bg-muted border-l border-border p-4 overflow-y-auto"
        >
          <h2 className="text-lg font-semibold mb-4">Unassigned</h2>
          <div className="space-y-3">
            {unassigned.map((appointment) => (
              <SidebarCard
                key={appointment.id}
                appointment={appointment}
                onAssign={(day, timeSlot) =>
                  handleAssignFromDropdown(appointment.id, day, timeSlot)
                }
                days={DAYS}
                timeSlots={TIME_SLOTS}
              />
            ))}
          </div>
        </motion.div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeDragItem ? (
            <div className="cursor-grabbing">
              <AppointmentCard appointment={activeDragItem} />
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default ScheduleBoard;
