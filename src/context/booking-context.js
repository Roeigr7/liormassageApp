import createDataContext from "./createDataContext";
import moment from "moment";
import indexApi from "../../api/index";
import _ from "lodash";

const BookingReducer = (state, action) => {
	switch (action.type) {
		case "user_meetings":
			return {
				...state,
				userMeetings: action.payload,
			};
		case "remove_user_meet":
			return {
				...state,
				meetings: [...state.meetings.filter(meet => meet._id !== action.payload)],
			};

		case "get_meetings":
			return {
				...state,
				meetings: action.payload,
			};
		case "get_week_meetings":
			return {
				...state,
				weekMeetings: action.payload,
			};
		case "message":
			return {
				...state,
				message: {
					content: action.payload.content,
					type: action.payload.type,
				},
			};
		case "loading":
			return { ...state, loading: action.payload };
		case "clean":
			return { ...state, meetings: [] };

		default:
			return state;
	}
};
const formatEndDate = (date, key) => {
	if (key === 2 || key === 3) return moment(date).add({ hours: 1, minutes: 30 });
	return moment(date).add({ hours: 1, minutes: 0 });
};

export const cleanMeetings = dispatch => () => {
	dispatch({ type: "clean" });
};

export const createMeet = dispatch => async (token, userId, selectedMassageType, selectedDay, selectedHour) => {
	const startDate = selectedDay.dateString.concat(" ").concat(selectedHour);

	dispatch({ type: "loading", payload: true });
	const selectedStartDateDbFormatted = moment(startDate).toISOString();
	const selectedEndDateDbFormatted = formatEndDate(selectedStartDateDbFormatted, selectedMassageType.key);

	if (token) {
		try {
			const response = await indexApi.post(
				`/meeting/new/${userId}`,
				{
					massageType: selectedMassageType.massageType,
					startDate: selectedStartDateDbFormatted,
					endDate: selectedEndDateDbFormatted,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			dispatch({
				type: "message",
				payload: { type: "success", content: response.data.message || "הבקשה עברה בהצלחה" },
			});
			dispatch({ type: "loading", payload: false });
		} catch (err) {
			dispatch({
				type: "message",
				payload: { type: "error", content: err.response.data.error || "ישנה בעיה בתקשורת" },
			});
			dispatch({ type: "loading", payload: false });
		}
	}
};

////////GET ALL MEETINGS////////
const getAllMeetings = dispatch => async date => {
	dispatch({ type: "loading", payload: true });

	try {
		const response = await indexApi.post(`/meetings`, {
			params: {
				date: date,
			},
		});

		dispatch({
			type: "get_meetings",
			payload: response.data,
		});
		dispatch({ type: "loading", payload: false });
	} catch (err) {
		dispatch({
			type: "message",
			payload: { type: "error", content: err.response.data.error || "ישנה בעיה בתקשורת" },
		});
		dispatch({ type: "loading", payload: false });
	}
};
//////GET USER MEETINGS//////
export const getUserMeetings = dispatch => async (token, userId) => {
	dispatch({ type: "loading", payload: true });
	if (token) {
		try {
			const response = await indexApi.get(`/meeting/by/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			dispatch({
				type: "get_meetings",
				payload: response.data,
			});
			dispatch({ type: "loading", payload: false });
		} catch (err) {
			dispatch({
				type: "message",
				payload: { type: "error", content: err.response.data.error || "ישנה בעיה בתקשורת" },
			});
			dispatch({ type: "loading", payload: false });
		}
	} else {
		dispatch({ type: "message", payload: { type: "error", content: err.response.data.error || "אינך מורשה" } });
		dispatch({ type: "loading", payload: false });
	}
};

//////GET NEXT MEET BY USER//////
export const getNextMeet = dispatch => async (token, userId) => {
	dispatch({ type: "loading", payload: true });
	if (token) {
		try {
			const response = await indexApi.get(`/nextMeet/by/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			dispatch({
				type: "user_meetings",
				payload: response.data,
			});
			dispatch({ type: "loading", payload: false });
		} catch (err) {
			dispatch({
				type: "message",
				payload: { type: "error", content: err.response.data.error || "ישנה בעיה בתקשורת" },
			});
			dispatch({ type: "loading", payload: false });
		}
	} else {
		dispatch({ type: "message", payload: { type: "error", content: "אינך מורשה" } });
		dispatch({ type: "loading", payload: false });
	}
};

//////CANCEL USER MEET//////
export const cancelUserMeet = dispatch => async (token, meetId) => {
	dispatch({ type: "loading", payload: true });

	try {
		const response = await indexApi.delete(
			`/meeting/${meetId}`,

			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		dispatch({ type: "message", payload: { type: "success", content: response.data.message || "הבקשה עברה בהצלחה" } });
		dispatch({ type: "remove_user_meet", payload: meetId });
		dispatch({ type: "loading", payload: false });
	} catch (err) {
		dispatch({ type: "loading", payload: false });
		dispatch({ type: "message", payload: { type: "error", content: err.response.data.error || "ישנה בעיה בתקשורת" } });
	}
};

export const { Context, Provider } = createDataContext(
	BookingReducer,
	{ getAllMeetings, getUserMeetings, createMeet, cancelUserMeet, getNextMeet, cleanMeetings },
	{
		meetings: [],
		message: { content: "", type: "" },
		userMeetings: [],
		loading: false,
	}
);
