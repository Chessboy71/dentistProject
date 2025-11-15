import { Button } from "@/components/ui/button";
import { ArrowLeftCircle, Download, Trash } from "lucide-react";

const PatientPageHeader = () => {
  return (
    <div className="w-full bg-white border py-3 px-6 flex items-center justify-between border-l-0">
      <Button variant="outline" className="text-xs font-semibold ">
        <ArrowLeftCircle className="size-3" />
        Back
      </Button>
      <div>
        <Button
          variant="outline"
          className="text-xs font-semibold rounded-r-none"
        >
          <Download className="size-3" />
          Export PDF
        </Button>
        <Button
          variant="destructive"
          className="text-xs font-semibold rounded-l-none"
        >
          <Trash className="size-3" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PatientPageHeader;
