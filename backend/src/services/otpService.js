import crypto from "crypto";

const OTP_LENGTH = 6;
const OTP_EXPIRY_MINUTES = 15;

function generateOTP() {
	const max = Math.pow(10, OTP_LENGTH);
	const otp = crypto.randomInt(0, max);
	return otp.toString().padStart(OTP_LENGTH, "0");
}

function hashOTP(otp) {
	return crypto.createHash("sha256").update(otp).digest("hex");
}

function verifyOTP(inputOTP, storedOTPHash) {
	const inputHash = hashOTP(inputOTP);
	return inputHash == storedOTPHash;
}

function getExpiryTimestamp() {
	const now = new Date();
	now.setMinutes(now.getMinutes() + OTP_EXPIRY_MINUTES);
	return now.toISOString();
}

function isExpired(expiresAt) {
	return new Date() > new Date(expiresAt);
}

export default {
	generateOTP,
	hashOTP,
	verifyOTP,
	getExpiryTimestamp,
	isExpired,
};
