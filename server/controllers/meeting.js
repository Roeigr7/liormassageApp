const Meeting = require("../models/meeting");
const _ = require("lodash");
const moment = require("moment");

//GET MEETINGS BY MEET ID//
exports.meetById = (req, res, next, id) => {
	Meeting.findById(id)
		.populate("determinedBy", "_id name phone role")
		.exec((err, meet) => {
			if (err || !meet) {
				return res.status(400).json({ err });
			}
			req.meet = meet;
			next();
		});
};

//USER CREATE NEW MEETING//
exports.createMeeting = (req, res) => {
	const meeting = new Meeting(req.body);
	meeting.determinedBy = req.profile;
	meeting.save(err => {
		if (err) {
			return res.status(400).json({ error: "קביעת התור נכשלה אנא נסה שנית" });
		}

		res.json({ message: "התור נקבע בהצלחה" });
	});
};

//GET MEETINGS BY USER ID//
exports.userMeetings = (req, res) => {
	Meeting.find({ determinedBy: req.profile._id })
		.populate("determinedBy", "_id name phone role")
		.sort("created")
		.exec((err, meetings) => {
			if (err) {
				return res.status(400).json({
					error: "קרתה תקלה אנא נסה שנית",
				});
			}
			res.json(meetings);
		});
};
//GET NEXT MEET BY USER ID//
exports.nextMeet = (req, res) => {
	Meeting.findOne({ determinedBy: req.profile._id })
		.populate("determinedBy", "_id name phone role")
		.sort("-startDate")
		.exec((err, meet) => {
			if (err) {
				return res.status(400).json({
					error: "קרתה תקלה אנא נסה שנית",
				});
			}
			res.json(meet);
		});
};

//CHECK IF USER IS THE CREATE THE MEET//
exports.isMeeting = (req, res, next) => {
	let sameUser = req.meet && req.auth && req.meet.determinedBy._id == req.auth._id;
	let admin = req.meet && req.auth && req.auth.role === "admin";

	let isMeeting = sameUser || admin;
	if (!isMeeting) {
		return res.status(407).json({
			message: "אינך מורשה",
		});
	}
	next();
};

//DELETE USER MEETING//
exports.deleteMeeting = (req, res) => {
	let meet = req.meet;
	meet.remove((err, meet) => {
		if (err) {
			return res.status(400).json({ error: "קרתה תקלה בניסיון ביטול התור אנא נסה שוב בהקדם" });
		}
		res.json({
			message: "התור בוטל בהצלחה",
		});
	});
	next();
};

//UPDATE USER MEETING//
exports.updateMeeting = (req, res, next) => {
	let meet = req.meet;
	meet = _.extend(meet, req.body); //extend - mutate the source object
	meet.updated = Date.now();
	meet.save(err => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json({ meet });
	});
};

exports.pr = model => {
	return async (req, res, next) => {
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const results = {};

		if (endIndex < (await model.countDocuments().exec())) {
			results.next = {
				page: page + 1,
				limit: limit,
			};
		}
		if (startIndex > 0) {
			results.previous = {
				page: page - 1,
				limit: limit,
			};
		}
		try {
			results.results = await model.find().limit(limit).skip(startIndex).exec();
			res.paginationResults = results;
			next();
		} catch (e) {
			res.status(500).json({ message: e.message });
		}
	};
};

exports.getMeetings = (req, res) => {
	const startMonth = moment(req.body.params.date).startOf("month");
	const endMonth = moment(req.body.params.date).endOf("month");

	Meeting.find({
		startDate: { $gte: startMonth, $lt: endMonth },
	})
		.populate("determinedBy", "_id name phone role")
		.sort("startDate")
		.exec((err, meetings) => {
			if (err) {
				return res.status(400).json({
					error: err,
				});
			}

			res.json(meetings);
		});
};
