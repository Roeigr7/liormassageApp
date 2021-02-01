const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URI;
//db
mongoose.connect(mongoURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on("error", err => {
	console.log(`DB Connection error: ${err.message}`);
});
//bring in routes
const meetingsRoutes = require("./routes/meeting");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//apiDocs
app.get("/", (req, res) => {
	fs.readFile("docs/apiDocs.json", (err, data) => {
		if (err) {
			res.status(400).json({
				error: err,
			});
		}
		const docs = JSON.parse(data);
		res.json(docs);
	});
});
//middleware
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/", meetingsRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);

app.use(function (err, req, res, next) {
	if (err.name === "UnauthorizedError") {
		res.status(402).json({ error: "לא מורשה לבצע פעולה זו" });
	}
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
