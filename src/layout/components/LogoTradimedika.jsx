// tradimedika-v1/src/layout/components/LogoTradimedika.jsx
import { GiFallingLeaf } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useAuth } from "../../features/auth";

const LogoTradimedika = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Link
        to={isAuthenticated ? "/dashboard" : "/"}
        title="Logo Tradimedika"
        aria-label="Logo Tradimedika"
        className="flex items-center gap-2"
      >
        <span>
          <GiFallingLeaf className="rotate-90 rotate-x-180 text-xl text-emerald-600 transition duration-300 ease-in-out lg:text-3xl dark:text-emerald-500" />
        </span>
        <span className="text-dark dark:text-light text-2xl font-black tracking-wide transition duration-300 ease-in-out lg:text-3xl 2xl:text-4xl">
          TRADIMEDIKA
        </span>
      </Link>
    </>
  );
};
export default LogoTradimedika;
