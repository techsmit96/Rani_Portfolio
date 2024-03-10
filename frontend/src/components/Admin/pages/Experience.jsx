import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import ExperienceList from "./Experience/ExperienceList";

const Experience = () => {
  return (
    <>
      <Navbar />
      <Box height={50} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <ExperienceList />
        </Box>
      </Box>
    </>
  );
};

export default Experience;
