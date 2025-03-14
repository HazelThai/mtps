"use client";

import StudentInformation from "@/app/components/features/student/StudentInformation";
import { Box, Button, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SchoolIcon from "@mui/icons-material/School";
import { CalendarIcon } from "@mui/x-date-pickers/icons";
import { BadgeIcon } from "lucide-react";
import { useState } from "react";
import TabCategories from "@/app/components/features/student/TabCategories";
import TableActivities from "@/app/components/features/student/TableActivities";
import { AppTypes } from "@/types";
export default function StudentDetails() {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("Academic");
  const [student, setStudent] = useState<AppTypes.Student>({
    id: id as string,
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
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleChangeCategory = (category: string) => {
    setSelectedCategory(category);
  };
  const router = useRouter();
  const TAB_CATEGORIES = [
    "Academic",
    "Volunteer",
    "Mental Physical",
    "Discipline",
    "Reward",
    "Pioneering",
  ];
  return (
    <div className="p-4 flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">Student Details</h1>
          <p className="text-lg text-gray-500">
            View detailed information and training points for this student
          </p>
        </div>
        <div>
          <Button
            variant="contained"
            sx={{ backgroundColor: "black", color: "white" }}
            onClick={() => router.push("/faculty/students")}
          >
            Back to List Students
          </Button>
        </div>
      </div>
      {/* information and training points */}
      <div className="border-2 border-gray-300 rounded-lg p-4 flex flex-col gap-5 col-span-12 md:col-span-8">
        <div>
          <h1 className="text-2xl font-bold">Student Information</h1>
          <p className="text-gray-500">Personal and academic information</p>
        </div>
        <div className="grid grid-rows-2 gap-5">
          <div className="grid grid-cols-3 items-center">
            <StudentInformation
              title={student.name}
              subtitle="Full Name"
              icon={<PersonIcon />}
            />
            <StudentInformation
              title={student.id as string}
              subtitle="Student ID"
              icon={<BadgeIcon />}
            />
            <StudentInformation
              title={student.email}
              subtitle="Email"
              icon={<EmailIcon />}
            />
          </div>
          <div className="grid grid-cols-3 items-center">
            <StudentInformation
              title={student.phone}
              subtitle="Phone"
              icon={<PhoneIcon />}
            />
            <StudentInformation
              title={student.department}
              subtitle="Department"
              icon={<SchoolIcon />}
            />
            <StudentInformation
              title={student.joinDate}
              subtitle="Joined"
              icon={<CalendarIcon />}
            />
          </div>
          <div className="w-full h-[2px] bg-gray-300"></div>
          <div className="flex items-center m-auto gap-20">
            <div className="flex flex-col items-center gap-2">
              <p className="text-2xl font-bold">{student.totalPoints}</p>
              <p className="text-gray-500">Total Points</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-2xl font-bold">{student.totalActivities}</p>
              <p className="text-gray-500">Activities</p>
            </div>
          </div>
        </div>
      </div>

      {/* training points */}
      <div className="border-2 border-gray-300 rounded-lg p-4 mt-10">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">Training Points Categories</p>
          <p className="text-gray-500">
            Detailed breakdown of training points by category
          </p>
        </div>
        <div className="mt-5">
          <div className="w-full h-15 border-2 bg-black rounded-sm p-2 grid grid-cols-6 gap-6">
            {TAB_CATEGORIES.map((category) => (
              <TabCategories
                key={category}
                category={category}
                isActive={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
            {/* <TabCategories
              category="Volunteer"
              isActive={selectedCategory === "Volunteer"}
            />
            <TabCategories
              category="Mental Physical"
              isActive={selectedCategory === "Mental Physical"}
            />
            <TabCategories
              category="Discipline"
              isActive={selectedCategory === "Discipline"}
            />
            <TabCategories
              category="Reward"
              isActive={selectedCategory === "Reward"}
            />
            <TabCategories
              category="Pioneering"
              isActive={selectedCategory === "Pioneering"}
            /> */}
          </div>
          <TableActivities
            category={selectedCategory}
            total_points={
              student?.categories?.find(
                (category) => category.name === selectedCategory
              )?.total_points || 0
            }
            activities={
              student?.categories?.find(
                (category) => category.name === selectedCategory
              )?.activities || []
            }
          />
        </div>
      </div>
    </div>
  );
}
