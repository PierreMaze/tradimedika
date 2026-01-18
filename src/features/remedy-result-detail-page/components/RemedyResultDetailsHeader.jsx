import { motion } from "framer-motion";
import PropTypes from "prop-types";
import {
  ChildrenAgeTag,
  PregnancyTag,
  VerifiedTag,
} from "../../../components/tags";

function RemedyResultDetailsHeader({ remedy, safeImageUrl }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mb-6 grid gap-6 lg:mb-8 lg:grid-cols-5 lg:gap-8"
    >
      <div className="lg:col-span-2 2xl:col-span-1">
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-neutral-300 shadow-md dark:bg-neutral-700">
          <motion.img
            src={safeImageUrl}
            alt={`Illustration de ${remedy.name}`}
            className="mx-auto h-full w-2/3 object-scale-down p-6 lg:w-3/4 2xl:w-4/5"
            loading="lazy"
          />
        </div>
      </div>

      <div className="lg:col-span-3">
        <h1 className="mb-3 text-3xl font-bold lg:text-4xl">{remedy.name}</h1>

        <p className="mb-6 text-sm leading-relaxed text-neutral-600 lg:text-base 2xl:text-lg dark:text-neutral-400">
          {remedy.description}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <span
            className={`shrink-0 rounded-md bg-neutral-200 px-3 py-1.5 text-xs font-semibold tracking-wide text-black uppercase lg:text-sm 2xl:text-base dark:bg-neutral-600 dark:text-white`}
          >
            {remedy.type}
          </span>

          {remedy.verifiedByProfessional && <VerifiedTag />}

          {remedy.pregnancySafe === true && <PregnancyTag />}

          {remedy.childrenAge !== null && (
            <ChildrenAgeTag age={remedy.childrenAge} />
          )}
        </div>
      </div>
    </motion.div>
  );
}

RemedyResultDetailsHeader.propTypes = {
  remedy: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string,
    verifiedByProfessional: PropTypes.bool,
    pregnancySafe: PropTypes.bool,
    childrenAge: PropTypes.number,
  }).isRequired,
  safeImageUrl: PropTypes.string.isRequired,
  typeColors: PropTypes.object.isRequired,
};

export default RemedyResultDetailsHeader;
