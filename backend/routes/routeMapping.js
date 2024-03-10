const express = require("express");
const router = express.Router();

const userRouter = require("./User");
const skillRouter = require("./skill.routes");
const timelineRouter = require("./timelie.routes");
const projectRouter = require("./project.routes");
const experienceRouter = require("./experience.routes");
const educationRouter = require("./education.routes");

router.use("/users", userRouter);
router.use("/skills", skillRouter);
router.use("/timeline", timelineRouter);
router.use("/project", projectRouter);
router.use("/experience", experienceRouter);
router.use("/education", educationRouter);

module.exports = router;
