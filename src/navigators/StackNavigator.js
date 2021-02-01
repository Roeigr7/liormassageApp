import React from "react";
import Main from "../screens/MainScreen";
import AnimateHamburger from "./AnimateHamburger";
import MeetingPicker from "../screens/MeetingPickerScreen";
import Profile from "../screens/ProfileScreen";
import UserHistory from "../screens/UserHistory";
import AboutScreen from "../screens/AboutScreen";
import LocationScreen from "../screens/LocationScreen";
import LogoutModal from "../modals/LogoutModal";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";

const Stack = createStackNavigator();

const StackNavigator = () => (
	<Stack.Navigator
		headerMode="screen"
		navigationOptions
		screenOptions={({ navigation }) => ({
			cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			gestureEnabled: true,
			gestureDirection: "horizontal",
			headerTitleAlign: "center",

			headerHideShadow: true,
			headerTintColor: "red",
			headerStyle: {
				borderBottomWidth: 0.5,
				borderColor: "white",
				backgroundColor: "#1d2731",
			},

			headerTitleStyle: {
				color: "white",
			},
			headerLeft: () => <AnimateHamburger navigation={navigation} />,
		})}
	>
		<Stack.Screen name="Main" component={Main} headerMode="screen" options={{ title: "ליאור" }} />
		<Stack.Screen name="Profile" component={Profile} options={{ title: "פרופיל" }} />
		<Stack.Screen name="MeetingPicker" component={MeetingPicker} options={{ title: "קבע תור" }} />
		<Stack.Screen name="UserHistory" component={UserHistory} options={{ title: "הסטוריית תורים" }} />
		<Stack.Screen name="About" component={AboutScreen} options={{ title: "אודות" }} />
		<Stack.Screen name="Location" component={LocationScreen} options={{ title: "איך מגיעים" }} />
		<Stack.Screen name="Logout" component={LogoutModal} options={{ title: "התנתק" }} />
	</Stack.Navigator>
);

export default StackNavigator;
