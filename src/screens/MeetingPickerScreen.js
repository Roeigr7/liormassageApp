import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View, ScrollView } from "react-native";
import { Context as BookingContext } from "../context/booking-context";
import { Context as AuthContext } from "../context/auth-context";
import { massageTypes } from "../../utilities/constantArrays";
import StyledButton from "../customStyles/StyledButton";
import moment from "moment";
import { g3 } from "../../utilities/Images";
import { Calendar } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import { calendarTheme } from "../../utilities/calendarTheme";
import WrapperScreen from "../shared/WrapperScreen";
import { hours } from "../../utilities/constantArrays";
import AvailableHours from "../components/AvailableHours";
import CreateMeetPopup from "../components/CreateMeetPopup";
import LoadingSpinner from "../shared/LoadingSpinner";
import PhoneModal from "../modals/PhoneModal";

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
	weekdays: "ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),
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

LocaleConfig.defaultLocale = "he";

const DaysList = () => {
	const [visible, setVisible] = useState(false);
	const scrollRef = useRef(null);
	const [tryMeet, setTryMeet] = useState(false);
	const { state, getAllMeetings, createMeet, cleanMeetings } = useContext(BookingContext);
	const authCxt = useContext(AuthContext);
	const user = authCxt.state;
	const meetings = state.meetings;
	const [selectedDay, setSelectedDay] = useState(false);
	const [selectedHour, setSelectedHour] = useState(false);
	const [avHoursInDay, setAvHoursInDay] = useState([]);
	const [avHoursByType, setAvHoursByType] = useState([]);
	const [massageType, setMassageType] = useState({ key: -1 });
	const [selectedMonth, setSelectedMonth] = useState(moment().toISOString());
	const userNotHavePhoneNumber =
		user.phone === undefined || user.phone === "" || user.phone === false || user.phone === null ? true : false;

	useEffect(() => {
		getAllMeetings(selectedMonth);
		return () => cleanMeetings();
	}, [tryMeet]);
	useEffect(() => {
		massageTypeHandler(massageType);
	}, [selectedDay, massageType]);
	useEffect(() => {
		setAvHoursByType([]);
	}, [tryMeet, selectedMonth]);

	const handleDay = day => {
		setSelectedHour(false);
		setSelectedDay(day);
		const dayMeetings = meetings.filter(meet => meet.startDate.split("T")[0] === day.dateString);

		let availableHours = hours.map(e => ({ ...e }));
		for (let i = 0; i < dayMeetings.length; i++) {
			for (let j = 0; j < hours.length; j++) {
				if (moment(dayMeetings[i].startDate).format("LT") === hours[j].time) {
					availableHours[j].busy = true;
					availableHours[j + 1].busy = true;
					if (dayMeetings[i].massageType === "שוודי" || dayMeetings[i].massageType === "רקמות עמוק") {
						availableHours[j + 2].busy = true;
					}
					break;
				}
			}
		}
		setAvHoursInDay(availableHours);
		setAvHoursByType([]);
	};

	const massageTypeHandler = item => {
		setMassageType(item);
		setSelectedHour(false);
		let mapDateByType = avHoursInDay.map(e => ({ ...e }));

		for (let i = 0; i < avHoursInDay.length; i++) {
			if (i === avHoursInDay.length - 3 && avHoursInDay[i].busy === false && (item.key === 2 || item.key === 3)) {
				mapDateByType[i].busy = true;
			}
			if (i === avHoursInDay.length - 1 || i === avHoursInDay.length - 2) {
				mapDateByType[i].busy = true;
			} else if (avHoursInDay[i].busy === false) {
				if (avHoursInDay[i + 1].busy === true) {
					mapDateByType[i].busy = true;
				} else if ((item.key === 2 || item.key === 3) && avHoursInDay[i + 2].busy === true) {
					mapDateByType[i].busy = true;
				}
			}
		}

		setAvHoursByType(mapDateByType);
	};
	const HandleBooking = async () => {
		await createMeet(user.token, user.userId, massageType, selectedDay, selectedHour.time).then(() => {
			setTryMeet(true);
		});
	};

	const monthChange = month => {
		setSelectedDay(false);
		setSelectedMonth(month.dateString);
		getAllMeetings(month.dateString);
	};
	const handleScroll = () => {
		if (selectedDay) scrollRef.current.scrollToEnd({ duration: 500, animated: true });
		if (!selectedDay) scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
	};
	if (userNotHavePhoneNumber) return <PhoneModal />;

	return (
		<ScrollView
			style={styles.scrollcontainer}
			nestedScrollEnabled={false}
			ref={scrollRef}
			onContentSizeChange={handleScroll}
		>
			<WrapperScreen wrapperContainer={styles.wrappercontainer} headerText={"קבע תור"} image={g3}>
				<View style={styles.typecontainer}>
					<View>
						<Text style={styles.massagetitle}>בחר סוג טיפול</Text>
					</View>
					<FlatList
						showsHorizontalScrollIndicator={false}
						data={massageTypes}
						horizontal={true}
						renderItem={({ item }) => (
							<StyledButton
								key={item.key}
								onPress={() => massageTypeHandler(item)}
								buttonStyle={
									item.key === massageType.key
										? [styles.massagetypebutton, styles.selectedbutton]
										: styles.massagetypebutton
								}
								text={item.massageType}
							/>
						)}
						keyExtractor={item => item.key.toString()}
					/>
				</View>
				{state.loading && !selectedHour && (
					<View style={styles.loadingtransaprent}>
						<View style={styles.loadingcontainer}>
							<LoadingSpinner color={"#1d2731"} style={styles.loading} />
						</View>
					</View>
				)}
				<Calendar
					current={selectedMonth}
					onMonthChange={month => monthChange(month)}
					minDate={new Date()}
					markedDates={{
						[selectedDay.dateString]: {
							selected: true,
							disableTouchEvent: true,
						},
					}}
					theme={calendarTheme}
					onDayPress={day => handleDay(day)}
					style={{ marginTop: 10 }}
				/>
				{selectedDay && (
					<Text style={styles.daytitle}>{moment(selectedDay.dateString).format("יום dddd  DD/MM/YYYY")}</Text>
				)}
				<AvailableHours
					selectedDay={selectedDay}
					avHoursByType={avHoursByType}
					selected={selectedHour}
					selectedMassageType={massageType}
					onPress={item => setSelectedHour(item)}
				/>

				{massageType.key !== -1 && selectedHour && (
					<>
						<StyledButton
							onPress={() => setVisible(true)}
							text={"לקביעת התור"}
							buttonStyle={styles.createbutton}
							textStyle={styles.createbuttontext}
						/>
						<CreateMeetPopup
							visible={visible}
							setVisible={val => setVisible(val)}
							handleHour={item => setSelectedHour(item)}
							date={selectedDay}
							hour={selectedHour}
							massageType={massageType.massageType}
							onPress={HandleBooking}
							tryMeet={tryMeet}
							handleMeet={tryMeet => setTryMeet(tryMeet)}
							handleDate={bool => setSelectedDay(bool)}
						/>
					</>
				)}
			</WrapperScreen>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	scrollcontainer: {
		backgroundColor: "#083c5d",
	},
	typecontainer: {
		borderBottomWidth: 6,
		paddingBottom: 15,
		borderBottomColor: "rgba(0,0,0,0.1)",
	},

	problembutton: {
		marginVertical: 15,
		color: "white",
		minWidth: "50%",
		borderWidth: 1,
		borderColor: "rgba(217, 179, 16,0.3)",
		borderRadius: 6,
		paddingVertical: 4,
	},
	problembuttontext: {
		color: "white",
		textAlign: "center",
		fontSize: 14,
		fontFamily: "heebo",
		fontWeight: "normal",
	},
	daytitle: {
		borderTopWidth: 6,
		borderTopColor: "rgba(0,0,0,0.1)",
		fontSize: 14,
		paddingTop: 15,
		paddingBottom: 3,
		color: "white",
		textAlign: "center",
	},
	massagetitle: {
		marginVertical: 10,
		fontFamily: "heebo",
		fontSize: 18,
		alignSelf: "center",
		color: "white",
	},
	selectedbutton: {
		backgroundColor: "#d9b310",
	},
	massagetypebutton: {
		backgroundColor: "transparent",
		borderColor: "#d9b310",
		borderWidth: 0.5,
		elevation: 0,
		marginHorizontal: 5,
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
	loadingtransaprent: {
		width: Dimensions.get("window").width,
		top: "50%",
		height: Dimensions.get("window").height / 2.5,
		alignSelf: "center",
		position: "absolute",
		zIndex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent",
	},
	wrappercontainer: {
		paddingBottom: 0,
		margin: 0,
		minHeight: 0,
		backgroundColor: "red",
	},
	createbutton: {
		marginVertical: 15,
		minWidth: Dimensions.get("window").width * 0.8,
		padding: 8,
		backgroundColor: "#d9b310",

		borderRadius: 6,
	},
	createbuttontext: {
		fontFamily: "heeboBold",
		fontSize: 18,
	},
});

export default DaysList;
