// tradimedika-v1/src/components/tag/ProuvedTag.jsx

import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import PropTypes from "prop-types";
import { Tooltip } from "../ui/tooltip";

/**
 * ProuvedTag Component
 *
 * Tag indiquant qu'&apos';un remède a été approuvé par un professionnel de santé.
 * Utilise HiMiniShieldCheck de react-icons/hi2 pour cohérence visuelle.
 *
 * Props:
 * - className: Classes CSS additionnelles
 * - size: Taille de l'icône ('sm' = h-4 w-4, 'md' = h-5 w-5)
 * - showLabel: Afficher le texte "Prouvé" (défaut: true)
 */

function ProuvedTag({ className = "", showLabel = true }) {
  const tooltipContent = (
    <>
      <h3 className="mb-1 text-lg font-semibold text-neutral-900 dark:text-white">
        Lorem
      </h3>
      <p className="text-sm text-neutral-900 dark:text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit possimus
        repellendus tempora voluptatem
      </p>
    </>
  );

  return (
    <Tooltip content={tooltipContent} placement="top" hoverDelay={200}>
      <span
        data-testid="verified-tag"
        className={`transition-color inline-flex items-center gap-1.5 rounded-md bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-800 duration-150 lg:text-sm 2xl:text-base dark:bg-green-900 dark:text-green-200 ${className}`}
      >
        <IoMdCheckmarkCircleOutline
          className="h-4 w-4 lg:h-5 lg:w-5"
          aria-hidden="true"
        />
        {showLabel && "Lorem"}
      </span>
    </Tooltip>
  );
}

ProuvedTag.propTypes = {
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

export default ProuvedTag;
