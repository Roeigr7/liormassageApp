import React, { useContext, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { Context as AuthContext } from "../context/auth-context";
import * as RootNavigator from "../navigators/RootNavigator";

const LogoutModal = () => {
	const { logout } = useContext(AuthContext);

	useEffect(() => {
		RootNavigator.navigate("Main");
		logout();
	}, []);
	return <Text style={styles.text}>להתראות, בעוד מספר שניות תועבר למסך הראשי... </Text>;
};

const styles = StyleSheet.create({
	text: {
		textAlign: "center",
		padding: 20,
		color: "white",
		fontSize: 18,
		fontFamily: "heeboBold",
	},
});

export default LogoutModal;
