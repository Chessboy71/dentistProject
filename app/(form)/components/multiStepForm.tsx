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

// ✅ Define ONE schema for the whole form
const formSchema = z
  .object({
    firstName: z.string().min(2, "Required"),
    lastName: z.string().min(2, "Required"),
    telephone: z.string().min(2, "Required"),
    dateDeNaissance: z.date({ required_error: "Date required" }),
    email: z.string().email("Invalid email"),
    reason: z.string().min(2, "Required"),
    password: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
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
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      telephone: "",
      dateDeNaissance: undefined,
      email: "",
      reason: "",
      password: "",
      confirmPassword: "",
    },
  });

  const fieldsPerStep = [
    ["firstName", "lastName", "telephone", "dateDeNaissance", "email"],
    ["reason"],
    ["password", "confirmPassword"],
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

  const stepFields = [
    // Step 1
    <>
      <div className="flex flex-row gap-4">
        <FormField
          control={methods.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>First Name</FormLabel>
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
              <FormLabel>Last Name</FormLabel>
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
              <FormLabel>Telephone</FormLabel>
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
            <FormLabel>Email</FormLabel>
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
        name="reason"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Reason</FormLabel>
            <FormControl>
              <Input placeholder="Enter reason" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>,

    // Step 3
    <>
      <FormField
        control={methods.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={methods.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input type="password" {...field} />
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
