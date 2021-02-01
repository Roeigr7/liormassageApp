import React, { useContext } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Context as AuthContext } from "../context/auth-context";
import { Context as ModalContext } from "../context/modal-context";
import StyledButton from "../customStyles/StyledButton";

const CustomDrawer = ({ progress, ...props }) => {
	const navigate = props.navigation.navigate;
	const { state } = useContext(AuthContext);
	const modalCxt = useContext(ModalContext);
	const token = state.token;
	const admin = state.token && state.role === "admin";
	return (
		<>
			<View style={styles.logocontainer}>
				<Image alt="logo" resizeMode={"contain"} source={require("../../assets/icons/logo.png")} style={styles.logo} />
				{token && (
					<>
						<Text style={styles.tokenname}>{state.name} היי</Text>
						<View style={styles.mainbuttonscontainer}>
							<StyledButton
								onPress={() => navigate("Profile")}
								text="פרופיל"
								buttonStyle={styles.mainbtn}
								textStyle={styles.mainbtntext}
							/>
							<StyledButton
								onPress={() => modalCxt.showModal({ id: "LogoutModal" })}
								text="התנתק"
								buttonStyle={styles.mainbtn}
								textStyle={styles.mainbtntext}
							/>
						</View>
					</>
				)}
			</View>
			<View
				style={{
					flex: 1,
				}}
			>
				<DrawerContentScrollView {...props}>
					<DrawerItem
						icon={({ color, size }) => (
							<View style={{ minWidth: 40, alignItems: "center" }}>
								<Icon name="home" color={"white"} size={size} color="#d9b310" />
							</View>
						)}
						label="ראשי"
						onPress={() => navigate("Main")}
						style={styles.draweritem}
						labelStyle={styles.labelitem}
					/>

					{token && (
						<DrawerItem
							icon={({ color, size }) => (
								<View style={{ minWidth: 40, alignItems: "center" }}>
									<Icon name="calendar" color={"white"} size={size} color="#d9b310" />
								</View>
							)}
							label={admin ? "קבע תור ללקוח" : "קבע תור"}
							onPress={() => navigate("MeetingPicker")}
							style={[styles.draweritem, { backgroundColor: "rgba(255,255,255,0.01)" }]}
							labelStyle={styles.labelitem}
						/>
					)}
					{!token && (
						<DrawerItem
							icon={({ color, size }) => (
								<View style={{ minWidth: 40, alignItems: "center" }}>
									<Icon name="user" color={"white"} size={size} color="#d9b310" />
								</View>
							)}
							label={"התחבר"}
							onPress={() => modalCxt.showModal({ id: "SignModal", modalProps: { loginPage: true } })}
							style={[styles.draweritem, { backgroundColor: "rgba(255,255,255,0.01)" }]}
							labelStyle={styles.labelitem}
						/>
					)}
					{!token && (
						<DrawerItem
							icon={({ color, size }) => (
								<View style={{ minWidth: 40, alignItems: "center" }}>
									<Icon name="user-plus" color={"white"} size={size} color="#d9b310" />
								</View>
							)}
							label={"הירשם"}
							onPress={() => modalCxt.showModal({ id: "SignModal" })}
							style={styles.draweritem}
							labelStyle={[styles.labelitem]}
						/>
					)}
					{token && (
						<DrawerItem
							icon={({ color, size }) => (
								<View style={{ minWidth: 40, alignItems: "center" }}>
									<Icon name="book" color={"white"} size={size} color="#d9b310" />
								</View>
							)}
							label={admin ? "יומן מנהל" : "התורים שלי"}
							onPress={() => navigate("UserHistory")}
							style={styles.draweritem}
							labelStyle={styles.labelitem}
						/>
					)}
					<DrawerItem
						icon={({ color, size }) => (
							<View style={{ minWidth: 40, alignItems: "center" }}>
								<Icon name="address-card" color={"white"} size={size} color="#d9b310" />
							</View>
						)}
						label="אודות"
						onPress={() => navigate("About")}
						style={[styles.draweritem, { backgroundColor: "rgba(255,255,255,0.01)" }]}
						labelStyle={styles.labelitem}
					/>
					<DrawerItem
						icon={({ color, size }) => (
							<View style={{ minWidth: 40, alignItems: "center" }}>
								<Icon name="map-marker" color={"white"} size={size} color="#d9b310" />
							</View>
						)}
						label="איך מגיעים"
						onPress={() => navigate("Location")}
						style={styles.draweritem}
						labelStyle={styles.labelitem}
					/>
					{token && (
						<DrawerItem
							icon={({ color, size }) => (
								<View style={{ minWidth: 40, alignItems: "center" }}>
									<Icon name="user" color={"white"} size={size} color="#d9b310" />
								</View>
							)}
							label="פרופיל"
							onPress={() => navigate("Profile")}
							style={[styles.draweritem, { backgroundColor: "rgba(255,255,255,0.01)" }]}
							labelStyle={styles.labelitem}
						/>
					)}
					{token && (
						<DrawerItem
							icon={({ color, size }) => (
								<View style={{ minWidth: 40, alignItems: "center" }}>
									<Icon name="sign-out" color={"white"} size={size} color="#d9b310" />
								</View>
							)}
							label="התנתק"
							onPress={() => modalCxt.showModal({ id: "LogoutModal" })}
							style={[styles.draweritem]}
							labelStyle={styles.labelitem}
						/>
					)}
				</DrawerContentScrollView>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	draweritem: {
		backgroundColor: "transparent",
		width: Dimensions.get("window").width,
		marginBottom: 0,
		marginTop: 0,
		borderRadius: 0,
		marginLeft: 0,
	},
	logocontainer: {
		borderBottomWidth: 1,
		borderBottomColor: "rgba(255,255,255,0.01)",
		height: 150,
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: "rgba(255,255,255,0.01)",
	},
	labelitem: {
		marginLeft: -5,
		color: "white",
		fontSize: 20,
		fontFamily: "comix",
	},
	logo: {
		resizeMode: "contain",
		height: 60,
		width: "100%",
	},
	mainbuttonscontainer: {
		flexDirection: "row",
	},
	mainbtn: {
		minWidth: 10,
		backgroundColor: "transparent",

		marginHorizontal: 10,
		paddingVertical: 5,
	},
	mainbtntext: {
		color: "white",
		fontSize: 14,
	},
	tokenname: {
		color: "white",
		fontSize: 16,
	},
});

export default CustomDrawer;
