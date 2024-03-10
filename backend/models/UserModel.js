const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Enter Email."],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    select: false,
  },
  about: {
    name: String,
    roles: [{ type: String }],
    title: String,
    subtitle: String,
    description: String,
    quote: String,
    experience_in_year: Number,
    github: String,
    resume: String,
    linkedin: String,
    twitter: String,
    instagram: String,
    facebook: String,
    avatar: String,
  },
  skills: [
    {
      title: String,
      skills: [
        {
          name: String,
          image: String,
        },
      ],
    },
  ],
  experience: [
    {
      id: Number,
      img: String,
      role: String,
      company: String,
      date: String,
      desc: String,
      skills: [{ type: String }],
      doc: String,
    },
  ],
  education: [
    {
      id: Number,
      img: String,
      school: String,
      date: String,
      grade: String,
      desc: String,
      degree: String,
      doc: String,
    },
  ],
  projects: [
    {
      id: Number,
      title: String,
      date: String,
      description: String,
      image: String,
      tags: [{ type: String }],
      category: String,
      github: String,
      webapp: String,
      member: [
        {
          name: String,
          img: String,
          linkedin: String,
          github: String,
        },
      ],
      video_url: String,
      is_active: Number,
    },
  ],
  timelines: [
    {
      year: Number,
      description: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
