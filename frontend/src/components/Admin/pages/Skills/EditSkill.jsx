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
  editSkill,
  getSkillCategories,
  getSkillList,
} from "../../../../data/Api";
import Swal from "sweetalert2";
import { useAppStore } from "../../appStore";

const EditSkill = ({ closeEvent, data }) => {
  const [title, setTitle] = useState("");
  const [skill, setSkill] = useState("");
  const [skillId, setSkillId] = useState("");
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

  const updateSkill = async () => {
    await editSkill({
      id: skillId,
      skill: skill,
      image: imageURL,
    });
    fetchSkillsData();
    closeEvent();
    Swal.fire("Submitted!", "Skill Updated.", "success");
  };

  useEffect(() => {
    // fetchSkillCategories();
    console.log("sdfksdnflksndlf", data.skills);
    setTitle(data?.title);
    setSkillId(data?.skills._id);
    setSkill(data?.skills.name);
    setImageURL(data?.skills.image);
  }, []);
  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Edit Skill
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
            variant="outlined"
            size="small"
            value={title}
            sx={{ minWidth: "100%" }}
            disabled
          ></TextField>
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
            <Button variant="contained" onClick={updateSkill}>
              Submit{" "}
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
};

export default EditSkill;
