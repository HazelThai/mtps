"use client";
import CardActitvity from "@/app/components/features/dashboard/CardActitvity";
import CardComponent from "@/app/components/features/dashboard/CardComponent";
import { useSelector } from "@/store";
import { AppTypes } from "@/types";
import { Activity, Award, BookOpen, CheckCircle } from "lucide-react";
const MockDataActivities: AppTypes.Post[] = [
  {
    id: "1",
    title: "Research Methodology Workshop",
    description: "A workshop on research methodology",
    dateStart: 1715702400000,
    dateEnd: 1715702400000,
    points: 20,
    status: "Public",
    location: "Online",
    tags: ["Workshop"],
    category: "Mental Physical",
    semester: "2023-2024",
    faculty: "Faculty 1",
    testId: "",
    questions: [],
  },
  {
    id: "2",
    title: "Data Analysis Seminar",
    description: "A seminar on data analysis",
    dateStart: 1715702400000,
    dateEnd: 1715702400000,
    points: 15,
    status: "Public",
    location: "Online",
    tags: ["Seminar"],
    category: "Mental Physical",
    semester: "2023-2024",
    faculty: "Faculty 1",
    testId: "",
    questions: [],
  },
];
export default function Student() {
  const me = useSelector((state) => state.me.user);
  return (
    <div className="space-y-10 p-4 md:p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome back! Track your activities and training points.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        {/* Total Points Card */}
        <CardComponent
          title="Total Points"
          icon={<Award className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
          value={85}
        />

        {/* Activities Completed Card */}
        <CardComponent
          title="Activities Completed"
          icon={
            <CheckCircle className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          }
          value={7}
        />

        {/* Available Activities Card */}
        <CardComponent
          title="Available Activities"
          icon={
            <BookOpen className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          }
          value={12}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activities Card */}
        <div className="col-span-full rounded-lg background-common lg:col-span-4">
          <CardActitvity
            title="Activities Completed"
            description="Activities you have completed"
            icon={
              <BookOpen className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            }
            activities={MockDataActivities}
          />
        </div>

        {/* Upcoming Activities Card */}
        {/* <div className="col-span-full rounded-lg background-common lg:col-span-3">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Upcoming Activities</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Activities you can join soon
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                name: "Literature Review Workshop",
                date: "August 12, 2023",
                points: 25,
              },
              {
                name: "Statistical Methods",
                date: "September 20, 2023",
                points: 32,
              },
              { name: "Research Ethics", date: "October 5, 2023", points: 18 },
              {
                name: "Presentation Skills",
                date: "November 15, 2023",
                points: 22,
              },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-800"
              >
                <div className="flex-1 space-y-1">
                  <p className="font-medium">{activity.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium dark:bg-gray-800">
                    <Award className="mr-1 h-3 w-3" />
                    {activity.points} points
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="col-span-full rounded-lg background-common lg:col-span-3">
          <CardActitvity
            title="Activities Coming Soon"
            description="Activities you can join soon"
            icon={
              <BookOpen className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            }
            activities={MockDataActivities}
          />
        </div>
      </div>
    </div>
  );
}
