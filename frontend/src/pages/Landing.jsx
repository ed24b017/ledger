import Sidebar from "../components/SideBar";

function Landing() {
	return (
		// this is the main container which holds everything. I am using comments to name these
		// containers.
		<div className="bg-black w-screen min-h-screen flex flex-col">
			{/* Next div is going to be the greeting. */}
			<Sidebar></Sidebar>
		</div>
	);
}

// Theme is floating, so all the ui is going to be floating on the screen like on water.
// But they are going to be fixed in some place.i

// right now, let's focus on getting everything into their places shall we?

export default Landing;
