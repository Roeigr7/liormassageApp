import React, { useState } from "react";
import moment from "moment";

import { StyleSheet, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import AnimatedButton from "../customStyles/AnimatedButton";
const CreateMeetPopup = ({ date, massageType, onPress, handleHour }) => {
	const [visible, setModalVisible] = useState(true);

	const day = moment(date.dateString).format("DD/MM/YYYY");
	const dayName = moment(date.dateString).format("dddd");
	const fadeOut = {
		from: {
			opacity: 1,
		},
		to: {
			opacity: 1,
		},
	};
	const cancelAndClear = () => {
		handleHour(false);
	};
	const submitHandler = () => {
		onPress();
		setModalVisible(false);
	};
	return (
		<Animatable.View style={styles.popup} animation="bounceInUp" duration={600} easing={"linear"}>
			<Text style={styles.title}>הפרטים שהזנת הם</Text>
			<Text style={styles.popuptext}>
				יום {dayName} לתאריך {day}
			</Text>
			<Text style={styles.popuptext}>שעה: {day}</Text>
			<Text style={styles.popuptext}>סוג הטיפול: {massageType}</Text>
			<AnimatedButton
				text={"לקביעת תור"}
				textStyle={styles.buttontext}
				buttonStyle={styles.button}
				onPress={submitHandler}
			/>
			<AnimatedButton
				text={"לחזרה"}
				textStyle={styles.backbuttontext}
				buttonStyle={[styles.button, styles.backbutton]}
				onPress={cancelAndClear}
			/>
		</Animatable.View>
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
});

export default CreateMeetPopup;
