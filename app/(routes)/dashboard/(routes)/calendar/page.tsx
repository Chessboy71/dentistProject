import PageHeader from "@/components/PageHeader";
import ScheduleBoard from "./components/ScheduleBoards";

const CalendarPage = () => {
  return (
    <main className="p-6 px-8 space-y-6">
      <PageHeader
        title="Calendrier"
        description="This is the calendar page, your appointements should be displayed here"
      />

      <div>
        <ScheduleBoard />
      </div>
    </main>
  );
};

export default CalendarPage;
