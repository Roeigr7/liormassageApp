import React from "react";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";

const BrandIcon = ({ icon, brand, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<Image style={styles.icon} source={icon} />
			<Text style={styles.text}>{brand}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	icon: {
		flexDirection: "row",

		width: 100,
		height: 100,
		borderColor: "white",
		borderWidth: 1,
		borderRadius: 50,
	},
	text: { color: "white", textAlign: "center" },
});

export default BrandIcon;
