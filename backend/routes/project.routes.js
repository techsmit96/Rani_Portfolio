const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const {
  addProject,
  deleteProject,
  getProjectList,
  getProject,
  editProject,
  editProjectStatus,
} = require("../controllers/project.controller");

router.post("/add", isAuthenticated, addProject);
router.put("/edit", isAuthenticated, editProject);
router.patch("/edit-status", isAuthenticated, editProjectStatus);
router.get("/list", isAuthenticated, getProjectList);
router.get("/:id", isAuthenticated, getProject);
router.delete("/:id", isAuthenticated, deleteProject);

module.exports = router;
