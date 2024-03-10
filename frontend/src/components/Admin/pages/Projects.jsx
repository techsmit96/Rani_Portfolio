import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import ProjectList from "./Projects/ProjectList";

const Projects = () => {
  return (
    <>
      <Navbar />
      <Box height={50} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <ProjectList />
        </Box>
      </Box>
    </>
  );
};

export default Projects;
