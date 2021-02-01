const express = require("express");
const { signup, signin, signout, socialLogin, forgotPassword, resetPassword } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { userSignupValidator, userSigninValidator, passwordResetValidator } = require("../validator/index");

const router = express.Router();

router.post("/signup", userSignupValidator, signup);
router.post("/sociallogin", socialLogin);
router.post("/signin", userSigninValidator, signin);
router.post("/signout", signout);

//any route containing user id ->our app will first exec user by id
router.param("userId", userById);

module.exports = router;
