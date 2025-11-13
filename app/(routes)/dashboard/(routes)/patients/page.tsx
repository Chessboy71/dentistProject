import PageHeader from "@/components/PageHeader";
import { DataTable } from "./components/patientsTable";
import { columns, Patient } from "./components/columns";

const PatientsPage = () => {
  const data: Patient[] = [
    {
      id: "1",
      name: "Bentegri Yacine",
      status: "done",
      email: "bentegrimohamed@gmail.com",
      lastConsultation: new Date("2023-06-01"),
      registrationDate: new Date("2022-01-15"),
    },
    {
      id: "2",
      name: "Amina Rahmani",
      status: "urgent",
      email: "amina.rahmani@gmail.com",
      lastConsultation: new Date("2024-04-10"),
      registrationDate: new Date("2023-05-22"),
    },
    {
      id: "3",
      name: "Karim Haddad",
      status: "medium",
      email: "karim.haddad@yahoo.com",
      lastConsultation: new Date("2024-09-14"),
      registrationDate: new Date("2022-12-30"),
    },
    {
      id: "4",
      name: "Sara Benali",
      status: "not urgent",
      email: "sara.benali@gmail.com",
      lastConsultation: new Date("2024-07-21"),
      registrationDate: new Date("2023-03-12"),
    },
    {
      id: "5",
      name: "Omar Bensaid",
      status: "done",
      email: "omar.bensaid@hotmail.com",
      lastConsultation: new Date("2025-02-05"),
      registrationDate: new Date("2023-08-19"),
    },
    {
      id: "6",
      name: "Leila Mecheri",
      status: "canceled",
      email: "leila.mecheri@gmail.com",
      lastConsultation: new Date("2024-05-03"),
      registrationDate: new Date("2022-11-07"),
    },
    {
      id: "7",
      name: "Nabil Zerrouki",
      status: "urgent",
      email: "nabil.zerrouki@gmail.com",
      lastConsultation: new Date("2024-12-01"),
      registrationDate: new Date("2023-01-29"),
    },
    {
      id: "8",
      name: "Fatima Zohra",
      status: "medium",
      email: "fatima.zohra@gmail.com",
      lastConsultation: new Date("2024-10-17"),
      registrationDate: new Date("2023-04-15"),
    },
    {
      id: "9",
      name: "Youssef Belkacem",
      status: "done",
      email: "youssef.belkacem@gmail.com",
      lastConsultation: new Date("2024-08-23"),
      registrationDate: new Date("2022-09-04"),
    },
    {
      id: "10",
      name: "Kenza Dali",
      status: "not urgent",
      email: "kenza.dali@gmail.com",
      lastConsultation: new Date("2024-03-11"),
      registrationDate: new Date("2023-06-28"),
    },
    {
      id: "11",
      name: "Hichem Bouzid",
      status: "urgent",
      email: "hichem.bouzid@gmail.com",
      lastConsultation: new Date("2025-01-20"),
      registrationDate: new Date("2022-02-14"),
    },
    {
      id: "12",
      name: "Nadia Boudiaf",
      status: "medium",
      email: "nadia.boudiaf@gmail.com",
      lastConsultation: new Date("2024-09-30"),
      registrationDate: new Date("2023-03-09"),
    },
    {
      id: "13",
      name: "Tarek Amrani",
      status: "done",
      email: "tarek.amrani@gmail.com",
      lastConsultation: new Date("2024-11-12"),
      registrationDate: new Date("2022-07-01"),
    },
    {
      id: "14",
      name: "Rania Cherif",
      status: "canceled",
      email: "rania.cherif@gmail.com",
      lastConsultation: new Date("2024-05-19"),
      registrationDate: new Date("2023-09-02"),
    },
    {
      id: "15",
      name: "Walid Saidi",
      status: "not urgent",
      email: "walid.saidi@gmail.com",
      lastConsultation: new Date("2025-03-07"),
      registrationDate: new Date("2022-10-11"),
    },
    {
      id: "16",
      name: "Imane Khaldi",
      status: "medium",
      email: "imane.khaldi@gmail.com",
      lastConsultation: new Date("2024-06-23"),
      registrationDate: new Date("2023-02-05"),
    },
    {
      id: "17",
      name: "Mehdi Lounis",
      status: "done",
      email: "mehdi.lounis@gmail.com",
      lastConsultation: new Date("2024-12-28"),
      registrationDate: new Date("2022-08-20"),
    },
    {
      id: "18",
      name: "Selma Kaci",
      status: "urgent",
      email: "selma.kaci@gmail.com",
      lastConsultation: new Date("2024-09-08"),
      registrationDate: new Date("2023-10-14"),
    },
    {
      id: "19",
      name: "Adel Guemari",
      status: "canceled",
      email: "adel.guemari@gmail.com",
      lastConsultation: new Date("2025-01-03"),
      registrationDate: new Date("2022-04-17"),
    },
    {
      id: "20",
      name: "Lina Boudjemaa",
      status: "medium",
      email: "lina.boudjemaa@gmail.com",
      lastConsultation: new Date("2024-11-25"),
      registrationDate: new Date("2023-07-08"),
    },
    {
      id: "21",
      name: "Riad Ferhat",
      status: "not urgent",
      email: "riad.ferhat@gmail.com",
      lastConsultation: new Date("2024-08-30"),
      registrationDate: new Date("2022-05-23"),
    },
  ];

  return (
    <div className="p-6 px-8 space-y-6">
      <PageHeader
        title="Patients"
        description="This is the patients page, they should be displayed here"
      />

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default PatientsPage;
