"use client";

import { DatePickerField } from "@/app/(form)/components/DatePicker";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const PatientOverviewTab = () => {
  return (
    <div className="border rounded-lg ">
      <div className="py-8 border-b ml-auto mr-auto flex flex-col items-center">
        {" "}
        <h2 className="text-2xl w-11/12 font-bold text-emerald-500">
          Overview
        </h2>
        <p className="text-sm text-slate-500 w-11/12">
          Overview of the patient’s information such as personal information.
        </p>
      </div>
      <PatientsOverviewTabForm />
    </div>
  );
};

export default PatientOverviewTab;

const PatientsOverviewTabForm = () => {
  const formSchema = z.object({
    firstName: z.string().min(2, "Required"),
    lastName: z.string().min(2, "Required"),
    telephone: z.string().min(2, "Required"),
    dateDeNaissance: z.date(),
    email: z.email("Invalid email address"),
    lastConstultation: z.date().optional(),
    registrationDate: z.date().optional(),
    service: z.array(z.string()).min(1, "Required"),
    serviceStatus: z.array(z.string()).min(1, "Required"),
    disponibilite: z.array(z.string()).min(1, "Required"),
    message: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      telephone: "",
      dateDeNaissance: undefined,
      email: "",
      lastConstultation: undefined,
      registrationDate: undefined,
      service: [],
      serviceStatus: [],
      disponibilite: [],
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col items-center py-6 w-11/12 mr-auto ml-auto"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="flex flex-row w-full">
              <FormLabel className="w-1/3 font-semibold text-slate-500">
                First Name
              </FormLabel>
              <FormControl className="w-2/3">
                <Input placeholder="ex. John" {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="flex flex-row w-full">
              <FormLabel className="w-1/3 font-semibold text-slate-500">
                Last Name
              </FormLabel>
              <FormControl className="w-2/3">
                <Input placeholder="ex. Doe" {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateDeNaissance"
          render={({ field }) => (
            <FormItem className="flex flex-row w-full">
              <FormLabel className="w-1/3 font-semibold text-slate-500">
                Date de Naissance
              </FormLabel>
              <FormControl className="w-2/3">
                <DatePickerField {...field} label="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telephone"
          render={({ field }) => (
            <FormItem className="flex flex-row w-full">
              <FormLabel className="w-1/3 font-semibold text-slate-500">
                Telephone
              </FormLabel>
              <FormControl className="w-2/3">
                <Input
                  placeholder="ex. 0788997744"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-row w-full">
              <FormLabel className="w-1/3 font-semibold text-slate-500">
                Email
              </FormLabel>
              <FormControl className="w-2/3">
                <Input
                  placeholder="ex. example@example.com"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastConstultation"
          render={({ field }) => (
            <FormItem className="flex flex-row w-full">
              <FormLabel className="w-1/3 font-semibold text-slate-500">
                Derniere Consultation
              </FormLabel>
              <FormControl className="w-2/3">
                <DatePickerField {...field} label="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="registrationDate"
          render={({ field }) => (
            <FormItem className="flex flex-row w-full">
              <FormLabel className="w-1/3 font-semibold text-slate-500">
                Date d&apos;inscription
              </FormLabel>
              <FormControl className="w-2/3">
                <DatePickerField {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="self-end px-8">
          Submit
        </Button>
      </form>
    </Form>
  );
};
