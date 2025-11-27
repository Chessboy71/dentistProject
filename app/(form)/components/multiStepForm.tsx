"use client";

import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePickerField } from "./DatePicker";
import { ChevronLeft } from "lucide-react";

import MultiSelectField from "./MultiSelectField";
import { Textarea } from "@/components/ui/textarea";

// ✅ Define ONE schema for the whole form
const formSchema = z.object({
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  telephone: z.string().min(2, "Required"),
  dateDeNaissance: z.date("Invalid date"),
  email: z.email("Invalid email"),
  service: z.array(z.string()).min(1, "Required"),
  serviceStatus: z.array(z.string()).min(1, "Required"),
  disponibilite: z.array(z.string()).min(1, "Required"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function MultiStepForm({
  step,
  setStep,
  onBack,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  onBack: () => void;
}) {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      telephone: "",
      dateDeNaissance: undefined,
      email: "",
      service: [],
      serviceStatus: [],
      disponibilite: [],
      message: "",
    },
  });

  const fieldsPerStep = [
    ["firstName", "lastName", "telephone", "dateDeNaissance", "email"],
    ["service", "serviceStatus", "disponibilite"],
    ["message"],
  ];

  // handler for next (validates only current step)
  const handleNext = async () => {
    const current = fieldsPerStep[step] as (keyof FormValues)[];
    const ok = await methods.trigger(current as any); // trigger returns boolean
    if (ok) {
      setStep((s) => s + 1);
    } else {
      // focus first error field (optional)
      const firstErr = Object.keys(methods.formState.errors)[0] as
        | keyof FormValues
        | undefined;
      if (firstErr) {
        methods.setFocus(firstErr);
      }
    }
  };

  // final submit - will validate the whole schema and then run this
  const onSubmit = (data: FormValues) => {
    console.log("✅ Submitted Data:", data);
    alert("Form submitted successfully!");
  };

  const serviceOptions = [
    { value: "consultation", label: "Consultation" },
    { value: "detartrage", label: "Detartrage" },
    { value: "extraction", label: "Extraction dentaire" },
    { value: "soins", label: "Soins" },
    { value: "blanchiment", label: "Blanchiment" },
    { value: "goutieres invisibles", label: "Goutières invisibles" },
    { value: "protheses amovibles", label: "Prothèses amovibles" },
    { value: "protheses fixes", label: "Prothèses fixes" },
    { value: "facettes dentaires", label: "Facettes dentaires" },
    { value: "autres", label: "Autres" },
  ];
  const serviceStatusOptions = [
    { value: "urgent", label: "urgent" },
    { value: "normal", label: "normal" },
    { value: "peu urgent", label: "peu urgent" },
    { value: "rendez-vous de controle", label: "rendez-vous de contrôle" },
  ];

  const disponibiliteOptions = [
    { value: "dimanche-matin", label: "Dimanche matin" },
    { value: "dimanche-soir", label: "Dimanche soir" },
    { value: "lundi-matin", label: "Lundi matin" },
    { value: "lundi-soir", label: "Lundi soir" },
    { value: "mardi-matin", label: "Mardi matin" },
    { value: "mardi-soir", label: "Mardi soir" },
    { value: "mercredi-matin", label: "Mercredi matin" },
    { value: "mercredi-soir", label: "Mercredi soir" },
    { value: "jeudi-matin", label: "Jeudi matin" },
    { value: "jeudi-soir", label: "Jeudi soir" },
    { value: "vendredi-matin", label: "Vendredi matin" },
    { value: "vendredi-soir", label: "Vendredi soir" },
    { value: "samedi-matin", label: "Samedi matin" },
    { value: "samedi-soir", label: "Samedi soir" },
  ];

  const stepFields = [
    // Step 1
    <>
      <div className="flex flex-row gap-4">
        <FormField
          control={methods.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel className="text-xs font-semibold text-slate-500">
                First Name
              </FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel className="text-xs font-semibold text-slate-500">
                Last Name
              </FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex flex-row gap-4">
        <FormField
          control={methods.control}
          name="telephone"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel className="text-xs font-semibold text-slate-500">
                Telephone
              </FormLabel>
              <FormControl>
                <Input placeholder="+213..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="dateDeNaissance"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormControl>
                <DatePickerField {...field} label="Date de naissance" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={methods.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold text-slate-500">
              Email
            </FormLabel>
            <FormControl>
              <Input type="email" placeholder="ex@gmail.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>,

    // Step 2
    <>
      <FormField
        control={methods.control}
        name="service"
        render={({ field }) => (
          <MultiSelectField
            field={field}
            label="Service"
            options={serviceOptions}
          />
        )}
      />
      <FormField
        control={methods.control}
        name="serviceStatus"
        render={({ field }) => (
          <MultiSelectField
            field={field}
            label="Status"
            options={serviceStatusOptions}
          />
        )}
      />
      <FormField
        control={methods.control}
        name="disponibilite"
        render={({ field }) => (
          <MultiSelectField
            field={field}
            label="Disponibilité"
            options={disponibiliteOptions}
            description="Matin: 10:00 - 16:00, Soir: 17:00 - 21:00"
          />
        )}
      />
    </>,

    // Step 3
    <>
      <FormField
        control={methods.control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold text-slate-500">
              Message
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Your message..."
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>,
  ];

  return (
    <div className="w-full max-w-2xl">
      <FormProvider {...methods}>
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {stepFields[step]}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between pt-4">
              {step > 0 ? (
                <Button type="button" variant="link" onClick={onBack}>
                  <ChevronLeft size={12} className="mr-1" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step === fieldsPerStep.length - 1 ? (
                // Final step: run full form validation & submit
                <Button
                  type="button"
                  onClick={methods.handleSubmit(onSubmit)}
                  className="bg-emerald-400 hover:bg-emerald-500 transition-all duration-300 cursor-pointer"
                >
                  Submit
                </Button>
              ) : (
                // Intermediate step: validate only current fields and go next
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-emerald-400 hover:bg-emerald-500 transition-all duration-300 cursor-pointer"
                >
                  Next
                </Button>
              )}
            </div>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
}
