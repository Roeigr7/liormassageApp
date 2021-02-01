const User = require("../models/user");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const expressJwt = require("express-jwt");
require("dotenv").config();

exports.signup = async (req, res) => {
	const userExists = await User.findOne({ email: req.body.email });
	if (userExists)
		return res.status(403).json({
			error: "כתובת אימייל תפוסה",
		});
	const user = await new User(req.body);
	await user.save();
	const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
	const { _id, name, email, phone, password, role } = user;
	return res.json({ token, user: { _id, email, name, phone, password, role } });
};

exports.signin = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		return res.status(401).send({ error: "מייל לא רשום במערכת" });
	}
	try {
		await user.comparePassword(password);
		const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
		res.cookie("t", token, { expire: new Date() + 9999 });
		const { _id, name, email, phone, role } = user;
		return res.json({ token, user: { _id, name, email, phone, role } });
	} catch (err) {
		return res.status(401).send({ error: "סיסמא או מייל לא נכונים" });
	}
};

exports.signout = (req, res) => {
	res.clearCookie("t");
	return res.json({
		message: "signOut success",
	});
};

exports.requireSignin = expressJwt({
	//if token valid->express jwt appends the verified users id in an auth key to the req object
	secret: process.env.JWT_SECRET,
	userProperty: "auth",
	algorithms: ["HS256"], // added later
});

exports.socialLogin = (req, res) => {
	let user = User.findOne({ email: req.body.email }, (err, user) => {
		if (err || !user) {
			// create a new user and login
			user = new User(req.body);
			req.profile = user;
			user.save();
			// generate a token with user id and secret
			const token = jwt.sign({ _id: user._id, iss: "NODEAPI" }, process.env.JWT_SECRET);
			res.cookie("t", token, { expire: new Date() + 9999 });
			// return response with user and token to frontend client
			const { _id, name, email, phone, role } = user;
			return res.json({ token, user: { _id, name, email, phone, role } });
		} else {
			// update existing user with new social info and login
			req.profile = user;
			user = _.extend(user, req.body);
			user.updated = Date.now();
			user.save();
			// generate a token with user id and secret
			const token = jwt.sign({ _id: user._id, iss: "NODEAPI" }, process.env.JWT_SECRET);
			res.cookie("t", token, { expire: new Date() + 9999 });
			// return response with user and token to frontend client
			const { _id, name, email, phone, role } = user;
			return res.json({ token, user: { _id, name, email, phone, role } });
		}
	});
};
