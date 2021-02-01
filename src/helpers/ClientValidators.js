export const nameValidator = name => {
	const nameRegex = /^[a-zA-Z\u0590-\u05FF]+( [a-zA-Z\u0590-\u05FF]+)+$/;
	const validateSuccess = nameRegex.test(name);
	return validateSuccess;
};

export const phoneValidator = phone => {
	const phoneRegex = /^0(\d{9}|\d{2}-\d{7}|\d{3}-\d{6})$/;
	const validateSuccess = phoneRegex.test(phone);
	return validateSuccess;
};
