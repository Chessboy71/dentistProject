"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import Link from "next/link";
import StatusTags from "./StatusTags";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Patient = {
  id: string;
  name: string;
  status: "urgent" | "medium" | "not urgent" | "done" | "canceled";
  email: string;
  lastConsultation: Date;
  registrationDate: Date;
};

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nom complet",
    cell: (row) => {
      return (
        <Link
          className="font-bold hover:underline cursor-pointer hover:text-emerald-500"
          href={`/dashboard/patients/1`}
        >
          {row.getValue<string>()}
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: (row) => {
      return (
        <StatusTags status={row.getValue<string>() as Patient["status"]} />
      );
    },
  },
  {
    accessorKey: "lastConsultation",
    header: "Dernière consultation",
    cell: (row) => {
      return row.getValue<Date>().toLocaleDateString();
    },
  },
  {
    accessorKey: "registrationDate",
    header: "Date d'inscription",
    cell: (row) => {
      return row.getValue<Date>().toLocaleDateString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-xs">
            <DropdownMenuLabel className="font-semibold text-slate-500 text-xs">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
              className="text-xs"
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator className="opacity-45" />
            <DropdownMenuItem className="text-xs">
              View customer
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs">
              View payment details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
