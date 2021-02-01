import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import { useIsDrawerOpen } from "@react-navigation/drawer";

const AnimateHamburger = ({ navigation }) => {
	const isDrawerOpen = useIsDrawerOpen();

	const toggleMenu = () => {
		navigation.openDrawer();
	};

	return (
		<View style={styles.icon}>
			<Icon
				style={styles.icon}
				onPress={toggleMenu}
				name={isDrawerOpen ? "enter" : "bars"}
				type={isDrawerOpen ? "antdesign" : "font-awesome"}
				color="white"
				size={30}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	icon: {
		fontSize: 30,
		left: 15,
		color: "white",
	},
});

export default AnimateHamburger;
