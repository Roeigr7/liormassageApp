const express = require("express");
const {
	getMeetings,
	createMeeting,
	userMeetings,
	meetById,
	isMeeting,
	deleteMeeting,
	updateMeeting,
	nextMeet,
} = require("../controllers/meeting");
const { createMeetingValidator } = require("../validator/index");
const { userById } = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");
const router = express.Router();

router.post("/meetings", getMeetings);
router.post("/meeting/new/:userId", requireSignin, createMeetingValidator, createMeeting);
router.get("/meeting/by/:userId", requireSignin, userMeetings);
router.get("/nextMeet/by/:userId", requireSignin, nextMeet);
router.delete("/meeting/:meetId", requireSignin, isMeeting, deleteMeeting);
router.put("/meeting/:meetId", requireSignin, isMeeting, updateMeeting);
//any route containing user id ->our app will first exec user by id
router.param("userId", userById);
//any route containing meet id ->our app will first exec meet by id
router.param("meetId", meetById);

module.exports = router;

//////////////////////////////////
