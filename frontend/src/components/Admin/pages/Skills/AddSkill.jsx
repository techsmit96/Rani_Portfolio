import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import {
  addSkill,
  getSkillCategories,
  getSkillList,
} from "../../../../data/Api";
import Swal from "sweetalert2";
import { useAppStore } from "../../appStore";

const AddSkill = ({ closeEvent }) => {
  const [title, setTitle] = useState("");
  const [skill, setSkill] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [categories, setCategories] = useState([]);
  const setRows = useAppStore((state) => state.setRows);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleSkillChange = (e) => {
    setSkill(e.target.value);
  };
  const handleImageURLChange = (e) => {
    setImageURL(e.target.value);
  };

  const fetchSkillCategories = async () => {
    try {
      const data = await getSkillCategories();
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching user datasssss:", error);
    }
  };
  const fetchSkillsData = async () => {
    try {
      const data = await getSkillList();
      setRows(data.data);
    } catch (error) {
      console.error("Error fetching user datasssss:", error);
    }
  };
  useEffect(() => {
    fetchSkillCategories();
  }, []);

  const createSkill = async () => {
    await addSkill({
      title: title,
      skill: skill,
      image: imageURL,
    });
    fetchSkillsData();
    closeEvent();
    Swal.fire("Submitted!", "New Skill Added", "success");
  };
  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Add Skill
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
            label="Title"
            select
            variant="outlined"
            size="small"
            onChange={handleTitleChange}
            value={title}
            sx={{ minWidth: "100%" }}
          >
            {" "}
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Skill"
            variant="outlined"
            size="small"
            onChange={handleSkillChange}
            value={skill}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Image"
            variant="outlined"
            size="small"
            onChange={handleImageURLChange}
            value={imageURL}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained" onClick={createSkill}>
              Submit{" "}
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
};

export default AddSkill;
