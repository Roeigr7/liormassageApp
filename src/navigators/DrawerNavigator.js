import React from "react";

import { StatusBar, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "./CustomDrawer";
import StackNavigator from "./StackNavigator";
import { SafeAreaView } from "react-native-safe-area-context";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
	return (
		<>
			<StatusBar backgroundColor="#182028" />
			<SafeAreaView style={{ flex: 1 }}>
				<Drawer.Navigator
					overlayColor="transparent"
					drawerStyle={styles.drawerStyle}
					drawerContent={props => <CustomDrawer {...props} />}
				>
					<Drawer.Screen name="MainScreen" component={StackNavigator} />
				</Drawer.Navigator>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	drawerStyle: {
		height: "100%",
		marginTop: 55,
		width: "100%",
		backgroundColor: "rgba(29, 39, 49,1)",
		borderBottomRightRadius: 0,
	},
});
