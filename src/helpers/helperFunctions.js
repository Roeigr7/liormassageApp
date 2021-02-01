///////COMPARE PASSWORDS////////
export const comparePasswords = (password, confirmPass, loginPage = false) => {
	if (loginPage) {
		return true;
	} else {
		if (password !== confirmPass) {
			return false;
		} else return true;
	}
};
