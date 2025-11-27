import PatientPageHeader from "../components/PatientPageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PatientOverviewTab from "./component/tabs/OverviewTab";
import PatientConsultationTab from "./component/tabs/ConsultationTab";

const PatientPage = () => {
  const patient = {
    id: "1",
    name: "Bentegri Yacine",
    status: "done",
    email: "bentegrimohamed@gmail.com",
    lastConsultation: new Date("2023-06-01"),
    registrationDate: new Date("2022-01-15"),
  };

  const tabs = [
    { value: "overview", label: "Overview", content: <PatientOverviewTab /> },
    {
      value: "consultation",
      label: "Consultation",
      content: <PatientConsultationTab />,
    },
    { value: "notes", label: "Notes", content: <>Notes</> },
    { value: "rendezvous", label: "Rendez-vous", content: <>Rendez-vous</> },
  ];
  return (
    <main>
      <PatientPageHeader />

      <div className="flex flex-col h-center justify-center mt-10 mx-6">
        <span className="text-xs text-slate-400">ID - {patient.id}</span>
        <h3 className="text-slate-900 text-4xl font-bold">{patient.name}</h3>
        <p className="text-slate-600 text-sm font-medium">
          {patient.email}, Registered on{" "}
          <span className="font-black text-emerald-500 text-xs">
            {patient.registrationDate.toLocaleDateString()}
          </span>
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full  mt-10">
        <TabsList className="border-b rounded-none w-full flex flex-row gap-8 pl-6">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="p-6">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
};

export default PatientPage;
