const express = require("express");
const { userById } = require("../controllers/user");
const { getAllUsers, getUser, updateUser, deleteUser } = require("../controllers/user");

const { requireSignin } = require("../controllers/auth");
const router = express.Router();

router.get("/users", getAllUsers);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, updateUser);
router.delete("/user/:userId", requireSignin, deleteUser);

//any route containing user id ->our app will first exec user by id
router.param("userId", userById);

module.exports = router;
