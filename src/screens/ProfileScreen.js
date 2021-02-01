import React, { useState, useContext } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
	KeyboardAvoidingView,
} from "react-native";
import WrapperScreen from "../shared/WrapperScreen";
import { t1 } from "../../utilities/Images";
import { profileChangeArr } from "../../utilities/constantArrays";
import { Context as AuthContext } from "../context/auth-context";
import * as Animatable from "react-native-animatable";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Icon } from "react-native-elements";
import { comparePasswords } from "../helpers/helperFunctions";
import { nameValidator, phoneValidator } from "../helpers/ClientValidators";
import { phoneFieldText, nameFieldText } from "../../utilities/texts/profile";
import ProfileDetails from "../components/ProfileDetails";
import NextMeeting from "../components/NextMeeting";
import StyledButton from "../customStyles/StyledButton";
const ProfileScreen = ({ navigation }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(null);
	const [value, setValue] = useState("");
	const [confirmPass, setConfirmPass] = useState("");

	const [nameError, setNameError] = useState(null);
	const [phoneError, setPhoneError] = useState(null);
	const [passError, setPassError] = useState(null);
	const { state, updateUser } = useContext(AuthContext);

	const token = state.token || null;

	const matchPasswords = () => {
		if (confirmPass.length || value.length < 6) {
			setPassError("סיסמא חייבת להכיל לפחות 6 ספרות");
		} else if (comparePasswords(value, confirmPass)) {
			const param = "password";
			setPassError("סיסמתך שונתה בהצלחה");
			updateUser(state.userId, token, param, value);
		} else setPassError("סיסמאות לא זהות");
	};
	const handleChanges = () => {
		let param = null;
		if (currentIndex === 0) {
			param = "name";
			if (nameValidator(value)) {
				setNameError(false);
				updateUser(state.userId, token, param, value);
			} else setNameError(true);
		}
		if (currentIndex === 1) {
			param = "phone";
			if (phoneValidator(value)) {
				setPhoneError(false);
				updateUser(state.userId, token, param, value);
			} else setPhoneError(true);
		}
	};
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == "ios" ? "padding" : "height"}
			enableOnAndroid
			extraScrollHeight={200}
			extraHeight={100}
			style={styles.scrollcontainer}
			showsVerticalScrollIndicator={false}
		>
			<WrapperScreen wrapperContainer={styles.wrappercontainer} headerText={"פרופיל"} image={t1}>
				<ProfileDetails />
				<StyledButton
					onPress={() => navigation.navigate("UserHistory")}
					textStyle={styles.buttontext}
					buttonStyle={[styles.button, { backgroundColor: "#F7C93E" }]}
					text={"הסטוריית תורים"}
				/>
				<NextMeeting />
				{state.loading ? (
					<View style={[styles.button, styles.loader]}>
						<ActivityIndicator style={styles.buttontext} size={30} color={"black"} />
					</View>
				) : (
					<StyledButton
						onPress={() => setIsOpen(!isOpen)}
						textStyle={styles.buttontext}
						buttonStyle={[
							styles.button,
							isOpen && { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 },
							{ backgroundColor: "#c19007", marginBottom: 0 },
						]}
						text={"שנה פרטים"}
					/>
				)}
				{isOpen && (
					<Animatable.View style={styles.containeraccordion} animation={"fadeInDown"} duration={100}>
						{profileChangeArr.map((sub, index) => (
							<View key={index}>
								<View style={styles.containerfield}>
									<Icon style={styles.icontype} name={sub.icon} type="font-awesome" size={24} />

									<TextInput
										secureTextEntry={index === currentIndex && currentIndex === 2 ? true : false}
										placeholder={sub.title}
										style={[
											styles.button,
											{ backgroundColor: "#bed4e0" },
											index === currentIndex && { width: "60%", backgroundColor: "#f0f0f0" },
										]}
										k
										onFocus={() => setCurrentIndex(index)}
										onChangeText={setValue}
									/>

									{index === currentIndex && currentIndex !== 2 && (
										<TouchableOpacity onPress={handleChanges}>
											<Icon style={styles.checkicon} name={"check"} type="font-awesome" size={20} />
										</TouchableOpacity>
									)}
								</View>

								{index === currentIndex && currentIndex === 0 && (
									<Text style={styles.currentfield}>{nameError ? nameFieldText : `שמך הנוכחי: ${state.name}`}</Text>
								)}
								{index === currentIndex && currentIndex === 1 && (
									<Text style={styles.currentfield}>{phoneError ? phoneFieldText : `טלפון נוכחי: ${state.phone}`}</Text>
								)}
								{index === currentIndex && currentIndex === 2 && (
									<>
										<View style={styles.containerfield}>
											<View style={{ marginTop: 10, minWidth: "12%" }} />
											<TextInput
												secureTextEntry
												autoCompleteType={"password"}
												placeholder="הקש סיסמא חדשה בשנית"
												style={[styles.button, { width: "60%", backgroundColor: "#f0f0f0" }]}
												onChangeText={setConfirmPass}
											/>
											<TouchableOpacity onPress={matchPasswords}>
												<Icon style={styles.checkicon} name={"check"} type="font-awesome" size={20} />
											</TouchableOpacity>
										</View>

										{passError && (
											<View>
												{index === currentIndex && currentIndex === 2 && (
													<Text style={styles.currentfield}>{passError}</Text>
												)}
											</View>
										)}
									</>
								)}
							</View>
						))}
					</Animatable.View>
				)}
			</WrapperScreen>
		</KeyboardAvoidingView>
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
		backgroundColor: "#FFBF00",
		width: "80%",
		height: 40,
		borderRadius: 5,
		padding: 10,
		margin: 5,
		marginTop: 10,
		marginVertical: 0,
	},
	icontype: {
		marginTop: 10,
		minWidth: "12%",
	},
	containeraccordion: {
		borderTopWidth: 1,
		borderColor: "rgba(247, 185, 0,0.8)",
		backgroundColor: "#c19007",
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
	loader: {
		alignSelf: "center",
		paddingVertical: 4,
		borderBottomRightRadius: 0,
		borderBottomLeftRadius: 0,
		backgroundColor: "#d39e0a",
		minWidth: 100,
		padding: 10,
		borderRadius: 5,
	},
});
export default ProfileScreen;
