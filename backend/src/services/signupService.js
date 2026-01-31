import userModel from "../models/userModel.js";
import emailVerificationModel from "../models/emailVerificationModel.js";
import otpService from "./otpService.js";
import emailService from "./emailService.js";

class SignupError extends Error {
	constructor(message) {
		super(message);
		this.name = "SignupError";
	}
}

async function signup(email, passwordHash) {
	// This is for checking if a user already exists in the final users database.

	const existingUser = userModel.findByEmail(email);
	if (existingUser) {
		throw new SignupError("User Already Exists");
	}

	emailVerificationModel.deleteVerificationByEmail(email);

	const otp = otpService.generateOTP();
	const otpHash = otpService.hashOTP(otp);

	const expiresAt = otpService.getExpiryTimestamp();

	emailVerificationModel.createVerification(
		email,
		passwordHash,
		otpHash,
		expiresAt,
	);

	// Now, we have created a record in the email_verification table.
	// Now, we need to send the mail and await for the otp.

	try {
		await emailService.sendOTPEmail(email, otp);
	} catch (err) {
		emailVerificationModel.deleteVerificationByEmail(email);
		throw new SignupError("Failed to Send Verification Mail");
	}

	return;
}

export default {
	signup,
	SignupError,
};
