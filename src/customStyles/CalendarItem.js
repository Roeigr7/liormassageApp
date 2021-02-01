import React, { useContext } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Context as AuthContext } from "../context/auth-context";
import { Context as ModalContext } from "../context/modal-context";
import moment from "moment";
import call from "react-native-phone-call";
import { Grid, Col } from "react-native-easy-grid";

////////MOMENT LOCAL////////
moment.updateLocale("he", {
	longDateFormat: {
		LT: "HH:mm",
		LTS: "h:mm:ss A",
		L: "MM/DD/YYYY",
		l: "M/D/YYYY",
		LL: "MMMM Do YYYY",
		ll: "MMM D YYYY",
		LLL: "MMMM Do YYYY LT",
		lll: "MMM D YYYY LT",
		LLLL: "dddd, MMMM Do YYYY LT",
		llll: "ddd, MMM D YYYY LT",
	},
	monthNamesShort: ["ינו", "פבר", "מרץ", "אפ", "מאי", "יוני", "יולי", "אוג", "ספט", "אוק", "נוב", "דצמ"],
	weekdays: "ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),
	dayNamesShort: ["א", "ב", "ג", "ד", "ה", "ו", "ש"],
	today: "היום",
});

export const CalendarItem = ({ selectedDay, meetings = [] }) => {
	const { state } = useContext(AuthContext);
	const modalCxt = useContext(ModalContext);
	const role = state.role;
	const dayMeetings = meetings.filter(meet => moment(meet.startDate).format("YYYY-MM-DD") === selectedDay.dateString);
	const makeCall = number => {
		const args = {
			number: number, // String value with the number to call
			prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
		};
		call(args).catch();
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{selectedDay && moment(selectedDay.dateString).format("יום dddd  DD/MM/YYYY")}</Text>
			{dayMeetings.length < 1 ? (
				<View style={styles.nomeetingscontainer}>
					{selectedDay && <Text style={styles.nomeetings}>לא נקבעו תורים ליום זה</Text>}
					{!selectedDay && <Text style={styles.nomeetings}>בחר יום</Text>}
				</View>
			) : (
				<FlatList
					data={dayMeetings}
					renderItem={({ item, index }) => (
						<Grid style={[styles.gridcontainer, { backgroundColor: index % 2 == 0 ? "#e0dfdb" : "#f2f1ef" }]}>
							<Col size={1.5} style={[styles.col, styles.hourcol]}>
								<Text style={styles.hour}>
									מ: {moment(item.startDate).format("LT")}
									{"\n"} עד: {moment(item.endDate).format("LT")}
								</Text>
							</Col>
							<Col size={3} style={styles.col}>
								{role === "admin" && <Text style={styles.detailstext}>{item.determinedBy.name} :שם</Text>}

								<Text style={styles.detailstext}>סוג טיפול: {item.massageType}</Text>
							</Col>
							<Col style={styles.col} size={0.5}>
								<TouchableOpacity
									style={[styles.iconcontainer, { backgroundColor: "rgba(255,0,0,0.5)" }]}
									onPress={() => modalCxt.showModal({ id: "DeleteModal", modalProps: { meetId: item._id } })}
								>
									<Icon style={styles.phone} name="trash" color={"white"} size={16} />
								</TouchableOpacity>
							</Col>
							<Col size={0.5}>
								{role === "admin" && (
									<TouchableOpacity style={styles.iconcontainer} onPress={() => makeCall(`${item.determinedBy.phone}`)}>
										<Icon style={styles.phone} name="phone" color={"white"} size={16} />
									</TouchableOpacity>
								)}
							</Col>
						</Grid>
					)}
					keyExtractor={(item, index) => index.toString()}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1d2731",
	},
	title: {
		textAlign: "center",
		fontFamily: "heebo",
		fontSize: 16,
		color: "#d9b310",
		alignSelf: "center",
		marginVertical: 6,
	},

	detailstext: {
		textAlign: "left",
		fontFamily: "heebo",
		fontSize: 16,
	},
	hour: {
		textAlign: "center",
		padding: 10,
		fontFamily: "heebo",
		fontSize: 14,
	},
	gridcontainer: {
		borderTopRightRadius: 3,
		alignSelf: "center",
		paddingRight: 3,
		paddingVertical: 1,
		marginHorizontal: 1,
		marginVertical: 0.5,
		flexDirection: "row",
		alignItems: "center",
	},
	col: {
		marginHorizontal: 5,
	},
	hourcol: {
		borderColor: "#1d2731",
		borderRightWidth: 1,
		borderRadius: 6,
		backgroundColor: "transparent",
	},

	iconcontainer: {
		justifyContent: "center",
		alignItems: "center",
		width: 30,
		height: 30,
		borderRadius: 15,
		borderWidth: 2,
		borderColor: "white",
		elevation: 1,
		backgroundColor: "#1d2731",
	},
	nomeetingscontainer: {
		flex: 1,
		justifyContent: "center",
	},
	nomeetings: {
		textAlign: "center",
		fontFamily: "heebo",
		fontSize: 20,
		color: "white",
		alignSelf: "center",
	},
});

export default CalendarItem;
