const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const {
  addEducation,
  deleteEducation,
  editEducation,
  getEducationList,
  getEducation,
} = require("../controllers/education.controller");

router.post("/add", isAuthenticated, addEducation);
router.put("/edit", isAuthenticated, editEducation);
router.get("/list", isAuthenticated, getEducationList);
router.get("/:id", isAuthenticated, getEducation);
router.delete("/:id", isAuthenticated, deleteEducation);

module.exports = router;
