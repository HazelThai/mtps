"use client";
import { AppTypes } from "@/types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { MoreVerticalIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { TabValue } from "./page";
import { useNewDialogPost } from "./NewDialogPost";
const mockData: AppTypes.Post[] = [
  {
    id: "1",
    title: "Post 1",
    description: "Description 1",
    dateStart: 1715404800,
    dateEnd: 1715404800,
    points: 10,
    status: "Public",
    location: "Location 1",
    tags: ["Tag 1", "Tag 2"],
    category: "Academic",
    students_joined: ["1", "2"],
    total_students: 10,
    semester: "Semester 1",
    image: "",
    faculty: "Faculty 1",
    testId: "",
    questions: [],
  },
  {
    id: "2",
    title: "Post 2",
    description: "Description 2",
    dateStart: 1715404800,
    dateEnd: 1715404800,
    points: 10,
    status: "Public",
    location: "Location 1",
    tags: ["Tag 1", "Tag 2"],
    category: "Academic",
    students_joined: ["1", "2"],
    total_students: 10,
    semester: "Semester 2 (2024-2025)",
    image: "",
    faculty: "Faculty 1",
    testId: "",
    questions: [],
  },
  {
    id: "3",
    title: "Post 3",
    description: "Description 3",
    dateStart: 1715404800,
    dateEnd: 1715404800,
    points: 10,
    status: "Public",
    location: "Location 1",
    tags: ["Tag 1", "Tag 2"],
    category: "Academic",
    students_joined: ["1", "2"],
    total_students: 10,
    semester: "Semester 2 (2024-2025)",
    image: "",
    faculty: "Faculty 1",
    testId: "",
    questions: [],
  },
];
export default function PostCard({ value }: { value: TabValue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [posts, setPosts] = useState<AppTypes.Post[]>(mockData);
  const [selectedPost, setSelectedPost] = useState<AppTypes.Post | null>(
    null
  );
  const { renderDialog, showDialog, hideDialog } = useNewDialogPost();

  const handleOpen = (
    event: React.MouseEvent<HTMLElement>,
    post: AppTypes.Post
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedPost(post);
    setIsOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  const handleEdit = () => {
    handleClose();
    const initialTab = selectedPost?.location?.toLowerCase().includes("online")
      ? "test"
      : "activity";

    showDialog({
      onOk: async (data) => {
        console.log("Updated data:", data);
        return true;
      },
      onCancel: () => {},
      initialData: selectedPost || undefined,
      initialTab: initialTab,
    });
  };

  if (!posts) return null;
  const filteredPosts = posts.filter((post) => {
    // Check if post is expired
    const isExpired = dayjs.unix(post.dateEnd).isBefore(dayjs());

    if (value === TabValue.ALL_POST) return !isExpired; // Exclude expired posts from All Post tab
    if (value === TabValue.PUBLIC_POST) return post.status === "Public";
    if (value === TabValue.PRIVATE_POST) return post.status === "Private";
    if (value === TabValue.EXPIRED_POST) return isExpired;
  });

  return (
    <AnimatePresence>
      {filteredPosts.map((post) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            sx={{
              position: "relative",
              borderRadius: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                cursor: "pointer",
              },
            }}
          >
            <Box sx={{ position: "absolute", top: 0, right: 0 }}>
              <Button onClick={(e) => handleOpen(e, post)}>
                <MoreVerticalIcon color="black" />
              </Button>
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              onClick={(e) => e.stopPropagation()}
            >
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem>Delete</MenuItem>
            </Menu>
            <CardHeader
              style={{
                height: "250px",
                maxWidth: "400px",
                padding: 0,
                overflow: "hidden",
              }}
              sx={{
                ".MuiCardHeader-content": {
                  height: "100%",
                  width: "100%",
                },
                ".MuiCardHeader-title": {
                  height: "100%",
                  width: "100%",
                },
              }}
              title={
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  {post?.image ? (
                    <Image
                      src={post.image || ""}
                      alt={post.title || "image"}
                      width={100}
                      height={100}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  ) : (
                    <Image
                      src="/example.jpeg"
                      alt="image"
                      width={100}
                      height={100}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  )}
                </Box>
              }
            />
            <Divider />
            <CardContent
              sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="h5">{post?.title}</Typography>
                <Typography variant="body2">
                  {dayjs.unix(post?.dateStart).format("DD/MM/YYYY")} -{" "}
                  {dayjs.unix(post?.dateEnd).format("DD/MM/YYYY")}
                </Typography>
              </Box>
              <Typography variant="body1">{post?.description}</Typography>
              <Divider />
              <Typography variant="body1">Status: {post?.status}</Typography>
              <Typography variant="body1">
                Location: {post?.location}
              </Typography>
              <Typography variant="body1">
                Category: {post?.category}
              </Typography>
              <Typography variant="body1">
                Students joined: {post?.total_students}
              </Typography>
              <Typography variant="body1">
                Semester: {post?.semester}
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {post?.tags?.map((tag) => (
                  <Chip key={tag} label={tag} />
                ))}
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      ))}
      {renderDialog()}
    </AnimatePresence>
  );
}
