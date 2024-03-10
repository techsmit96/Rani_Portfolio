const express = require("express");
const router = express.Router();
const {
  addSkill,
  deleteSkill,
  getSkillList,
  getSkill,
  editSkill,
  getAllCategories,
} = require("../controllers/skill.controller");
const { isAuthenticated } = require("../middlewares/auth");

router.post("/add", isAuthenticated, addSkill);
router.put("/edit", isAuthenticated, editSkill);
router.get("/list", isAuthenticated, getSkillList);
router.get("/get-categories", isAuthenticated, getAllCategories);
router.get("/:id", isAuthenticated, getSkill);
router.delete("/:id", isAuthenticated, deleteSkill);

module.exports = router;
