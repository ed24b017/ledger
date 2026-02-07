import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";

function App() {
	return (
		<BrowserRouter>
			<div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/landing" element={<Landing />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/verify-otp" element={<VerifyOtp />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
