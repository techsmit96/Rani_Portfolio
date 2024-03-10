const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const {
  addExperience,
  deleteExperience,
  editExperience,
  getExperienceList,
  getExperience,
} = require("../controllers/experience.controller");

router.post("/add", isAuthenticated, addExperience);
router.put("/edit", isAuthenticated, editExperience);
router.get("/list", isAuthenticated, getExperienceList);
router.get("/:id", isAuthenticated, getExperience);
router.delete("/:id", isAuthenticated, deleteExperience);

module.exports = router;
