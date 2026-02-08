import { CiMenuFries } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa";
import { TbCookieManFilled } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";

export const SideBarIcon = ({ icon }) => (
	<div className="sidebar-icon">{icon}</div>
);

function Sidebar() {
	return (
		<div className="fixed left-0 top-0 flex flex-col min-h-screen w-16 bg-gray-950 justify-between">
			<SideBarIcon icon={<CiMenuFries size={28} />}></SideBarIcon>
			<div>
				<SideBarIcon icon={<MdEmail size={28} />}></SideBarIcon>
				<SideBarIcon icon={<FaAddressBook size={28} />}></SideBarIcon>
				<SideBarIcon
					icon={<TbCookieManFilled size={28} />}
				></SideBarIcon>
			</div>
			<SideBarIcon icon={<IoMdSettings size={28} />}></SideBarIcon>
		</div>
	);
}

// export Sidebar;
