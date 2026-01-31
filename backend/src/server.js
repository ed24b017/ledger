import "dotenv/config";
console.log("Environment check:");
console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);
console.log("SMTP_USER:", process.env.SMTP_USER);

import app from "./app.js";
import { log } from "console";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log("Server started running.");
});
