import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth.js";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const response = await login(email, password);
			console.log("Login Done.", response);
			navigate("/landing");
		} catch (e) {
			console.error("Login Failed");
			alert(e.message);
		}

		console.log({ email, password });
	}

	return (
		<div className="p-6 flex flex-col space-y-6">
			<h1>Login</h1>
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

				<button type="submit"> Login </button>
			</form>
		</div>
	);
}

export default Login;
