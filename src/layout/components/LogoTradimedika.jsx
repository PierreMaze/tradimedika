import { PiPlantFill } from "react-icons/pi";

export default function LogoTradimedika() {
	return (
		<>
			<a
				href="/"
				alt="Logo Tradimedika"
				title="Logo Tradimedika"
				aria-label="Logo Tradimedika"
				className="flex self-center gap-2"
			>
				<span>
					<PiPlantFill className="text-3xl text-accent lg:text-4xl" />
				</span>
				<span className="text-2xl font-black lg:text-3xl">TRADIMEDIKA</span>
			</a>
		</>
	);
}
