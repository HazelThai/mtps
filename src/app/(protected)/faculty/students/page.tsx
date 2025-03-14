"use client";
import {
  Button,
  Card,
  CardContent,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import PostCard from "../post-activity/PostCard";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
export default function Students() {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      renderCell: (params) => {
        return <Typography>{params.row.id}</Typography>;
      },
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      renderCell: (params) => {
        return <Typography>{params.row.name}</Typography>;
      },
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      renderCell: (params) => {
        return <Typography>{params.row.email}</Typography>;
      },
      flex: 1,
    },
    {
      field: "total_activities",
      headerName: "Total Activities",
      renderCell: (params) => {
        return <Typography>{params.row.total_activities}</Typography>;
      },
      flex: 1,
    },
    {
      field: "total_points",
      headerName: "Total Points",
      renderCell: (params) => {
        return <Typography>{params.row.total_points}</Typography>;
      },
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => {
        return (
          <Button variant="outlined" sx={{ bgcolor: "black", color: "white" }}>
            View details
          </Button>
        );
      },
      flex: 1,
    },
  ];
  return (
    <div className="p-3 grid grid-cols-1 gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Students</h1>
        <p className="text-lg text-muted-foreground">Manage your students</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="flex flex-col gap-2">
            <Typography variant="h6">Total Students</Typography>
            <Typography variant="h6">100</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-2">
            <Typography variant="h6">Activities Completed</Typography>
            <Typography variant="h6">100</Typography>
          </CardContent>
        </Card>
      </div>
      <div>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          onChange={(e) => {
            console.log(e.target.value);
          }}
          sx={{
            borderRadius: "10px",
          }}
        />
      </div>
      <Paper>
        <DataGrid
          disableColumnMenu
          disableRowSelectionOnClick
          rows={[]}
          columns={columns}
          getRowHeight={() => "auto"}
          getRowId={(row) => row.id}
          sx={{
            ".MuiDataGrid-cell": { py: 1 },
            ".MuiDataGrid-cell.MuiDataGrid-cell--editing:focus-within": {
              outline: "none",
            },
            ".MuiDataGrid-cell.MuiDataGrid-cell--editing": {
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              py: "6px",
            },
          }}
        />
      </Paper>
    </div>
  );
}
