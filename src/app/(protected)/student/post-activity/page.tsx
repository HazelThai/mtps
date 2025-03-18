"use client";
import CustomTabs from "@/app/components/@shared/tabs/CustomTabs";
import { AppTypes } from "@/types";
import dayjs from "dayjs";
import { Search } from "lucide-react";
import { useState } from "react";
import TabContent from "./TabContent";
const mockActivities: AppTypes.Post[] = [
  {
    id: "1",
    title: "Activity 1",
    description: "Description 1",
    dateStart: 1715702400000,
    dateEnd: 1715702400000,
    points: 10,
    status: "Public",
    location: "Location 1",
    tags: ["Tag 1"],
    category: "Academic",
    semester: "Summer 2023-2024",
    total_students: 10,
    faculty: "Faculty 1",
    testId: "",
    questions: [],
  },
];
const tabs: AppTypes.TabType[] = [
  { title: "All", value: "all" },
  { title: "Academic", value: "Academic" },
  { title: "Volunteer", value: "Volunteer" },
  { title: "Mental Physical", value: "Mental Physical" },
  { title: "Completed", value: "completed" },
];
export default function PostActivity() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getFilteredActivitiesByTab = () => {
    if (activeTab === "all") {
      return mockActivities;
    } else if (activeTab === "completed") {
      return mockActivities.filter((activity) =>
        dayjs(activity.dateEnd).isBefore(dayjs())
      );
    } else {
      return mockActivities.filter(
        (activity) => activity.category === activeTab
      );
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Activities</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Browse and join activities to earn training points.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search activities..."
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pl-8 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-950 dark:focus:border-gray-400 dark:focus:ring-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Custom Tabs */}
      <CustomTabs tabs={tabs} value={activeTab} onChange={setActiveTab} />

      {/* Tab content */}
      <div className="mt-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* {getFilteredActivitiesByTab().map((activity) => (
            <TabContent activity={activity} />
          ))} */}
          <TabContent
            data={mockActivities}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    </div>
  );
}
