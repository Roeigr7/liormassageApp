import React, { useContext, useEffect } from "react";
import { Context as ModalContext } from "../context/modal-context";
import { Context as AuthContext } from "../context/auth-context";
import { Context as BookingContext } from "../context/booking-context";
import moment from "moment";
import { StyleSheet, Text, View } from "react-native";
import StyledButton from "../customStyles/StyledButton";

const UserMeetingList = () => {
	const { showModal, hideModal } = useContext(ModalContext);
	const { state, cancelUserMeet } = useContext(BookingContext);
	const authContext = useContext(AuthContext);
	const nextMeet = state.userMeetings;

	const cancelMeetHandler = () => {
		cancelUserMeet(authContext.state.token, nextMeet._id, nextMeet.date, nextMeet.hour, showModal);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>התור הקרוב שלך</Text>
			<Text style={styles.nextmeettext}>
				בתאריך: {moment(nextMeet.date).format("DD/MM/YYYY")} {"\n"} בשעה: {moment(nextMeet.date).format("LT")} {"\n"}{" "}
				סוג הטיפול:
				{nextMeet.massageType}
			</Text>
			<View style={styles.btncontainer}>
				<StyledButton text="בטל תור" onPress={cancelMeetHandler} style={{ backgroundColor: "#ef5350" }} />
				<StyledButton style={{ marginLeft: 10 }} text="המשך גלישה" onPress={hideModal} />
			</View>
		</View>
	);
};

export default UserMeetingList;

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
	nextmeettext: {
		textAlign: "center",
		color: "#011740",
		fontFamily: "heeboBold",
		fontSize: 18,
		marginBottom: 10,
	},

	title: {
		fontSize: 20,
		color: "#011740",
		fontFamily: "heebo",
		marginBottom: "8%",
	},
	btncontainer: {
		flexDirection: "row",
	},
});
