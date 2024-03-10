import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Box height={50} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Dashboard</h1>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
