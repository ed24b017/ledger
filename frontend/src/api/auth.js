import { API_BASE } from "../config/api.js";

export async function signup(email, password) {
	// so, this is the orchestration function. We will try to bridge the gap between
	// the front end and the back end using this function only.
	const response = await fetch(`${API_BASE}/api/auth/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(
			data.message || "Sign Up failed due to unknown reasons.",
		);
	}

	return data;
}

export async function verifyotp(email, otp) {
	// this is the main bridge between backend and frontend. Let's build something meaningful.

	const response = await fetch(`${API_BASE}/api/auth/verify-otp`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, otp }),
	});

	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message || "Wrong OTP, check again");
	}

	return data;
}

export async function login(email, password) {
	const response = await fetch(`${API_BASE}/api/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});

	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message || "Wrong Creds, try again maybe.");
	}

	return data;
}
