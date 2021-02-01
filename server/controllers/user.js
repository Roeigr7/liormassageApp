const User = require("../models/user");
const _ = require("lodash");

// load env
const dotenv = require("dotenv");
dotenv.config();
exports.userById = (req, res, next, id) => {
	User.findById(id).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "user not found",
			});
		}
		req.profile = user; //adds profile object in req with user info

		next();
	});
};

exports.hasAuthorization = (req, res, next) => {
	req.profile && req.auth && req.profile._id === req.auth._id;
	if (!authorized) {
		return res.status(403).json({ error: "user is not authorized to perform this action" });
	}
};

exports.getAllUsers = (req, res) => {
	User.find((err, users) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json({ users });
	}).select("name email role updated created");
};

exports.getUser = (req, res) => {
	return res.json(req.profile);
};

exports.updateUser = (req, res, next) => {
	let user = req.profile;

	user = _.extend(user, req.body);
	user.updated = Date.now();
	user.save(err => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}

		res.json({ user });
	});
};

exports.deleteUser = (req, res, next) => {
	let user = req.profile;
	user.remove((err, user) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json({ message: "משתמש נמחק בהצלחה" });
	});
};
