"use client";

import { AppTypes } from "@/types";
import { Box, Button, Tab, Tabs } from "@mui/material";
import PostCard from "./PostCard";
import { useState } from "react";
import CustomTabs from "@/app/components/@shared/tabs/Tab";
import { useNewDialogPost } from "./NewDialogPost";
export enum TabValue {
  ALL_POST = "all_post",
  PUBLIC_POST = "public_post",
  PRIVATE_POST = "private_post",
  EXPIRED_POST = "expired_post",
}
export default function PostActivity() {
  const [tabValue, setTabValue] = useState<TabValue>(TabValue.ALL_POST);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue as TabValue);
  };
  const { renderDialog, showDialog, hideDialog } = useNewDialogPost();
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-1">Post Activity</h1>
          <p className="text-lg text-muted-foreground">
            Create and manage your posts and activities for students
          </p>
        </div>
        <Button
          variant="contained"
          sx={{
            bgcolor: "black",
            color: "white",
          }}
          onClick={() =>
            showDialog({
              onOk: async (data) => {
                console.log(data);
                return true;
              },
              onCancel: () => {},
            })
          }
        >
          + Add New Post / Activity
        </Button>
      </div>
      <Box>
        <CustomTabs
          value={tabValue}
          onChange={handleChange}
          tabs={["All Post", "Public Post", "Private Post", "Expired Post"]}
        />
      </Box>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
        <PostCard value={tabValue} />
      </div>
      {renderDialog()}
    </div>
  );
}
