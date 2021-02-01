import React from "react";
import { ScrollView, Dimensions, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

const WrapperScreen = ({ children, image, headerText, wrapperContainer }) => {
	return (
		<ScrollView style={[styles.viewcontainer, wrapperContainer]}>
			<LinearGradient
				style={[styles.viewcontainer, wrapperContainer]}
				colors={["#1d2731", "#083c5d"]}
				start={{ x: 0.5, y: 0 }}
				end={{ x: 0.5, y: 1 }}
				locations={[0.5, 1]}
			>
				<Animatable.View
					style={styles.imagecontainer}
					animation={"fadeInRightBig"}
					delay={0}
					duration={1200}
					useNativeDriver={true}
				>
					<Image style={styles.image} source={image} />
					<Animatable.Text
						style={styles.imagecontainer}
						animation={"fadeInRightBig"}
						delay={200}
						duration={1200}
						useNativeDriver={true}
						style={styles.imagetext}
					>
						{headerText}
					</Animatable.Text>
				</Animatable.View>

				{children}
			</LinearGradient>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	viewcontainer: {
		paddingBottom: 80,
		minHeight: Dimensions.get("window").height,
	},
	loadingcontainer: {
		height: Dimensions.get("window").height / 2,
	},
	imagecontainer: {
		justifyContent: "center",
		marginBottom: 12,
	},
	image: {
		borderTopLeftRadius: 100,
		borderBottomLeftRadius: 100,
		overflow: "hidden",
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height / 5,
	},
	imagetext: {
		backgroundColor: "rgba(255,255,255,0.4)",
		paddingVertical: 20,
		borderTopLeftRadius: 50,
		borderBottomLeftRadius: 50,
		paddingHorizontal: 40,
		position: "absolute",
		color: "#0b3c5d",
		fontFamily: "heeboBold",
		fontSize: 22,
	},
});

export default WrapperScreen;
