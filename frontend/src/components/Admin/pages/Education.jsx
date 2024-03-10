import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import EducationList from "./Education/EducationList";

const Education = () => {
  return (
    <>
      <Navbar />
      <Box height={50} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <EducationList />
        </Box>
      </Box>
    </>
  );
};

export default Education;
