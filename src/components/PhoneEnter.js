import React, { useContext } from "react";
import { Dimensions, KeyboardAvoidingView, StyleSheet, Text, TextInput } from "react-native";
import { Context as AuthContext } from "../context/auth-context";
const PhoneEnter = ({ phoneNumber }) => {
	const { state } = useContext(AuthContext);

	return (
		<KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? "padding" : "height"}>
			<Text style={styles.title}>המספר ששמור במערכת הינו:</Text>
			<TextInput
				defaultValue={state.phone}
				autoFocus={true}
				keyboardType="numeric"
				selectionColor="white"
				color="white"
				placeholderTextColor="rgba(255,255,255,0.7)"
				style={styles.textInput}
				onChangeText={value => phoneNumber(value)}
			/>
		</KeyboardAvoidingView>
	);
};
const styles = StyleSheet.create({
	container: {
		borderTopWidth: 5,
		borderColor: "rgba(0,0,0,0.1)",
		marginVertical: 15,

		alignItems: "center",
	},
	textInput: {
		backgroundColor: "rgba(255,255,255,0.1)",
		paddingVertical: 8,
		borderRadius: 6,
		fontSize: 18,
		fontFamily: "heeboBold",
		textAlign: "center",
		paddingHorizontal: 10,
		width: Dimensions.get("window").width * 0.6,
		alignSelf: "center",
		borderColor: "#d9b310",
		borderBottomWidth: 1,
	},
	title: {
		marginTop: 10,
		marginBottom: 6,
		color: "#d9b310",
	},
});

export default PhoneEnter;
