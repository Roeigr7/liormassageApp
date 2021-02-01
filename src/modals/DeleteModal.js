import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Context as BookingContext } from "../context/booking-context";
import { Context as ModalContext } from "../context/modal-context";
import { Context as AuthContext } from "../context/auth-context";
import * as Animatable from "react-native-animatable";
import AnimatedButton from "../customStyles/AnimatedButton";

const DeleteModal = () => {
	const [deletePressed, setDeletePressed] = useState(false);
	const bookingCxt = useContext(BookingContext);
	const modalCxt = useContext(ModalContext);
	const { state } = useContext(AuthContext);
	const removeMeet = async () => {
		await bookingCxt.cancelUserMeet(state.token, modalCxt.state.modalProps.meetId).then(() => {
			setDeletePressed(true);
		});
	};

	return (
		<View style={{ margin: 20 }}>
			{deletePressed ? (
				<Animatable.Text animation={"fadeIn"} duration={800} style={styles.aftertext}>
					התור בוטל בהצלחה
				</Animatable.Text>
			) : (
				<>
					<Text style={styles.text}>האם אתה בטוח שברצונך לבטל את התור?</Text>
					<AnimatedButton
						onPress={removeMeet}
						text={"בטל תור"}
						buttonStyle={styles.button}
						textStyle={styles.buttontext}
					/>
				</>
			)}
			<AnimatedButton
				text={"לחזרה"}
				textStyle={styles.backbuttontext}
				buttonStyle={[styles.button, styles.backbutton]}
				onPress={modalCxt.hideModal}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		color: "white",
		fontSize: 18,
		fontFamily: "heeboBold",
		textAlign: "center",
	},
	popup: {
		width: "90%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
		padding: 30,
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

	aftertext: {
		textAlign: "center",
		fontFamily: "heeboBold",
		padding: 20,
		color: "#d9b310",
		fontSize: 20,
	},
});

export default DeleteModal;
