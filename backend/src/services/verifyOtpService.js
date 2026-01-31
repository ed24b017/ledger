import userModel from "../models/userModel.js";
import emailVerificationModel from "../models/emailVerificationModel.js";
import otpService from "./otpService.js";

class OtpVerificationError extends Error {
	constructor(message) {
		super(message);
		this.name = "OtpVerificationError";
	}
}

function verifyOtp(email, userOtp) {
	const record = emailVerificationModel.findVerificationByEmail(email);

	if (!record) {
		throw new OtpVerificationError("Pending Verification not found!!!");
	}

	if (otpService.isExpired(record.expires_at)) {
		emailVerificationModel.deleteVerificationByEmail(record.id);
		throw new OtpVerificationError("Otp expired");
	}

	const isValid = otpService.verifyOTP(userOtp, record.otpHash);
	if (!isValid) {
		throw new OtpVerificationError("Invalid OTP");
	}
	userModel.createUser(record.email, record.passwordHash);
	emailVerificationModel.deleteVerificationById(record.id);

	return;
}

export default {
	verifyOtp,
	OtpVerificationError,
};
