"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Calendar, CircleDollarSign, Users } from "lucide-react";
import { IconHomeFilled } from "@tabler/icons-react";
import { NavUser } from "./user-nav";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const path = usePathname();
  const { state } = useSidebar();

  console.log("Current path:", path);
  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <IconHomeFilled />,
    },
    {
      label: "Patients",
      href: "/dashboard/patients",
      icon: <Users />,
    },
    {
      label: "Calendar",
      href: "/dashboard/calendar",
      icon: <Calendar />,
    },
    {
      label: "Payments",
      href: "/dashboard/payments",
      icon: <CircleDollarSign />,
    },
  ];
  return (
    <Sidebar className="py-2">
      <SidebarHeader className="font-bold text-emerald-500 ml-auto mr-auto text-xl flex flex-row justify-between w-full px-6">
        <div>
          <span className="font-normal text-slate-500 text-sm">Dr.</span>{" "}
          Benyahia
        </div>
        <SidebarTrigger
          className={`text-slate-500 ${
            state === "collapsed" ? "translate-x-14" : ""
          }`}
        />
      </SidebarHeader>
      <SidebarContent className="px-1 pt-16">
        <SidebarGroup className="list-none flex flex-col gap-2">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                className={`${
                  path === item.href
                    ? "bg-emerald-500 text-white hover:bg-emerald-500 hover:text-white"
                    : "hover:text-emerald-500"
                }   `}
              >
                <a href={item.href} className="py-5">
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: "Benyahia",
            email: "benyahia@example.com",
            avatar: "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
