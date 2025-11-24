import LogoTradimedika from "./components/LogoTradimedika";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { PiPlantFill } from "react-icons/pi";

const Footer = () => {
	return (
		<footer
			className="
				flex flex-col
				w-full
				text-dark
				bg-neutral-100
				py-8 justify-center items-center
			"
		>
			{/* Logo */}
			<div className="mb-4">
				<PiPlantFill className="text-3xl text-accent lg:text-4xl" />
			</div>

			{/* Links */}
			<div
				className="
					flex flex-col
					text-center text-xs
					mb-4 gap-2 decoration-1
					lg:flex-row lg:text-start lg:gap-6
				"
			>
				<a
					href="/mention-legales"
					rel="noopener noreferrer"
					className="
						font-semibold
						transition-colors
						underline underline-offset-2 hover:text-accent duration-200
					"
				>
					Mentions Légales
				</a>
				<a
					href="/privacy-policy"
					rel="noopener noreferrer"
					className="
						font-semibold
						transition-colors
						underline underline-offset-2 hover:text-accent duration-200
					"
				>
					Politique de Confidentialité
				</a>
			</div>

			{/* Copyright */}
			<p className="text-xs text-gray-600">
				© 2026 - Tous droits réservés - Site Français 🟦​⬜​🟥​
			</p>
		</footer>
	);
};

export default Footer;
