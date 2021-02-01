const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	email: {
		type: String,
		trim: true,
		required: true,
	},
	phone: {
		type: String,
		trim: true,
	},
	password: {
		type: String,
	},
	role: {
		type: String,
		default: "member",
	},
	resetPassword: {
		data: String,
		default: "",
	},

	created: {
		type: Date,
		default: Date.now,
	},
	salt: String,
	updated: Date,
});

//SCHEMA METHODS

userSchema.pre("save", function (next) {
	const user = this;
	if (!user.isModified("password")) {
		return next();
	}
	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});
userSchema.methods.comparePassword = function (candidatePassword) {
	const user = this;
	return new Promise((resolve, reject) => {
		bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
			if (err) {
				return reject(err);
			}
			if (!isMatch) {
				return reject(false);
			}

			resolve(true);
		});
	});
};
module.exports = mongoose.model("User", userSchema);
