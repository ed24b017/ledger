import { useState } from "react";
import { verifyotp } from "../api/auth.js";

export default function VerifyOtp() {
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState();

	async function handleSubmit(e) {
		e.preventDefault();

		// so here should be the logic to send the otp to the backend ig.

		try {
			const response = await verifyotp(email, otp);
			console.log("Done, successfully");
			alert(
				"You have been verified, Please login through your credentials now.",
			);
		} catch (e) {
			console.error("Failed at verifying.");
			alert(e.message);
		}

		console.log({ email, otp });
	}

	return (
		<div className="p-6 flex flex-col space-y-6">
			<h1>Verify OTP</h1>
			<form
				action=""
				onSubmit={handleSubmit}
				className="p-6 flex flex-col space-y-6"
			>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<input
					type="otp"
					placeholder="OTP"
					value={otp}
					onChange={(e) => setOtp(e.target.value)}
				/>

				<button type="submit">Enter</button>
			</form>
		</div>
	);
}
