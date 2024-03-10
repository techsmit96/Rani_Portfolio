const express = require("express");
const {
  login,
  logout,
  getUser,
  myProfile,
  contact,
  updateUser,
  addYoutube,
  deleteYoutube,

} = require("../controllers/User");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.post("/login", login);

router.get("/logout", logout);

router.get("/user", getUser);

router.get("/me", isAuthenticated, myProfile);

router.put("/admin/update", isAuthenticated, updateUser);

//youtube
router.post("/admin/youtube/add", isAuthenticated, addYoutube);
router.delete("/admin/youtube/:id", isAuthenticated, deleteYoutube);

router.post("/contact", contact);

module.exports = router;
