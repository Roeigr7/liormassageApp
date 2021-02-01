import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FlatListPicker = ({ data, type, onPress, selected, title }) => {
	return (
		<>
			<Text style={styles.title}>{title}</Text>
			<FlatList
				showsHorizontalScrollIndicator={false}
				horizontal={true}
				data={data}
				renderItem={({ item, index }) => (
					<View style={item.busy && styles.busycontainer}>
						<TouchableOpacity
							activeOpacity={item.busy ? 1 : 0.2}
							style={[styles.button, selected === item.key && styles.buttonselected, item.busy && styles.busybutton]}
							onPress={() => (item.busy ? null : onPress(item, type))}
						>
							<Text style={[styles.text, selected === item.key && styles.textselected, item.busy && styles.busytext]}>
								{item.dayName || item.time || item.massageType}
								{type === "set_day" && (
									<Text
										style={[
											styles.text,
											styles.datetext,
											selected === index && styles.textselected && styles.dateselected,
										]}
									>
										{"\n"}
										{item.date}
									</Text>
								)}
							</Text>
						</TouchableOpacity>
					</View>
				)}
				keyExtractor={(item, index) => index.toString()}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	title: {
		marginBottom: 5,
		textAlign: "center",
		color: "#d9b310",
		fontSize: 16,
		fontFamily: "heeboBold",
	},
	textselected: {
		color: "#1d2731",
		fontSize: 16,
		fontFamily: "heeboBold",
	},
	dateselected: {
		color: "#1d2731",
		fontSize: 12,
	},
	buttonselected: {
		backgroundColor: "#d9b310",
		borderColor: "#1d2731",
	},
	text: {
		color: "white",
		padding: 6,
		fontSize: 16,
		fontFamily: "heebo",
		textAlign: "center",
	},
	datetext: {
		fontSize: 12,
	},
	button: {
		minWidth: 122,
		borderRadius: 12,
		marginHorizontal: 5,
		marginBottom: 85,
		padding: 10,
		borderWidth: 1,
		backgroundColor: "transparent",
		borderColor: "#d9b310",
	},
	busycontainer: {
		opacity: 0.1,
	},
	busybutton: {
		backgroundColor: "rgba(255,255,255,0.7)",
	},
	busytext: {
		color: "#D1D1D1",
	},
});

export default FlatListPicker;
