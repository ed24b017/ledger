import { useNavigate } from "react-router-dom";
import TextType from "../components/TextType";
import Aurora from "../components/Aurora";

function Home() {
	const navigate = useNavigate();

	function goToSignup() {
		navigate("/signup");
	}

	function goToLogin() {
		navigate("/login");
	}

	return (
		<div className="relative h-screen w-screen overflow-hidden bg-black">
			{/* Aurora background - full page */}
			<div className="fixed inset-0 z-0">
				<Aurora
					colorStops={["#7cff67", "#B19EEF", "#5227FF"]}
					blend={0.5}
					amplitude={1.0}
					speed={1}
				/>
			</div>

			{/* Content - centered on top of Aurora */}
			<div className="relative z-10 h-full w-full flex items-center justify-center">
				<div className="p-6 flex flex-col space-y-8 max-w-md w-full rounded-2xl">
					<h1 className="text-white text-4xl font-bold">
						<TextType
							text={["Ledger"]}
							typingSpeed={100}
							pauseDuration={3000}
							showCursor
							cursorCharacter="_"
							deletingSpeed={100}
							cursorBlinkDuration={1}
						/>
					</h1>
					<p className="text-sm text-gray-300">
						Academic obligations, recorded.
					</p>
					<button
						className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition"
						onClick={goToSignup}
					>
						Sign Up
					</button>
					<button
						className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition"
						onClick={goToLogin}
					>
						Login
					</button>
				</div>
			</div>
		</div>
	);
}

export default Home;
