import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import SkillsList from "./Skills/SkillsList";

const Skills = () => {
  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <SkillsList />
        </Box>
      </Box>
    </>
  );
};

export default Skills;
