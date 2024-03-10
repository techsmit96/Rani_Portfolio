const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const {
  addTimeline,
  deleteTimeline,
  getTimelineList,
  getTimeline,
  editTimeline,
} = require("../controllers/timeline.controller");

router.post("/add", isAuthenticated, addTimeline);
router.put("/edit", isAuthenticated, editTimeline);
router.get("/list", isAuthenticated, getTimelineList);
router.get("/:id", isAuthenticated, getTimeline);
router.delete("/:id", isAuthenticated, deleteTimeline);

module.exports = router;
