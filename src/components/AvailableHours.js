import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PopupModal from "../modals/PopupModal";
import * as Animatable from "react-native-animatable";
const AvailableHours = ({ selectedDay, avHoursByType, selected, onPress, selectedMassageType }) => {
	const [modalVisible, setModalVisible] = useState(false);

	const onBackdrop = () => {
		setModalVisible(!modalVisible);
	};

	if (avHoursByType.length < 1 && selectedDay) {
		return <View style={{ minHeight: 270, backgroundColor: "transparent" }} />;
	}
	if (avHoursByType.length < 1 && !selectedDay) {
		return (
			<View style={{ minHeight: 30, backgroundColor: "transparent" }}>
				<Text style={styles.choosehourtext}>בחר תאריך בכדי לראות את השעות הפנויות</Text>
			</View>
		);
	}
	if (selectedMassageType.key === -1) {
		return (
			<View style={{ minHeight: 30, backgroundColor: "transparent" }}>
				<Text style={styles.choosehourtext}>בחר סוג טיפול בכדי לראות את השעות הפנויות</Text>
			</View>
		);
	}

	return (
		<Animatable.View animation={"zoomIn"} duration={500} style={styles.container}>
			{avHoursByType.map((item, i) => {
				return (
					<TouchableOpacity key={i} onPress={item.busy ? () => setModalVisible(true) : () => onPress(item)}>
						<View
							style={
								item.key === selected.key
									? [styles.button, styles.selectedbutton]
									: item.busy === false
									? styles.button
									: [styles.button, styles.busybutton]
							}
						>
							<Text style={styles.text}>{item.time}</Text>
						</View>
					</TouchableOpacity>
				);
			})}
			{modalVisible && <PopupModal text={"התור שנבחר תפוס"} visible={modalVisible} closeModal={onBackdrop} />}
		</Animatable.View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",
		marginBottom: 8,
	},
	text: {
		color: "white",
		fontSize: 16,
		fontFamily: "heebo",
		textAlign: "center",
	},
	button: {
		width: Dimensions.get("window").width / 4 - 8,
		margin: 4,
		paddingVertical: 6,
		borderRadius: 5,
		borderColor: "red",
		borderWidth: 0.5,

		backgroundColor: "transparent",
		borderColor: "rgba(217, 179, 16,0.7)",
	},
	busybutton: {
		opacity: 0.3,
	},

	selectedbutton: {
		backgroundColor: "#d9b310",
	},
	choosehourtext: {
		color: "white",
		textAlign: "center",
		fontSize: 16,
		fontFamily: "heebo",
		borderWidth: 1,
		borderColor: "rgba(217, 179, 16,0.3)",
		margin: 20,
		borderRadius: 6,
		paddingVertical: 8,
	},
});

export default AvailableHours;
