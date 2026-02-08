import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth.js";
import FloatingLines from "../components/FloatingLines";
import TextType from "../components/TextType";

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
		<div className="relative h-screen w-screen overflow-hidden bg-black">
			{/* Aurora background - full page */}
			<div className="fixed inset-0 z-0 opacity-40">
				<FloatingLines
					enabledWaves={["top", "middle", "bottom"]}
					// Array - specify line count per wave; Number - same count for all waves
					lineCount={5}
					// Array - specify line distance per wave; Number - same distance for all waves
					lineDistance={5}
					bendRadius={5}
					bendStrength={-0.2}
					interactive={true}
					parallax={true}
				/>
			</div>
			<div className="relative z-10 h-full w-full flex items-center justify-center">
				<div className="p-6 flex flex-col space-y-8 max-w-md w-full rounded-2xl">
					<h1 className="text-white text-4xl">
						<TextType
							text={["Login"]}
							typingSpeed={100}
							pauseDuration={3000}
							showCursor
							cursorCharacter="_"
							deletingSpeed={100}
							cursorBlinkDuration={1}
						/>
					</h1>
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
			</div>
		</div>
	);
}

export default Login;
