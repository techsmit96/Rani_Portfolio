import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React, { useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { addEducation, getEducationList } from "../../../../data/Api";
import Swal from "sweetalert2";
import { useAppStore } from "../../appStore";

const AddEducation = ({ closeEvent }) => {
  const [school, setSchool] = useState("");
  const [date, setDate] = useState("");
  const [grade, setGrade] = useState("");
  const [desc, setDesc] = useState("");
  const [degree, setDegree] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [docURL, setDocURL] = useState("");

  const setRows = useAppStore((state) => state.setRows);

  const handleSchoolChange = (e) => {
    setSchool(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };
  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };
  const handleDegreeChange = (e) => {
    setDegree(e.target.value);
  };
  const handleImageURLChange = (e) => {
    setImageURL(e.target.value);
  };
  const handleDocURLChange = (e) => {
    setDocURL(e.target.value);
  };

  const fetchEducationData = async () => {
    try {
      const data = await getEducationList();
      setRows(data.data);
    } catch (error) {
      console.error("Error fetching education datasssss:", error);
    }
  };

  const createEducation = async () => {
    await addEducation({
      img: imageURL,
      school: school,
      date: date,
      grade: grade,
      desc: desc,
      degree: degree,
      doc: docURL,
    });
    fetchEducationData();
    closeEvent();
    Swal.fire("Submitted!", "New Education Added", "success");
  };
  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Add Education
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Image Url"
            variant="outlined"
            size="small"
            onChange={handleImageURLChange}
            value={imageURL}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="School"
            variant="outlined"
            size="small"
            onChange={handleSchoolChange}
            value={school}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={4}>
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
        <Grid item xs={3}>
          <TextField
            id="outlined-basic"
            label="Grade"
            variant="outlined"
            size="small"
            onChange={handleGradeChange}
            value={grade}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            id="outlined-basic"
            label="Degree"
            variant="outlined"
            size="small"
            onChange={handleDegreeChange}
            value={degree}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Desc"
            variant="outlined"
            size="small"
            onChange={handleDescChange}
            value={desc}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Doc Url"
            variant="outlined"
            size="small"
            onChange={handleDocURLChange}
            value={docURL}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained" onClick={createEducation}>
              Submit{" "}
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
};

export default AddEducation;
