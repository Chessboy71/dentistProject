"use client";

import { DatePickerField } from "@/app/(form)/components/DatePicker";
import MultiSelectField from "@/app/(form)/components/MultiSelectField";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

const PatientConsultationTab = () => {
  return (
    <div className="border rounded-lg">
      <div className="py-8 border-b ml-auto mr-auto flex flex-col items-center">
        {" "}
        <h2 className="text-2xl w-11/12 font-bold text-emerald-500">
          Consultation
        </h2>
        <p className="text-sm text-slate-500 w-11/12">
          Overview of the patient’s consultation details and history.
        </p>
      </div>
      <PatientsConsultationTabForm />
    </div>
  );
};

export default PatientConsultationTab;

const PatientsConsultationTabForm = () => {
  const formSchema = z.object({
    consultations: z.array(
      z.object({
        type: z.string(),
        date: z.date().optional(),
        perscription: z.array(z.string()),
        notes: z.string().optional(),
      })
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      consultations: [
        { type: "", date: undefined, perscription: [], notes: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "consultations",
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
        <Button
          className="self-end-safe"
          type="button"
          onClick={() =>
            append({ type: "", date: undefined, perscription: [], notes: "" })
          }
        >
          <Plus />
          Ajouter une consultation
        </Button>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="w-full space-y-4 border rounded-lg p-8 flex flex-col"
          >
            {index !== 0 && (
              <Button
                onClick={() => remove(index)}
                variant="ghost"
                className="mb-4 right-0 hover:bg-red-500 hover:text-white self-end"
              >
                <Trash2 />
              </Button>
            )}
            <FormField
              control={form.control}
              name={`consultations.${index}.type`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`consultations.${index}.date`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <DatePickerField {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`consultations.${index}.perscription`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <MultiSelectField
                      field={field}
                      label={""}
                      options={[{ value: "sds", label: "sds" }]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`consultations.${index}.notes`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Notes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}

        <Button type="submit" className="self-end px-8">
          Submit
        </Button>
      </form>
    </Form>
  );
};
