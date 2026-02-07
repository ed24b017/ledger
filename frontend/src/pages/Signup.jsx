import { useState } from "react";
import { signup } from "../api/auth.js";
import { useNavigate } from "react-router-dom";

function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		console.log({ email, password });

		try {
			const response = await signup(email, password);
			console.log("Done, Successful.", response);
			alert("OTP has been successfully sent to you email.");
			navigate("/verify-otp");
		} catch (e) {
			console.error("Sign up Failed");
			alert(e.message);
		}
	}
	return (
		<div className="p-6 flex flex-col space-y-6">
			<h1>Sign Up</h1>
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
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default Signup;
