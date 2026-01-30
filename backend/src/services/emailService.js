import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	secure: false,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

async function sendOTPEmail(toEmail, otp) {
	const mailOption = {
		from: process.env.SMTP_FROM,
		to: toEmail,
		subject: "Verify you email : Ledger",
		text: `Your verification code is ${otp} \n This code expires in 15 minutes. Use it fast!!!`,
	};

	try {
		await transporter.sendMail(mailOption);
	} catch (err) {
		throw new Error("Failed to send OTP");
	}
}

export default {
	sendOTPEmail,
};
