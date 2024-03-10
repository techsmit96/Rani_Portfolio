import React, { useState, useEffect } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { editProject, getProjectList } from "../../../../data/Api";
import Swal from "sweetalert2";
import { useAppStore } from "../../appStore";

const EditProject = ({ closeEvent, data }) => {
  const [projectId, setProjectId] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [tags, setTags] = useState([]);
  const [member, setMember] = useState([]);
  const [category, setCategory] = useState("");
  const [githubURL, setGithubURL] = useState("");
  const [webappURL, setWebAppURL] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [status, setStatus] = useState("1");

  const setRows = useAppStore((state) => state.setRows);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleImageURLChange = (e) => {
    setImageURL(e.target.value);
  };
  const handleTagsChange = (e) => {
    //it must be array
    const tagsArray = e.target.value.split(",").map((tag) => tag.trim());
    setTags(tagsArray);
  };
  const handleMemberChange = (e) => {
    //it must be array
    setMember(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleGithubURLChange = (e) => {
    setGithubURL(e.target.value);
  };
  const handleWebAppURLChange = (e) => {
    setWebAppURL(e.target.value);
  };
  const handleVideoURLChange = (e) => {
    setVideoURL(e.target.value);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const fetchData = async () => {
    try {
      const data = await getProjectList();
      setRows(data.data);
    } catch (error) {
      console.error("Error fetching project datasssss:", error);
    }
  };

  const updateProject = async () => {
    await editProject({
      id: projectId,
      title: title,
      date: data,
      description: description,
      image: imageURL,
      tags: tags,
      member: member,
      category: category,
      github: githubURL,
      webapp: webappURL,
      video_url: videoURL,
      is_active: status,
    });
    fetchData();
    closeEvent();
    Swal.fire("Submitted!", "Project Details Updated.", "success");
  };

  useEffect(() => {
    setProjectId(data?._id);
    setTitle(data?.title);
    setDate(data?.date);
    setDescription(data?.description);
    setImageURL(data?.image);
    setTags(data?.tags);
    setMember(data?.member);
    setCategory(data?.category);
    setGithubURL(data?.github);
    setWebAppURL(data?.webapp);
    setVideoURL(data?.video_url);
    setStatus(data?.is_active);
  }, []);

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Edit Projects
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
            onChange={handleTitleChange}
            value={title}
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
            value={description}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Tags"
            variant="outlined"
            size="small"
            onChange={handleTagsChange}
            value={tags}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="Category"
            variant="outlined"
            size="small"
            onChange={handleCategoryChange}
            value={category}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="outlined-basic"
            label="Github"
            variant="outlined"
            size="small"
            onChange={handleGithubURLChange}
            value={githubURL}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
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
            label="Web App URL"
            variant="outlined"
            size="small"
            onChange={handleWebAppURLChange}
            value={webappURL}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={status}
              onChange={handleStatusChange}
            >
              <FormLabel
                id="demo-controlled-radio-buttons-group"
                style={{ marginTop: "10px", marginRight: "12px" }}
              >
                Status:
              </FormLabel>
              <FormControlLabel value="1" control={<Radio />} label="Active" />
              <FormControlLabel
                value="0"
                control={<Radio />}
                label="Inactive"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Video URL"
            variant="outlined"
            size="small"
            onChange={handleVideoURLChange}
            value={videoURL}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained" onClick={updateProject}>
              Submit{" "}
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default EditProject;
