import React, { useContext, useEffect } from "react";
import { Context as ModalContext } from "../context/modal-context";
import { Context as AuthContext } from "../context/auth-context";
import { Context as BookingContext } from "../context/booking-context";
import moment from "moment";
import { StyleSheet, Text, ScrollView, View, StatusBar } from "react-native";
import { clickPleaseText, guestMainText, memberMainText, notExistMeetingsText } from "../../utilities/texts/main";
import { Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
import MainMenuButton from "../customStyles/MainMenuButton";

import ImageBg from "../components/ImageBg";

const MainScreen = () => {
	const modalCxt = useContext(ModalContext);
	const bookingCxt = useContext(BookingContext);
	const { state, autoSignIn } = useContext(AuthContext);
	const nextMeet = bookingCxt.state.userMeetings;
	useEffect(() => {
		bookingCxt.getNextMeet(state.token, state.userId);
		autoSignIn(modalCxt.showModal);
	}, [state.token]);
	useEffect(() => {
		bookingCxt.getNextMeet(state.token, state.userId);
		autoSignIn(modalCxt.showModal);
	}, [state.token]);
	const modalShowing = modalCxt.state.id;
	const admin = state.role === "admin" ? true : false;
	const member = state.role === "member" ? true : false;

	return (
		<ScrollView style={styles.scrollcontainer}>
			<ImageBg />
			{!modalShowing && (
				<>
					<Animatable.View animation={"fadeInDown"} duration={1000} style={styles.maintextcontainer}>
						{admin && state.token ? (
							<View>
								<Text style={styles.maintext}>{state.name} שלום</Text>
								<Text style={styles.maintext}>יש לך הרשאות מנהל, אתה יכול לבטל לקבוע ולצפות בכל התורים</Text>
							</View>
						) : state.token ? (
							<>
								<Text style={styles.maintext}>{state.name} שלום</Text>
								{nextMeet ? (
									<Text style={styles.maintext}>
										יש לך תור לתאריך {moment(nextMeet.startDate).format("DD/MM/YYYY")} בשעה{" "}
										{moment(nextMeet.startDate).format("HH:mm")}
										{"\n"}
										סוג הטיפול: {nextMeet.massageType}
										{nextMeet.name}
									</Text>
								) : (
									<Text style={styles.maintext}>{notExistMeetingsText}</Text>
								)}
							</>
						) : (
							<Text style={styles.maintext}>
								{guestMainText}
								<Text
									onPress={() => modalCxt.showModal({ id: "SignModal" })}
									style={{ fontWeight: "bold", color: "#1d2731" }}
								>
									{"\n"}
									{clickPleaseText}
								</Text>
							</Text>
						)}
					</Animatable.View>

					<Animatable.View animation={"fadeInUpBig"} duration={1000} style={styles.buttoncontainer}>
						{admin && <MainMenuButton color={"#4db0ea"} navigateTo="UserHistory" icon="book" text="יומן מנהל" />}
						{(member || admin) && (
							<MainMenuButton
								color={"#4db0ea"}
								navigateTo="MeetingPicker"
								icon="calendar"
								text={admin ? "קבע תור ללקוח" : "קבע תור"}
							/>
						)}
						{member && (
							<MainMenuButton color={"#328cc1"} navigateTo="UserHistory" icon="book" text="ניהול התורים שלי" />
						)}
						{!admin && !member && (
							<>
								<MainMenuButton
									color={"#5cbbf2"}
									onPress={() => modalCxt.showModal({ id: "SignModal", modalProps: { loginPage: true } })}
									icon="user"
									text="התחברות"
								/>
								<MainMenuButton
									color={"#328cc1"}
									onPress={() => modalCxt.showModal({ id: "SignModal" })}
									icon="user-plus"
									text="הרשמה"
								/>
							</>
						)}

						<MainMenuButton color={"#0b3c5d"} navigateTo="About" icon="address-card" text="אודות" />
						<MainMenuButton color={"#1d2731"} navigateTo="Location" icon="map-marker" text="איך מגיעים" />
					</Animatable.View>
				</>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	scrollcontainer: {
		height: Dimensions.get("window").height,
		width: Dimensions.get("window").width,
	},
	maintextcontainer: {
		position: "absolute",
		alignSelf: "center",
		paddingHorizontal: 20,
		backgroundColor: "rgba(255,255,255,0.8)",
		paddingVertical: 10,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		zIndex: 2,
	},
	maintext: {
		paddingHorizontal: 5,
		textAlign: "center",
		color: "#1d2731",
		fontFamily: "heebo",
		fontSize: 16,
	},
	buttoncontainer: {
		zIndex: 2,
		position: "absolute",
		paddingTop: 8,
		paddingBottom: StatusBar.currentHeight,
		bottom: 0,
		backgroundColor: "rgba(255,255,255,0.8)",
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		justifyContent: "center",
		alignSelf: "center",
	},
});

export default MainScreen;
