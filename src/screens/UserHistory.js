import React, { useEffect, useContext, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import LoadingSpinner from "../shared/LoadingSpinner";
import { CalendarItem } from "../customStyles/CalendarItem";
import { Context as BookingContext } from "../context/booking-context";
import { Context as ModalContext } from "../context/modal-context";
import { Context as AuthContext } from "../context/auth-context";
import moment from "moment";
import { LocaleConfig } from "react-native-calendars";
import { calendarTheme } from "../../utilities/calendarTheme";
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
});
////////MOMENT LOCAL////////
LocaleConfig.locales["he"] = {
	monthNames: [
		"ינואר",
		"פברואר",
		"מרץ",
		"אפריל",
		"מאי",
		"יוני",
		"יולי",
		"אוגוסט",
		"ספטמבר",
		"אוקטובר",
		"נובמבר",
		"דצמבר",
	],
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
	dayNames: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
	dayNamesShort: ["א", "ב", "ג", "ד", "ה", "ו", "ש"],
	today: "היום",
};
const UserHistory = () => {
	const [selectedDay, setSelectedDay] = useState({ dateString: moment().format("YYYY-MM-DD") });
	const authCxt = useContext(AuthContext);
	const { state, getAllMeetings, getUserMeetings } = useContext(BookingContext);
	const ModalCxt = useContext(ModalContext);
	const [selectedMonth, setSelectedMonth] = useState(moment().toISOString());
	const meetings = state.meetings;

	useEffect(() => {
		if (authCxt.state.role === "admin") getAllMeetings(selectedMonth);

		if (authCxt.state.role === "member") getUserMeetings(authCxt.state.token, authCxt.state.userId);
	}, []);

	const monthChange = month => {
		setSelectedDay(false);
		setSelectedMonth(month.dateString);

		if (authCxt.state.role === "admin") getAllMeetings(month.dateString);

		if (authCxt.state.role === "member") getUserMeetings(authCxt.state.token, authCxt.state.userId);
	};

	const getMarkesDates = (selectedDay, meetings = []) => {
		const markedDates = {};
		if (selectedDay) markedDates[moment(selectedDay.dateString).format("YYYY-MM-DD")] = { selected: true };
		meetings.forEach(meet => {
			const formatDate = moment(meet.startDate).format("YYYY-MM-DD");
			markedDates[formatDate] = {
				...markedDates[formatDate],
				marked: true,
			};
		});
		return markedDates;
	};
	return (
		<View style={styles.container}>
			{state.loading && ModalCxt.state.id === undefined && (
				<View style={styles.loadingtransaprent}>
					<View style={styles.loadingcontainer}>
						<LoadingSpinner color={"#1d2731"} style={styles.loading} />
					</View>
				</View>
			)}
			<Calendar
				current={selectedMonth}
				onMonthChange={month => monthChange(month)}
				markedDates={getMarkesDates(selectedDay, meetings)}
				theme={calendarTheme}
				onDayPress={day => setSelectedDay(day)}
				enableSwipeMonths={true}
			/>
			<CalendarItem selectedDay={selectedDay} meetings={meetings} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1d2731",
	},
	loadingtransaprent: {
		width: Dimensions.get("window").width,
		marginTop: 50,
		height: Dimensions.get("window").height / 2.5,
		alignSelf: "center",
		position: "absolute",
		zIndex: 1,
		justifyContent: "center",
		alignItems: "center",

		backgroundColor: "transparent",
	},
	loadingcontainer: {
		position: "absolute",
		zIndex: 1,
		width: 90,
		bottom: "50%",
		height: 90,
		borderRadius: 45,
		borderColor: "#d9b310",
		borderWidth: 1,
		backgroundColor: "rgba(255,255,255,0.8)",
	},
	loading: {
		zIndex: 1,
		color: "#1d2731",
	},
});

export default UserHistory;
