"use client";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Button, Drawer } from "@mui/material";
import { Award, Menu, UserCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AuthGuard from "../components/@shared/AuthGuard/AuthGuard";
import DashboardNav from "../components/layout/Nav";
interface ProtectedLayoutProps {
  children: React.ReactNode;
}
interface LinkProps {
  title: string;
  label?: string;
  icon: React.ReactNode;
  href: string;
}
export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();
  const isFaculty = pathname.includes("faculty");
  const Facultylinks: LinkProps[] = [
    {
      title: "Dashboard",
      icon: <HomeIcon />,
      href: "/faculty",
    },
    {
      title: "Posts & Activities",
      icon: <LibraryBooksIcon />,
      href: "/faculty/post-activity",
    },
    {
      title: "Students",
      icon: <PeopleAltIcon />,
      href: "/faculty/students",
    },
  ];
  const StudentLinks: LinkProps[] = [
    {
      title: "Dashboard",
      icon: <HomeIcon />,
      href: "/student",
    },
    {
      title: "Posts & Activities",
      icon: <LibraryBooksIcon />,
      href: "/student/posts-activities",
    },
    {
      title: "Training Points",
      icon: <Award />,
      href: "/student/training-points",
    },
    {
      title: "Profile",
      icon: <UserCircle />,
      href: "/student/profile",
    },
  ];
  const links = isFaculty ? Facultylinks : StudentLinks;
  return (
    <AuthGuard>
      <div className="flex ">
        <div className="md:hidden sticky top-0 z-10">
          <Button onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
            <Menu color="black" />
          </Button>
        </div>
        <aside className="hidden w-80 flex-col border-r md:flex">
          <div className="flex flex-col gap-10 py-10 px-6">
            <Drawer
              anchor="left"
              open={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              sx={{
                "& .MuiDrawer-paper": {
                  width: "270px",
                  py: 8,
                  px: 3,
                },
              }}
            >
              <DashboardNav links={links} isCollapsed={isCollapsed} />
            </Drawer>
            <h2 className="text-2xl font-bold">
              {isFaculty ? "Faculty Dashboard" : "Student Dashboard"}
            </h2>
            <DashboardNav links={links} isCollapsed={isCollapsed} />
          </div>
        </aside>
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        {/* <Footer /> */}
      </div>
    </AuthGuard>
  );
}
