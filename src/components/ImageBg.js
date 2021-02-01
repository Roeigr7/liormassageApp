import React, { useContext, useEffect, useRef, useState } from "react";
import { Dimensions, ImageBackground, StatusBar, StyleSheet } from "react-native";
import { mainImages } from "../../utilities/constantArrays";
import * as Animatable from "react-native-animatable";
import { Context as ModalContext } from "../context/modal-context";
import { LinearGradient } from "expo-linear-gradient";
const ImageBg = () => {
	const { state } = useContext(ModalContext);
	const animation = useRef();
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			!state.id && animation.current?.fadeIn();
			checkIndex();
		}, 15000);
		return () => clearInterval(interval);
	}, [index]);

	const checkIndex = () => {
		index >= mainImages.length - 1 ? setIndex(0) : setIndex(i => i + 1);
	};
	return (
		<>
			<LinearGradient
				// Background Linear Gradient
				colors={["rgba(29,39,49,0.9)", "transparent", "transparent", "rgba(29,39,49,0.9)"]}
				style={styles.linear}
				locations={[0, 0.1, 0.7, 1]}
			/>
			<Animatable.View ref={animation}>
				<ImageBackground alt="bgImage" source={mainImages[index]} style={styles.bgImage} />
			</Animatable.View>
		</>
	);
};

const styles = StyleSheet.create({
	bgImage: {
		height: Dimensions.get("window").height - StatusBar.currentHeight * 2.2,
		width: Dimensions.get("window").width,
	},
	linear: {
		position: "absolute",
		zIndex: 1,
		height: Dimensions.get("window").height - StatusBar.currentHeight * 2.2,
		width: Dimensions.get("window").width,
	},
});

export default ImageBg;
