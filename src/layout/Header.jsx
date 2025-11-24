import { motion } from "framer-motion";
import DarkModeToggle from "../components/btn/DarkModeToggle";
import LogoTradimedika from "./components/LogoTradimedika";

export default function Header() {
	return (
		<header
			className="
				flex
				w-full h-20
				border-b-2 border-dashed
				px-6 items-center justify-between
				lg:w-2/3
			"
		>
			<LogoTradimedika />
			<DarkModeToggle />
		</header>
	);
}
