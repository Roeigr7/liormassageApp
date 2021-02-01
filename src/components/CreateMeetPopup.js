import React, { useState, useContext } from "react";
import moment from "moment";
import Modal from "react-native-modal";
import { StyleSheet, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import * as RootNavigator from "../navigators/RootNavigator";
import AnimatedButton from "../customStyles/AnimatedButton";
import { Context as BookingContext } from "../context/booking-context";
import { Context as AuthContext } from "../context/auth-context";
import { Context as ModalContext } from "../context/modal-context";

import StyledButton from "../customStyles/StyledButton";

const CreateMeetPopup = ({
	hour,
	handleDate,
	handleMeet,
	tryMeet,
	date,
	massageType,
	onPress,
	handleHour,
	visible,
	setVisible,
}) => {
	const { state } = useContext(BookingContext);
	const modalCxt = useContext(ModalContext);
	const day = moment(date.dateString).format("DD/MM/YYYY");
	const authCxt = useContext(AuthContext);
	const dayName = moment(date.dateString).format("dddd");
	const [modalPhone, setModalPhone] = useState(false);
	const cancelAndClear = () => {
		handleHour(false);
		handleMeet(false);
		setVisible(false);
		if (tryMeet) handleDate(false);
	};
	const submitHandler = () => {
		onPress();
	};
	const goToMain = () => {
		setVisible(false);
		RootNavigator.navigate("Main");
	};
	return (
		<Modal onBackdropPress={cancelAndClear} isVisible={visible}>
			<Animatable.View style={styles.popup} animation="bounceInUp" duration={600} easing={"linear"}>
				{tryMeet ? (
					<Animatable.View animation={"fadeIn"} duration={1000}>
						<Text style={styles.aftertitle}>
							{state.message.content}
							{"\n"}
						</Text>
						<Text style={styles.aftertext}>ליום {dayName}</Text>
						<Text style={styles.aftertext}>בתאריך {day}</Text>
						<Text style={styles.aftertext}>שעה: {hour.time}</Text>
						<Text style={styles.aftertext}>סוג הטיפול: {massageType}</Text>
						<Text style={styles.aftertext}>טלפון: {authCxt.state.phone}</Text>
						<AnimatedButton
							duration={100}
							text={"למעבר לעמוד הראשי"}
							textStyle={styles.buttontext}
							buttonStyle={[styles.button, { minWidth: "90%" }]}
							onPress={goToMain}
						/>
					</Animatable.View>
				) : (
					<>
						<Text style={styles.title}>הפרטים שהזנת הם</Text>
						<Text style={styles.popuptext}>
							יום {dayName} לתאריך {day}
						</Text>
						<Text style={styles.popuptext}>שעה: {hour.time}</Text>
						<Text style={styles.popuptext}>סוג הטיפול: {massageType}</Text>
						<Text style={styles.popuptext}>טלפון: {authCxt.state.phone}</Text>

						<AnimatedButton
							duration={100}
							text={"לקביעת תור"}
							textStyle={styles.buttontext}
							buttonStyle={styles.button}
							onPress={submitHandler}
						/>
						<StyledButton
							duration={100}
							text={"לשינוי מספר טלפון"}
							textStyle={[styles.buttontext, styles.phonetext]}
							icon="phone"
							buttonStyle={[styles.button, styles.phonebutton]}
							onPress={() => modalCxt.showModal({ id: "ChangePhoneModal" })}
						/>

						<AnimatedButton
							duration={100}
							text={"לחזרה"}
							textStyle={styles.backbuttontext}
							buttonStyle={[styles.button, styles.backbutton]}
							onPress={cancelAndClear}
						/>
					</>
				)}
			</Animatable.View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	popup: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
		padding: 20,
		backgroundColor: "rgba(29, 39, 49,0.9)",
		borderWidth: 1,
		borderColor: "white",
		alignSelf: "center",
	},
	button: {
		marginTop: 15,
		borderRadius: 8,
		paddingVertical: 6,
		minWidth: "80%",

		backgroundColor: "#d9b310",
		borderColor: "rgba(255,255,255, 0.8)",
		borderWidth: 0.5,
	},
	backbutton: {
		minWidth: "30%",
		backgroundColor: "grey",
	},
	buttontext: {
		padding: 3,
		fontSize: 16,
	},
	backbuttontext: {
		fontWeight: "normal",
	},
	title: {
		color: "#d9b310",
		fontFamily: "heebo",
		fontSize: 18,
		marginBottom: 8,
	},
	popuptext: {
		color: "white",
		fontFamily: "heebo",
		fontSize: 16,
	},
	bottomtext: {
		color: "white",
		fontFamily: "heebo",
		marginTop: 6,
		fontSize: 14,
	},
	aftertitle: {
		textAlign: "center",
		fontFamily: "heeboBold",
		padding: 0,
		color: "#d9b310",
		fontSize: 20,
	},
	aftertext: {
		fontFamily: "heebo",
		color: "#d9b310",
		fontSize: 16,

		marginBottom: 6,
		color: "white",
	},
	phonetext: {
		fontSize: 16,

		fontWeight: "normal",
	},
	phonebutton: {
		minWidth: "70%",
		backgroundColor: "#0b3c5d",
	},
});

export default CreateMeetPopup;
