// tradimedika-v1/src/layout/components/LogoTradimedika.jsx
import { PiPlantFill } from "react-icons/pi";
import { useTheme } from "../../context/ThemeContext";

const LogoTradimedika = () => {
  const { isDarkMode } = useTheme();
  return (
    <>
      <a
        href="/"
        alt="Logo Tradimedika"
        title="Logo Tradimedika"
        aria-label="Logo Tradimedika"
        className="flex items-center gap-2"
      >
        <span>
          <PiPlantFill
            className={`transition duration-300 ease-in-out ${isDarkMode ? "text-emerald-500" : "text-emerald-600"} text-3xl lg:text-4xl`}
          />
        </span>
        <span
          className={`text-2xl font-black tracking-wide transition duration-300 ease-in-out lg:text-3xl 2xl:text-4xl ${isDarkMode ? "text-light" : "text-dark"}`}
        >
          TRADIMEDIKA
        </span>
      </a>
    </>
  );
};
export default LogoTradimedika;
