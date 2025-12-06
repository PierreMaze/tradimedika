// tradimedika-v1/src/layout/components/LogoTradimedika.jsx
import { PiPlantFill } from "react-icons/pi";

const LogoTradimedika = () => {
  return (
    <>
      <a
        href="/tradimedika/"
        alt="Logo Tradimedika"
        title="Logo Tradimedika"
        aria-label="Logo Tradimedika"
        className="flex items-center gap-2"
      >
        <span>
          <PiPlantFill className="text-3xl text-emerald-600 transition duration-300 ease-in-out lg:text-4xl dark:text-emerald-500" />
        </span>
        <span className="text-dark dark:text-light text-2xl font-black tracking-wide transition duration-300 ease-in-out lg:text-3xl 2xl:text-4xl">
          TRADIMEDIKA
        </span>
      </a>
    </>
  );
};
export default LogoTradimedika;
