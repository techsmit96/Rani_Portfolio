import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  Input,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { useAppStore } from "../../appStore";
import { editProfileData, fetchProfileData } from "../../../../data/Api";

const UserProfile = () => {
  const [imageURL, setImageURL] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [quote, setQuote] = useState("");
  const [experience, setExperience] = useState("");
  const [about, setAbout] = useState("");
  const [roles, setRoles] = useState([]);
  const [resume, setResume] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");

  const setRows = useAppStore((state) => state.setRows);

  const handleImageURLChange = (e) => {
    setImageURL(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleQuoteChange = (e) => {
    setQuote(e.target.value);
  };
  const handleRolesChange = (e) => {
    const rolesArray = e.target.value.split(",").map((item) => item.trim());
    setRoles(rolesArray);
  };
  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  };
  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };
  const handleResumeChange = (e) => {
    setResume(e.target.value);
  };
  const handleGithubChange = (e) => {
    setGithub(e.target.value);
  };
  const handleLinkedinChange = (e) => {
    setLinkedin(e.target.value);
  };
  const handleFacebookChange = (e) => {
    setFacebook(e.target.value);
  };
  const handleInstagramChange = (e) => {
    setInstagram(e.target.value);
  };
  const handleTwitterChange = (e) => {
    setTwitter(e.target.value);
  };

  const updateProfile = async () => {
    await editProfileData({
      about: {
        avatar: imageURL,
        name: name,
        roles: roles,
        title: "",
        subtitle: "",
        description: about,
        quote: quote,
        experience_in_year: experience,
        github: github,
        resume: resume,
        linkedin: linkedin,
        twitter: twitter,
        instagram: instagram,
        facebook: facebook,
      },
    });
    fetchData();
    Swal.fire("Submitted!", "Profile Updated.", "success");
  };
  const fetchData = async () => {
    try {
      const data = await fetchProfileData();
      setEmail(data?.data.email);
      setImageURL(data?.data.about.avatar);
      setName(data?.data.about.name);
      setQuote(data?.data.about.quote);
      setExperience(data?.data.about.experience_in_year);
      setAbout(data?.data.about.description);
      setRoles(data?.data.about.roles);
      setResume(data?.data.about.resume);
      setGithub(data?.data.about.github);
      setLinkedin(data?.data.about.linkedin);
      setFacebook(data?.data.about.facebook);
      setInstagram(data?.data.about.instagram);
      setTwitter(data?.data.about.twitter);
    } catch (error) {
      console.error("Error fetching education datasssss:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Card>
        <CardContent>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={imageURL}
              alt={name}
              style={{ borderRadius: "50%", width: 300, height: 300 }}
            />
          </Box>
          <Box height={10} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Avatar"
                variant="outlined"
                size="small"
                onChange={handleImageURLChange}
                value={imageURL}
                sx={{ minWidth: "100%" }}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="outlined-basic"
                label="Roles"
                variant="outlined"
                size="small"
                onChange={handleRolesChange}
                value={roles}
                sx={{ minWidth: "100%" }}
              />
            
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-basic"
                label="Experience In year"
                variant="outlined"
                size="small"
                onChange={handleExperienceChange}
                value={experience}
                sx={{ minWidth: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                size="small"
                onChange={handleNameChange}
                value={name}
                sx={{ minWidth: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Quote"
                variant="outlined"
                size="small"
                onChange={handleQuoteChange}
                value={quote}
                sx={{ minWidth: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="More About"
                variant="outlined"
                size="small"
                multiline
                rows={3}
                onChange={handleAboutChange}
                value={about}
                sx={{ minWidth: "100%" }}
              />
            </Grid>
          </Grid>
          <Box height={20} />
          <Divider />
          <Box height={20} />
          <Typography variant="h6" align="left">
            Social Media
          </Typography>
          <Box height={10} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Resume"
                variant="outlined"
                size="small"
                onChange={handleResumeChange}
                value={resume}
                sx={{ minWidth: "100%" }}
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Github"
                variant="outlined"
                size="small"
                onChange={handleGithubChange}
                value={github}
                sx={{ minWidth: "100%" }}
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Linkedin"
                variant="outlined"
                size="small"
                onChange={handleLinkedinChange}
                value={linkedin}
                sx={{ minWidth: "100%" }}
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Facebook"
                variant="outlined"
                size="small"
                onChange={handleFacebookChange}
                value={facebook}
                sx={{ minWidth: "100%" }}
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Instagram"
                variant="outlined"
                size="small"
                onChange={handleInstagramChange}
                value={instagram}
                sx={{ minWidth: "100%" }}
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Twitter"
                variant="outlined"
                size="small"
                onChange={handleTwitterChange}
                value={twitter}
                sx={{ minWidth: "100%" }}
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <Typography variant="h5" align="right">
                <Button variant="contained" onClick={updateProfile}>
                  Submit{" "}
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default UserProfile;
