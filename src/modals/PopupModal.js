import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

const PopupModal = ({ visible, closeModal, text }) => {
	useEffect(() => {
		if (visible) {
			let timer = setTimeout(() => {
				closeModal();
			}, 1000);
			return () => {
				clearTimeout(timer);
			};
		}
	});
	return (
		<Modal
			animationInTiming={500}
			backdropOpacity={0.5}
			onBackdropPress={closeModal}
			isVisible={visible}
			animationIn="bounceIn"
			animationOut="fadeOutDown"
		>
			<View style={styles.container}>
				<Text style={styles.text}>{text}</Text>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		borderColor: "white",
		borderRadius: 20,
		borderWidth: 1,
		borderStyle: "dotted",
		paddingVertical: 10,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#d9b310",
	},
	text: {
		color: "white",
		fontFamily: "heeboBold",
		fontSize: 16,
	},
});

export default PopupModal;
