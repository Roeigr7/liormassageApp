exports.createMeetingValidator = (req, res, next) => {
	req.check("massageType", "choose massage type").notEmpty();
	req.check("startDate", "choose a start date").notEmpty();
	req.check("endDate", "choose a end date").notEmpty();

	//check for errors
	const errors = req.validationErrors();
	//if error -> show the first that appear
	if (errors) {
		const firstError = errors.map(error => error.msg)[0];
		return res.status(400).json({
			error: firstError,
		});
	}
	next();
};

exports.userSignupValidator = (req, res, next) => {
	req.check("name", "נא לבחור שם").notEmpty();
	req.check("email", "נא לבחור אימייל בין 3 ל32 תווים").isEmail().withMessage("נא להכניס כתובת מייל תקינה").isLength({
		min: 3,
		max: 50,
	});
	req.check("password", "נא לבחור סיסמא").notEmpty();
	req.check("password").isLength({ min: 6 }).withMessage("סיסמא חייבת להכיל לפחות 6 תווים");

	//check for errors
	const errors = req.validationErrors();
	//if error -> show the first that appear
	if (errors) {
		const firstError = errors.map(error => error.msg)[0];
		return res.status(400).json({
			error: firstError,
		});
	}
	next();
};

exports.userSigninValidator = (req, res, next) => {
	req
		.check("email", "נא לבחור אימייל בין 3 ל32 תווים")
		.matches(/.+\@.+..+/)
		.withMessage("נא להכניס כתובת מייל תקינה")
		.isLength({
			min: 3,
			max: 50,
		});
	req.check("password", "נא להכניס סיסמא").notEmpty();

	//check for errors
	const errors = req.validationErrors();
	//if error -> show the first that appear
	if (errors) {
		const firstError = errors.map(error => error.msg)[0];
		return res.status(400).json({
			error: firstError,
		});
	}
	next();
};

exports.passwordResetValidator = (req, res, next) => {
	req.check("newPassword", "נא לבחור סיסמא").notEmpty();
	req.check("newPassword").isLength({ min: 6 }).withMessage("סיסמא חייבת להכיל לפחות 6 תווים");
	// check for errors
	const errors = req.validationErrors();
	// if error show the first one as they happen
	if (errors) {
		const firstError = errors.map(error => error.msg)[0];
		return res.status(400).json({ error: firstError });
	}
	// proceed to next middleware or ...
	next();
};
