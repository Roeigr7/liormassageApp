import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Context as ModalContext } from "../context/modal-context";
import { Context as AuthContext } from "../context/auth-context";
import * as RootNavigator from "../navigators/RootNavigator";
import AnimatedButton from "../customStyles/AnimatedButton";

const WelcomeModal = () => {
	const { hideModal } = useContext(ModalContext);
	const { state } = useContext(AuthContext);

	const goToMain = () => {
		hideModal();
		RootNavigator.navigate("Main");
	};
	const goToHistory = () => {
		hideModal();
		RootNavigator.navigate("UserHistory");
	};
	const goToMeetingPicker = () => {
		hideModal();
		RootNavigator.navigate("MeetingPicker");
	};
	return (
		<>
			<Text style={styles.titletext}>
				שלום {"\n"}
				{state.name}
			</Text>
			<Text style={styles.txt}>הינך מוזמן להמשיך לעיין באתר</Text>

			<AnimatedButton
				onPress={goToMain}
				text={"למעבר לעמוד הראשי"}
				buttonStyle={styles.button}
				textStyle={styles.buttontext}
			/>
			<AnimatedButton
				onPress={goToHistory}
				text={"לצפייה בתורים שלך"}
				buttonStyle={[styles.button, styles.meetingsbutton]}
				textStyle={styles.buttontext}
			/>
			<AnimatedButton
				onPress={goToMeetingPicker}
				text={"לקביעת תור"}
				buttonStyle={[styles.button, styles.pickmeetbutton]}
				textStyle={styles.buttontext}
			/>
			<View style={{ marginBottom: 20 }} />
		</>
	);
};

const styles = StyleSheet.create({
	titletext: {
		textAlign: "center",
		marginVertical: 20,
		fontSize: 30,
		color: "#d9b310",
		fontFamily: "comix",
	},
	txt: {
		textAlign: "center",
		marginTop: 5,
		fontSize: 20,
		color: "white",
		fontFamily: "comix",
		marginBottom: 30,
	},

	button: {
		marginTop: 15,
		backgroundColor: "#d9b310",
		color: "white",
		minWidth: "60%",
		elevation: 1,
		borderRadius: 6,
	},
	meetingsbutton: {
		backgroundColor: "#0b3c5d",
	},
	pickmeetbutton: {
		backgroundColor: "#328cc1",
	},
	buttontext: {
		padding: 6,
	},
});

export default WelcomeModal;
