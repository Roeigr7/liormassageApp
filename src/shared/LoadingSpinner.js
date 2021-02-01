import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";

const LoadingSpinner = ({ style, color }) => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size={"large"} color={color || "white"} />
			<Text style={[styles.text, style]}>כמה רגעים</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",

		alignItems: "center",
	},
	text: {
		marginTop: 5,
		fontFamily: "heebo",
		fontSize: 14,
		color: "white",
	},
});

export default LoadingSpinner;
