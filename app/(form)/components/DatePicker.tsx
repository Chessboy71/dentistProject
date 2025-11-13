"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface DatePickerFieldProps {
  value?: Date;
  onChange: (date?: Date) => void;
  label?: string;
}

export function DatePickerField({
  value,
  onChange,
  label = "Date de naissance",
}: DatePickerFieldProps) {
  return (
    <FormItem className="flex flex-col w-full">
      <FormLabel className="text-xs font-semibold text-slate-500">
        {label}
      </FormLabel>

      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal text-[0.65rem] lg:text-sm",
                !value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? (
                format(value, "dd/MM/yyyy")
              ) : (
                <span>Sélectionnez une date</span>
              )}
            </Button>
          </FormControl>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={(date) => date > new Date()}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </FormItem>
  );
}
