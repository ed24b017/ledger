import { API_BASE } from "../config/api";

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
