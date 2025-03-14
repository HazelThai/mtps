import { Box, Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: React.ReactNode;
    href: string;
  }[];
}
export default function DashboardNav(props: NavProps) {
  const { isCollapsed, links } = props;
  const pathname = usePathname();

  return (
    <Box sx={{ overflowY: "auto", height: "100vh", width: "100%" }}>
      <div className="flex flex-col gap-6">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <Box
              sx={{
                width: "100%",
                border: "1px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                padding: "10px",
                borderRadius: "10px",
                cursor: "pointer",
                backgroundColor: pathname === link.href ? "black" : "white",
                color: pathname === link.href ? "white" : "black",
                ...(pathname !== link.href && {
                  "&:hover": {
                    backgroundColor: "oklch(0.872 0.01 258.338)",
                    transition: "background-color 0.3s ease",
                  },
                }),
              }}
            >
              {link.icon}
              {!isCollapsed && <span className="ml-2">{link.title}</span>}
              {!isCollapsed && link.label && (
                <span className="ml-auto">{link.label}</span>
              )}
            </Box>
          </Link>
        ))}
      </div>
    </Box>
  );
}
