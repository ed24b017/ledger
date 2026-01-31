import bcrypt from "bcrypt";
import signupService from "../services/signupService.js";
import verifyOtpService from "../services/verifyOtpService.js";
import userModel from "../models/userModel.js";

async function signup(req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json({ error: "Email and Password are required" });
	}

	const passwordHash = await bcrypt.hash(password, 10);

	try {
		await signupService.signup(email, passwordHash);
		return res
			.status(201)
			.json({ message: "OTP sent to mail successfully" });
	} catch (err) {
		if ((err.name = "SignupError")) {
			return res.status(409).json({ error: err.message });
		}
		return res.status(500).json({ error: "Internal server error" });
	}
}

async function verifyOtp(req, res) {
	const { email, otp } = req.body;
	if (!email || !otp) {
		return res.status(400).json({ error: "Email and OTP are required" });
	}
	try {
		verifyOtpService.verifyOtp(email, otp);
		return res.status(200).json({ message: "Successfully Verified." });
	} catch (err) {
		if (err.name == "OtpVerificationError") {
			return res.status(400).json({ error: err.message });
		}
		return res.status(500).json({ error: "Internal server error" });
	}
}

async function login(req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json({ error: "Email and Password is required." });
	}

	const user = userModel.findByEmail(email);

	if (!user) {
		return res.status(401).json({ error: "User not found." });
	}

	const isValid = await bcrypt.compare(password, user.passwordHash);
	if (!isValid) {
		return res.status(401).json({ error: "Invalid credentials" });
	}

	return res.status(200).json({ message: "Login successful" });
}

export default {
	signup,
	login,
	verifyOtp,
};
