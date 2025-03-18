"use client";

import CustomTabs from "@/app/components/@shared/tabs/CustomTabs";
import CardComponent from "@/app/components/features/dashboard/CardComponent";
import TableActivities from "@/app/components/features/student/TableActivities";
import { AppTypes } from "@/types";
import { Award, BookOpen } from "lucide-react";
import { useState } from "react";
export default function TrainingPointsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const tabs: AppTypes.TabType[] = [
    {
      title: "All",
      value: "all",
    },
    {
      title: "Academic",
      value: "academic",
    },
    {
      title: "Volunteer",
      value: "volunteer",
    },
    {
      title: "Mental Physical",
      value: "mental-physical",
    },
    {
      title: "Discipline",
      value: "discipline",
    },
    {
      title: "Reward",
      value: "reward",
    },
    {
      title: "Pioneering",
      value: "pioneering",
    },
  ];
  const [student, setStudent] = useState<AppTypes.Student>({
    id: "1",
    name: "John Doe",
    email: "john.doe@student.edu",
    phone: "+1 (555) 123-4567",
    department: "Computer Science",
    totalActivities: 12,
    totalPoints: 85,
    joinDate: "September 2021",
    categories: [
      {
        id: 1,
        name: "Academic",
        total_points: 35,
        activities: [
          {
            id: 1,
            name: "Research Methodology Workshop",
            date: "May 15, 2023",
            points: 20,
          },
          {
            id: 3,
            name: "Academic Writing Skills",
            date: "July 5, 2023",
            points: 15,
          },
        ],
      },
      {
        id: 2,
        name: "Volunteer",
        total_points: 25,
        activities: [
          {
            id: 7,
            name: "Community Service Day",
            date: "April 10, 2023",
            points: 15,
          },
          {
            id: 8,
            name: "Environmental Cleanup",
            date: "June 22, 2023",
            points: 10,
          },
        ],
      },
      {
        id: 3,
        name: "Mental Physical",
        total_points: 15,
        activities: [
          { id: 9, name: "Campus Marathon", date: "March 5, 2023", points: 10 },
          {
            id: 10,
            name: "Mindfulness Workshop",
            date: "August 15, 2023",
            points: 5,
          },
        ],
      },
      {
        id: 4,
        name: "Discipline",
        total_points: -5,
        activities: [
          {
            id: 1,
            name: "Late submission of assignment",
            date: "June 5, 2023",
            points: -2,
          },
          {
            id: 2,
            name: "Missed mandatory seminar",
            date: "July 12, 2023",
            points: -3,
          },
        ],
      },
      {
        id: 5,
        name: "Reward",
        total_points: 10,
        activities: [],
      },
      {
        id: 6,
        name: "Pioneering",
        total_points: 5,
        activities: [],
      },
    ],
  });

  return (
    <div className="space-y-10 p-4 md:p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Training Points</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Track your training points and activities.
        </p>
      </div>
      <div className="grid gap-4 rounded-lg bg-common md:grid-cols-1 lg:grid-cols-2">
        <div className="col-span-full lg:col-span-1">
          <CardComponent title="Total Points" icon={<Award />} value={100} />
        </div>
        <div className="col-span-full lg:col-span-1">
          <CardComponent
            title="Activities Completed"
            icon={<BookOpen />}
            value={100}
          />
        </div>
      </div>
      <CustomTabs tabs={tabs} value={activeTab} onChange={setActiveTab} />
      <TableActivities
        isFaculty={false}
        category={activeTab}
        total_points={
          student.categories.find(
            (category) =>
              category.name.toUpperCase() === activeTab.toUpperCase()
          )?.total_points || 0
        }
        activities={
          student.categories.find(
            (category) =>
              category.name.toUpperCase() === activeTab.toUpperCase()
          )?.activities || []
        }
      />
    </div>
  );
}
