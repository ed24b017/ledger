import userModel from "../models/userModel";
import emailVerificationModel from "../models/emailVerificationModel";
import otpService from "../services/otpService";

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

	const isValid = otpService.verifyOTP(userOtp, record.otp_hash);
	if (!isValid) {
		throw new OtpVerificationError("Invalid OTP");
	}
	userModel.createUser(record.email, record.password_hash);
	emailVerificationModel.deleteVerificationById(record.id);

	return;
}

export default {
	verifyOtp,
	OtpVerificationError,
};
