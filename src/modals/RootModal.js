import React, { useContext } from "react";
import { Dimensions, StyleSheet } from "react-native";
import SignModal from "./SignModal";
import WelcomeModal from "./WelcomeModal";
import ChangePhoneModal from "./ChangePhoneModal";
import DeleteModal from "./DeleteModal";
import LogoutModal from "./LogoutModal";
import { Context as ModalContext } from "../context/modal-context";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

const Modals = {
	SignModal: SignModal,
	WelcomeModal: WelcomeModal,
	LogoutModal: LogoutModal,
	DeleteModal: DeleteModal,
	ChangePhoneModal: ChangePhoneModal,
};

const RootModal = ({ animation }) => {
	const { state, modalProps, hideModal } = useContext(ModalContext);
	// assign a constant that is either one of our custom views or a noop function if the id is not set
	const ModalView = Modals[state.id];
	return (
		<Modal
			style={{
				margin: 0,
				marginVertical: -20,
				padding: 0,
				alignItems: "center",
				height: Dimensions.get("window").height,
			}}
			animationInTiming={0.1}
			backdropColor="black"
			backdropOpacity={0.8}
			onBackdropPress={hideModal}
			isVisible={Boolean(state.id)}
			animationType="fade"
		>
			<Animatable.View style={styles.container} animation={animation || "slideInRight"} duration={200}>
				<ScrollView>
					<LinearGradient
						// Background Linear Gradient
						colors={["rgba(0,0,0,0.05)", "transparent"]}
						style={styles.linear}
						start={{ x: -0.6, y: 0.5 }}
						end={{ x: 1.1, y: 1 }}
						locations={[0.5, 0.5]}
					/>
					<Icon style={styles.icon} name="times" size={26} color={"red"} onPress={hideModal} />
					{ModalView ? <ModalView {...modalProps} /> : null}
				</ScrollView>
			</Animatable.View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	linear: {
		position: "absolute",
		width: "100%",
		height: "100%",
		borderRadius: 10,
	},
	icon: {
		color: "#d9b310",
		left: 10,
		top: 10,
		alignSelf: "flex-start",
		position: "relative",
		zIndex: 100,
	},
	container: {
		maxHeight: Dimensions.get("window").height * 0.95,
		borderRadius: 10,
		borderColor: "#d9b310",
		backgroundColor: "#1d2731",
		borderWidth: 1,
		width: "93%",
	},
});

export default RootModal;
