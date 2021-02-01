import { t1, t2, t3, t4, s1, s2, s3, s4, r1, r2, r3, r4, n1, n2, n3, g5, g1, g8, g9 } from "./Images";
/////////////HOURS ARRAY///////////////
const halfHours = ["00", "30"];
export const hours = [];
let key = 0;
for (let i = 10; i < 21; i++) {
	for (let j = 0; j < 2; j++) {
		const time = i + ":" + halfHours[j];
		if (i < 10) {
			time = "0" + time;
		}

		hours.push({
			key: key,
			busy: false,
			time: time,
		});
		key++;
	}
}

//////MASSAGE TYPE ARRAY/////////
export const massageTypes = [
	{ massageType: "נשימות", key: 0 },
	{ massageType: "תאילנדי", key: 1 },
	{ massageType: "שוודי", key: 2 },
	{ massageType: "רקמות עמוק", key: 3 },
];

export const aboutImages = [
	{
		img: [s1, s2, s3, s4],
		desc: "עיסוי שוודי לשחרור הגוף",
	},
	{
		img: [t1, t2, t3, t4],
		desc: "עיסוי תאילנדי לשחרור כאבי מפרקים",
	},
	{
		img: [n1, n2, n3],
		desc: "תרגול נשימות, שחרור הנפש והתבוננות",
	},
	{
		img: [r1, r2, r3, r4],
		desc: "עיסוי רקמות עמוק לטיפול בבעיות כרוניות ועוד",
	},
];

//main background images//
export const mainImages = [g8, g9, g5, g1, s3];

//profile accordion
export const profileChangeArr = [
	{ title: "שנה שם", icon: "male" },
	{ title: "שנה טלפון", icon: "phone" },
	{ title: "שנה סיסמא", icon: "key" },
];

export const profileDetailsArr = [
	{ title: "שם: ", icon: "male" },
	{ title: "טלפון: ", icon: "phone" },
	{ title: "מייל: ", icon: "envelope" },
];
