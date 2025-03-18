import { AppTypes } from "@/types";
import dayjs from "dayjs";
import { Award } from "lucide-react";


export default function CardActitvity({
  title,
  description,
  icon,
  activities,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  activities: AppTypes.Post[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
      <div className="space-y-4">
        {activities.map((activity, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-800"
          >
            <div className="flex-1 space-y-1">
              <p className="font-medium">{activity.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {dayjs(activity.dateStart).format("DD MMM YYYY")} -{" "}
                {dayjs(activity.dateEnd).format("DD MMM YYYY")}
              </p>
            </div>
            <div className="flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium dark:bg-gray-800">
              <Award className="mr-1 h-3 w-3" />
              {activity.points} points
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
