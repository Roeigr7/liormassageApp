import * as Font from "expo-font";

const fetchFonts = () => {
	return Font.loadAsync({
		heebo: require("./assets/fonts/heebo/Heebo-Regular.ttf"),
		heeboBold: require("./assets/fonts/heebo/Heebo-Bold.ttf"),
		comixBold: require("./assets/fonts/comix/comixno2clm_bold-webfont.ttf"),
		comix: require("./assets/fonts/comix/comixno2clm_medium-webfont.ttf"),
	});
};

export default fetchFonts;
