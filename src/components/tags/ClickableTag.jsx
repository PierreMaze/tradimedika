// tradimedika/src/components/tags/ClickableTag.jsx

import PropTypes from "prop-types";
import { useRef } from "react";

/**
 * ClickableTag Component (HOC Wrapper)
 *
 * Wrapper qui rend un tag cliquable et ouvre le popover d'accordéons.
 *
 * Props:
 * - children: Tag à rendre cliquable (ProuvedTag, PregnancyTag, etc.)
 * - categoryId: ID de la catégorie à ouvrir ("usages" | "grossesse" | "enfants")
 * - popoverRef: Ref vers TagsAccordionPopover
 * - className: Classes CSS additionnelles
 *
 * Comportement:
 * - Clic ou Enter/Space → Ouvre le popover avec la section correspondante
 * - Animation hover/active pour feedback visuel
 * - Focus visible pour accessibilité
 *
 * Accessibilité:
 * - aria-haspopup="dialog" : Indique qu'un dialog s'ouvrira
 * - aria-label descriptif
 * - tabIndex={0} : Navigation clavier
 * - Focus visible avec outline emerald
 */
function ClickableTag({ children, categoryId, popoverRef, className = "" }) {
  const buttonRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (popoverRef.current) {
      popoverRef.current.open(categoryId, buttonRef.current);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      if (popoverRef.current) {
        popoverRef.current.open(categoryId, buttonRef.current);
      }
    }
  };

  const categoryLabels = {
    usages: "Type d'usages",
    grossesse: "Sécurité pendant la grossesse",
    enfants: "Limite d'âge",
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-haspopup="dialog"
      aria-label={`Voir les détails - ${categoryLabels[categoryId]}`}
      className={`cursor-pointer transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 active:scale-95 ${className}`}
      tabIndex={0}
    >
      {children}
    </button>
  );
}

ClickableTag.propTypes = {
  children: PropTypes.node.isRequired,
  categoryId: PropTypes.oneOf(["usages", "grossesse", "enfants"]).isRequired,
  popoverRef: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default ClickableTag;
