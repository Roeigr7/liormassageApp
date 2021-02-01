import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Context as BookingContext } from "../context/booking-context";
import { Context as AuthContext } from "../context/auth-context";
import * as Animatable from "react-native-animatable";
import StyledButton from "../customStyles/StyledButton";
import moment from "moment";
const NextMeeting = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { state } = useContext(AuthContext);
	const bookingCxt = useContext(BookingContext);
	const nextMeet = bookingCxt.state.userMeetings;

	useEffect(() => {
		bookingCxt.getNextMeet(state.token, state.userId);
	}, []);
	return (
		<>
			<StyledButton
				onPress={() => setIsOpen(!isOpen)}
				textStyle={styles.buttontext}
				text={"התור הקרוב"}
				buttonStyle={[
					styles.button,
					isOpen && { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 },
					{ backgroundColor: "#F7B900", marginBottom: 0 },
				]}
			/>
			{isOpen && (
				<Animatable.View style={styles.containeraccordion} animation={"fadeInDown"} duration={100}>
					<View style={styles.containerfield}>
						{nextMeet ? (
							<Text style={styles.field}>
								התור הקרוב שלך בתאריך {moment(nextMeet.startDate).format("DD/MM/YYYY")} בשעה{" "}
								{moment(nextMeet.startDate).format("HH:mm")}
								{"\n"}
								סוג הטיפול: {nextMeet.massageType}
								{nextMeet.name}
							</Text>
						) : (
							<Text style={styles.field}>לא קיימים תורים עתידיים</Text>
						)}
					</View>
				</Animatable.View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	buttontext: {
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 16,
		fontFamily: "heebo",
		color: "black",
	},
	button: {
		backgroundColor: "#F7B900",
		width: "80%",
		height: 40,
		borderRadius: 5,
		padding: 10,
		margin: 5,
		marginTop: 10,
		marginVertical: 0,
	},
	titlefield: {
		width: "80%",
		fontSize: 16,
		height: 40,
		borderRadius: 5,
		padding: 10,
		margin: 5,
		fontFamily: "heeboBold",
		marginVertical: 0,
	},
	field: {
		paddingHorizontal: 10,
		fontFamily: "heebo",
		fontWeight: "normal",
		fontSize: 16,
	},
	containeraccordion: {
		borderTopWidth: 1,
		borderColor: "rgba(255,255,255,0.8)",
		backgroundColor: "#f2bb24",
		width: "80%",
		paddingVertical: 10,
		paddingBottom: 20,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		alignSelf: "center",
	},
	containerfield: {
		flexDirection: "row",
		alignItems: "center",
	},
});

export default NextMeeting;
