import { AppTypes } from "@/types";
import dayjs from "dayjs";
import { Award, BookOpen, Calendar, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type TabContentProps = {
  data: AppTypes.Post[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function TabContent({
  data,
  activeTab,
  setActiveTab,
}: TabContentProps) {
  // Function to get status badge
  const getFilteredActivitiesByTab = () => {
    if (activeTab === "all") {
      return data;
    } else if (activeTab === "completed") {
      return data.filter((activity) =>
        dayjs(activity.dateEnd).isBefore(dayjs())
      );
    } else {
      return data.filter((activity) => activity.category === activeTab);
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "Public")
      return (
        <span className="text-white bg-green-700 px-2 py-1 rounded-md">
          Public
        </span>
      );
    if (status === "Private")
      return (
        <span className="text-white bg-red-700 px-2 py-1 rounded-md">
          Private
        </span>
      );
    return <span className="text-gray-500">Unknown</span>;
  };

  return (
    <>
      {getFilteredActivitiesByTab()?.map((activity) => (
        <div
          key={activity.id}
          className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950"
        >
          {/* Card Header */}
          <div className="border-b border-gray-200 p-4 dark:border-gray-800">
            <div className="flex justify-between">
              <h3 className="font-semibold">{activity.title}</h3>
              {getStatusBadge(activity.status)}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {activity.faculty}
            </p>
          </div>

          {/* Card Content */}
          <div className="p-4">
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              {activity.description}
            </p>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span>
                  {dayjs(activity.dateStart).format("DD/MM/YYYY")} -{" "}
                  {dayjs(activity.dateEnd).format("DD/MM/YYYY")}
                </span>
              </div>
              <div className="flex items-center gap-1 ">
                <Award className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span>{activity.points} points</span>
              </div>
              <div className="flex items-center gap-1 ">
                <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span>{activity.total_students} students</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4 text-gray-500 dark:text-gray-400 justify-end" />
                <span>{activity.status}</span>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="p-4 m-auto flex w-fit">
            {activity.location === "Online" ? (
              <Link href={`/student/post-activity/${activity.id}`}>
                <button className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 cursor-pointer">
                  Take Test
                </button>
              </Link>
            ) : (
              <button className="flex-1 rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 cursor-pointer">
                Join Activity
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
