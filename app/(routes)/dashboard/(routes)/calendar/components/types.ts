export type UrgencyLevel = "urgent" | "medium-urgent" | "available";

export interface Appointment {
  id: string;
  name: string;
  subtitle: string;
  urgency: UrgencyLevel;
  day?: string;
  timeSlot?: string;
}

export interface TimeSlot {
  id: string;
  time: string;
}

export interface DaySlot {
  id: string;
  day: string;
}
