import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import AuthForm from "../forms/AuthForm";
import { Context as AuthContext } from "../context/auth-context";
import { Context as ModalContext } from "../context/modal-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const SignModal = () => {
	const [loginPage, setLoginPage] = useState(false);
	const { clearErrors } = useContext(AuthContext);
	const modalCxt = useContext(ModalContext);
	useEffect(() => {
		if (modalCxt.state.modalProps) setLoginPage(!loginPage);
	}, []);

	const changePage = () => {
		setLoginPage(!loginPage);
		clearErrors();
	};

	return (
		<KeyboardAwareScrollView
			keyboardShouldPersistTaps="handled"
			enableOnAndroid
			extraScrollHeight={100}
			style={styles.scrollcontainer}
			showsVerticalScrollIndicator={false}
		>
			<AuthForm
				headerText={loginPage ? "התחבר" : "הרשמה"}
				submitBtnText={loginPage ? "התחבר" : "הרשמה"}
				loginPage={loginPage}
			/>

			<TouchableOpacity style={styles.bottombtn} onPress={changePage}>
				<Text style={styles.bottomtxt}>{loginPage ? "עוד לא נרשמת? עבור להרשמה" : "משתמש קיים? לחץ להתחברות"}</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.bottombtn} onPress={modalCxt.hideModal}>
				<Text style={styles.notnowtext}>המשך כאורח</Text>
			</TouchableOpacity>
		</KeyboardAwareScrollView>
	);
};

const styles = StyleSheet.create({
	bottombtn: {
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		alignSelf: "center",
		marginTop: 15,
	},
	notnowtext: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		color: "#1e96a6",
		marginBottom: 10,
		color: "#d9b310",
	},

	bottomtxt: {
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
		color: "white",
	},
});

export default SignModal;
