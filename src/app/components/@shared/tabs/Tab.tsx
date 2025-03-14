"use client";
import type React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import type { ReactNode } from "react";
import { SxProps } from "@mui/material";

interface CustomTabsProps {
  value: string;
  onChange: (event: React.SyntheticEvent, newValue: string) => void;
  tabs: string[];
  children?: ReactNode;
  boxSx?: SxProps;
  tabsSx?: SxProps;
}

export default function CustomTabs({
  value,
  onChange,
  tabs,
  children,
  boxSx,
  tabsSx,
}: CustomTabsProps) {
  return (
    <Box
      sx={{
        bgcolor: "black",
        borderRadius: 2,
        mt: 4,
        p: 1,
        ...boxSx,
      }}
    >
      <Tabs
        sx={{
          "& .MuiTabs-list": {
            display: "flex",
            gap: 3,
            justifyContent: "center",
            alignItems: "center",
          },
          "& .MuiTabs-indicator": {
            display: "none",
          },
          "& .MuiTab-root": {
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              opacity: 0.9,
              transform: "translateY(-2px)",
            },
          },
          "& .MuiTouchRipple-root": {
            opacity: 0.5,
          },
        }}
        value={value}
        onChange={onChange}
      >
        {tabs.map((label, index) => (
          <Tab
            key={index}
            label={label}
            sx={{
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              color: "white",
              "&.Mui-selected": {
                color: "black",
                bgcolor: "white",
                borderRadius: 2,
              },
              ...tabsSx,
            }}
            value={label.toLowerCase().replace(/\s+/g, "_")}
          />
        ))}
      </Tabs>
      {children}
    </Box>
  );
}
