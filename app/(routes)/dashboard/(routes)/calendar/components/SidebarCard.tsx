import { useState } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { Appointment, UrgencyLevel } from "./types";
import { AnimatePresence, motion } from "motion/react";

interface SidebarCardProps {
  appointment: Appointment;
  onAssign: (day: string, timeSlot: string) => void;
  days: Array<{ id: string; day: string }>;
  timeSlots: Array<{ id: string; time: string }>;
}

const urgencyBadgeStyles: Record<UrgencyLevel, string> = {
  urgent: "bg-destructive text-destructive-foreground",
  "medium-urgent": "bg-secondary text-secondary-foreground",
  available: "bg-primary text-primary-foreground",
};

export function SidebarCard({
  appointment,
  onAssign,
  days,
  timeSlots,
}: SidebarCardProps) {
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [showTimeSlots, setShowTimeSlots] = useState(false);

  const handleAssign = () => {
    if (selectedDay && selectedTime) {
      onAssign(selectedDay, selectedTime);
      setSelectedDay("");
      setSelectedTime("");
      setShowTimeSlots(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-lg p-4 shadow-sm border border-border"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <div className="font-semibold text-lg">{appointment.name}</div>
          <div className="text-sm text-muted-foreground">
            {appointment.subtitle}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu open={showTimeSlots} onOpenChange={setShowTimeSlots}>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="default">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card z-50">
              <div className="p-2">
                <div className="text-xs font-semibold mb-2 text-muted-foreground">
                  Select Day
                </div>
                {days.map((day) => (
                  <DropdownMenuItem
                    key={day.id}
                    onClick={() => setSelectedDay(day.day)}
                    className={cn(
                      "cursor-pointer",
                      selectedDay === day.day && "bg-accent"
                    )}
                  >
                    {day.day}
                  </DropdownMenuItem>
                ))}

                <AnimatePresence>
                  {selectedDay && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="text-xs font-semibold mt-3 mb-2 text-muted-foreground">
                        Select Time
                      </div>
                      {timeSlots.map((slot) => (
                        <DropdownMenuItem
                          key={slot.id}
                          onClick={() => {
                            setSelectedTime(slot.time);
                            handleAssign();
                          }}
                          className="cursor-pointer"
                        >
                          {slot.time}
                        </DropdownMenuItem>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium",
              urgencyBadgeStyles[appointment.urgency]
            )}
          >
            {appointment.urgency === "urgent" ? "Urgent" : "Available"}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
