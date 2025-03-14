"use client";

import CardComponent from "@/app/components/features/dashboard/Card";
import { useSelector } from "@/store";
import { Card, CardContent, CardHeader } from "@mui/material";
import { FileTextIcon, FileXIcon, UsersIcon } from "lucide-react";

export default function Faculty() {
  const me = useSelector((state) => state.me.user);
  return (
    <div className="p-3 grid grid-cols-1 gap-10">
      <div>
        <h1 className="text-4xl font-bold">Welcome {me?.name}</h1>
        <p className="text-lg text-muted-foreground">
          Welcome back! Manage your posts, students, and more
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <CardComponent
          title="Total Posts Active"
          icon={<FileTextIcon className="w-5 h-5" />}
          value={10}
        />
        <CardComponent
          title="Total Posts Expired"
          icon={<FileXIcon className="w-5 h-5" />}
          value={10}
        />
        <CardComponent
          title="Total Students Of Faculty"
          icon={<UsersIcon className="w-5 h-5" />}
          value={45}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <CardComponent
            title="Recent Acitivies"
            subTitle="Your most recent posts and activities that you created"
            children={[
              {
                titleChild: "Research Methodology",
                subTitleChild: "Posted 2 days ago",
                status: "public",
                number_student_joined: 10,
              },
              {
                titleChild: "Research Methodology 2",
                subTitleChild: "Posted 5 days ago",
                status: "public",
                number_student_joined: 10,
              },
            ]}
            typeChild="card"
          />
        </div>
        <div>
          <CardComponent
            title="Top Students"
            subTitle="Students with the highest points and quick actions"
            children={[
              {
                titleChild: "Student 001",
                subTitleChild: "ID001",
                point: 10,
              },
              {
                titleChild: "Student 002",
                subTitleChild: "ID002",
                point: 10,
              },
            ]}
            typeChild="list"
          />
        </div>
      </div>
    </div>
  );
}
