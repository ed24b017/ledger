import { useState } from "react";

function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		console.log({ email, password });
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

				<button type="submit"> Sign Up</button>
			</form>
		</div>
	);
}

export default Signup;
