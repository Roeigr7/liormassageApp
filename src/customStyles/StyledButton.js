import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const StyledButton = ({ text, onPress, buttonStyle, textStyle }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
				<Text style={[styles.txt, textStyle]}>{text}</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		minWidth: 100,
		backgroundColor: "#1E96A6",
		padding: 10,
		borderColor: "#F6F5F3",
		borderRadius: 5,
	},
	txt: {
		textAlign: "center",
		fontSize: 16,
		color: "#ffffff",
	},
});

export default StyledButton;
