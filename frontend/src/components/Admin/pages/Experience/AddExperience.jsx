import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { addExperience, getExperienceList } from "../../../../data/Api";

import Swal from "sweetalert2";
import { useAppStore } from "../../appStore";

const AddExperience = ({ closeEvent }) => {
  const [imageURL, setImageURL] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [skills, setSkills] = useState([]);
  const [docURL, setDocURL] = useState("");

  const setRows = useAppStore((state) => state.setRows);

  const handleImageURLChange = (e) => {
    setImageURL(e.target.value);
  };
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };
  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDesc(e.target.value);
  };

  const handleSkillChange = (e) => {
    //it must be array
    const skillArray = e.target.value.split(",").map((item) => item.trim());
    setSkills(skillArray);
  };
  const handleDocURLChange = (e) => {
    setDocURL(e.target.value);
  };

  const fetchData = async () => {
    try {
      const data = await getExperienceList();
      setRows(data.data);
    } catch (error) {
      console.error("Error fetching education datasssss:", error);
    }
  };

  const createExperience = async () => {
    await addExperience({
      img: imageURL,
      role: role,
      company: company,
      date: date,
      desc: desc,
      skills: skills,
      doc: docURL,
    });
    fetchData();
    closeEvent();
    Swal.fire("Submitted!", "New Experience Added", "success");
  };
  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Add Experiennce
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Image URL"
            variant="outlined"
            size="small"
            onChange={handleImageURLChange}
            value={imageURL}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Role"
            variant="outlined"
            size="small"
            onChange={handleRoleChange}
            value={role}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Company"
            variant="outlined"
            size="small"
            onChange={handleCompanyChange}
            value={company}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Date"
            variant="outlined"
            size="small"
            onChange={handleDateChange}
            value={date}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            size="small"
            onChange={handleDescriptionChange}
            value={desc}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Skills"
            variant="outlined"
            size="small"
            onChange={handleSkillChange}
            value={skills}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Doc URL"
            variant="outlined"
            size="small"
            onChange={handleDocURLChange}
            value={docURL}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained" onClick={createExperience}>
              Submit{" "}
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
};

export default AddExperience;
