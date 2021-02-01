import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Context as AuthContext } from "../context/auth-context";
import { profileDetailsArr } from "../../utilities/constantArrays";
import * as Animatable from "react-native-animatable";
import StyledButton from "../customStyles/StyledButton";
import { Icon } from "react-native-elements";

const ProfileDetails = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { state } = useContext(AuthContext);

	return (
		<>
			<StyledButton
				onPress={() => setIsOpen(!isOpen)}
				textStyle={styles.buttontext}
				buttonStyle={[
					styles.button,
					isOpen && { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 },
					{ backgroundColor: "#F7D56F", marginBottom: 0 },
				]}
				text={"פרטי משתמש"}
			/>
			{isOpen && (
				<Animatable.View style={styles.containeraccordion} animation={"fadeInDown"} duration={100}>
					{profileDetailsArr.map((sub, index) => (
						<View key={index}>
							<View style={styles.containerfield}>
								<Icon style={{ minWidth: "12%" }} name={sub.icon} type="font-awesome" size={24} />
								<Text style={styles.titlefield}>
									{sub.title}
									<Text style={styles.field}>
										{index === 0 ? state.name : index === 1 ? state.phone : index === 2 ? state.email : null}
									</Text>
								</Text>
							</View>
						</View>
					))}
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
		backgroundColor: "#F7D56F",
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
		borderRadius: 5,
		padding: 8,
		margin: 5,
		fontFamily: "heeboBold",
		marginVertical: 0,
	},
	field: {
		fontFamily: "heebo",
		fontWeight: "normal",
		fontSize: 16,
	},
	containeraccordion: {
		backgroundColor: "#FFDC73",
		width: "80%",
		paddingVertical: 10,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		alignSelf: "center",
	},
	containerfield: {
		flexDirection: "row",
		alignItems: "center",
	},
	checkicon: {
		padding: 5,
		marginTop: 10,
		borderColor: "white",
		borderWidth: 1,
		borderRadius: 30,
	},
	currentfield: {
		marginTop: 5,
		color: "white",
		marginBottom: 10,
		marginLeft: "15%",
	},
	scrollcontainer: {
		flex: 1,
		backgroundColor: "#083c5d",
	},
	wrappercontainer: {
		paddingBottom: 0,
		minHeight: 0,
	},
});

export default ProfileDetails;
