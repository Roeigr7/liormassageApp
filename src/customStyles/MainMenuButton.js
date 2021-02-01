import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const MainMenuButton = ({ color, navigateTo, icon, text, onPress }) => {
	const navigation = useNavigation();
	const onPressHandler = () => {
		navigateTo ? navigation.push(`${navigateTo}`) : onPress();
	};

	return (
		<TouchableOpacity
			activeOpacity={0.4}
			delayPressIn={0}
			onPress={onPressHandler}
			style={[styles.container, styles.button, { backgroundColor: color }]}
		>
			<Icon name={icon} color="white" size={32} />
			<Text style={styles.btntext}>{text}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "black",
		margin: 5,
		marginHorizontal: 15,
		borderRadius: 16,
		height: Dimensions.get("window").width * 0.16,
		width: Dimensions.get("window").width * 0.8,
	},

	button: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	btntext: {
		fontFamily: "comix",
		textAlign: "center",
		paddingHorizontal: 10,
		fontSize: 24,
		color: "white",
	},
});

export default MainMenuButton;
