const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const meetingSchema = new mongoose.Schema({
	massageType: {
		type: String,
		enum: ["נשימות", "תאילנדי", "שוודי", "רקמות עמוק"],
		required: "Massage type is required",
	},
	startDate: {
		type: Date,
		required: "date is required",
	},
	endDate: {
		type: Date,
		required: "date is required",
	},

	determinedBy: {
		type: ObjectId,
		ref: "User",
	},
	created: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model("Meeting", meetingSchema);
