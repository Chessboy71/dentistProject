import { useDraggable } from "@dnd-kit/core";

import { cn } from "@/lib/utils";
import { Appointment, UrgencyLevel } from "./types";
import { motion } from "motion/react";
import { CSS } from "@dnd-kit/utilities";

interface AppointmentCardProps {
  appointment: Appointment;
  isInCalendar?: boolean;
}

const urgencyStyles: Record<UrgencyLevel, string> = {
  urgent: "bg-destructive text-destructive-foreground",
  "medium-urgent": "bg-secondary text-secondary-foreground",
  available: "bg-primary text-primary-foreground",
};

const urgencyLabels: Record<UrgencyLevel, string> = {
  urgent: "Urgent",
  "medium-urgent": "Peu Urgent",
  available: "Available",
};

export function AppointmentCard({
  appointment,
  isInCalendar = false,
}: AppointmentCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: appointment.id,
      data: appointment,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "rounded-xl p-4 cursor-grab active:cursor-grabbing transition-all",
        urgencyStyles[appointment.urgency],
        isDragging && "opacity-50 scale-95",
        isInCalendar ? "min-h-[100px]" : "min-h-[80px]"
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="text-xs font-medium mb-2 opacity-90">
        {urgencyLabels[appointment.urgency]}
      </div>
      <div className="font-bold text-lg">{appointment.name}</div>
      <div className="text-sm opacity-90">{appointment.subtitle}</div>
    </motion.div>
  );
}
