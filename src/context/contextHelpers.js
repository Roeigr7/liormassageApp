import AsyncStorage from "@react-native-community/async-storage";
//////SAVE IN ASYNC STORAGE//////
export const storeAsyncStorage = async response => {
	//saving to asyncStorage
	let userObject = {
		token: response.data.token,
		user: {
			name: response.data.user.name,
			email: response.data.user.email,
			phone: response.data.user.phone,
			id: response.data.user._id,
			role: response.data.user.role,
		},
	};
	await AsyncStorage.setItem("user", JSON.stringify(userObject));

	return userObject;
};

export const updateAsyncStorage = async (res, token) => {
	//saving to asyncStorage
	let userObject = {
		token: token,
		user: {
			name: res.data.user.name,
			email: res.data.user.email,
			phone: res.data.user.phone,
			id: res.data.user._id,
			role: res.data.user.role,
		},
	};
	await AsyncStorage.setItem("user", JSON.stringify(userObject));

	return userObject;
};
