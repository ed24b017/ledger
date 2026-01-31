import { useNavigate } from "react-router-dom";

function Home() {
	const navigate = useNavigate();

	function goToSignup() {
		navigate("/signup");
	}

	function goToLogin() {
		navigate("/login");
	}

	return (
		<>
			<div className="p-6 flex flex-col space-y-6">
				<h1 className="text-xl font-semibold">Ledger</h1>
				<p className="text-sm text-gray-600">
					Academic obligations, recorded.
				</p>
				<button title="Sign Up" onClick={goToSignup}>
					Sign Up
				</button>
				<button title="Sign Up" onClick={goToLogin}>
					Login
				</button>
			</div>
		</>
	);
}

export default Home;
