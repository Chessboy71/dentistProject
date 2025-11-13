import { Plus } from "lucide-react";
import { Button } from "./ui/button";

const PageHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
        <p className="text-slate-500">{description}</p>
      </div>
      <Button>
        <Plus /> Add a new patient
      </Button>
    </div>
  );
};

export default PageHeader;
