const StatusTags = ({
  status,
}: {
  status: "urgent" | "medium" | "not urgent" | "done" | "canceled";
}) => {
  const classes =
    "text-xs font-semibold text-white px-4 py-1 rounded-full flex justify-center";
  switch (status) {
    case "urgent":
      return <div className={`${classes} bg-red-500`}>Urgent</div>;
    case "medium":
      return <div className={`${classes} bg-orange-500`}>Medium</div>;
    case "not urgent":
      return <div className={`${classes} bg-yellow-500`}>Not urgent</div>;
    case "done":
      return <div className={`${classes} bg-green-500`}>Done</div>;
    case "canceled":
      return <div className={`${classes} bg-gray-400`}>Canceled</div>;
    default:
      <div className={`${classes}`}>N/A</div>;
  }
};

export default StatusTags;
