// tradimedika/src/components/ui/helper/TagsInfoContent.jsx

import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import {
  ChildrenAgeTag,
  PregnancyTag,
  ProuvedTag,
  TraditionnalTag,
} from "../../tags";

/**
 * TagsInfoContent Component
 *
 * Affiche l'explication des tags organisée par catégories avec accordéons.
 * Structure similaire au FilterModal pour cohérence UX.
 *
 * Props:
 * - variant: 'compact' | 'full' (défaut: 'full')
 * - className: Classes CSS additionnelles
 */

// Configuration des catégories de tags
const TAGS_CATEGORIES = [
  {
    id: "usages",
    label: "Type d'usages",
    options: [
      {
        id: "recognized",
        tag: <ProuvedTag />,
        description:
          "Ce remède est soutenu par des données scientifiques et/ou par des professionnels de santé dans un cadre d'usage défini.",
      },
      {
        id: "traditionnel",
        tag: <TraditionnalTag />,
        description:
          "Ce remède repose principalement sur un usage traditionnel. Son efficacité n'est pas soutenu par des études scientifiques solides.",
      },
    ],
  },
  {
    id: "grossesse",
    label: "Sécurité pendant la grossesse",
    options: [
      {
        id: "grossesse-ok",
        tag: <PregnancyTag variant="ok" />,
        description:
          "L'usage de ce remède est considéré comme compatible avec la grossesse aux doses indiquées.",
      },
      {
        id: "grossesse-variant",
        tag: <PregnancyTag variant="variant" />,
        description:
          "Données insuffisantes ou usage conditionnel. Consulter un professionnel de santé avant utilisation pendant la grossesse.",
      },
      {
        id: "grossesse-interdit",
        tag: <PregnancyTag variant="interdit" />,
        description:
          "Ce remède est contre-indiqué pendant la grossesse. Ne pas utiliser.",
      },
    ],
  },
  {
    id: "enfants",
    label: "Limite d'âge",
    options: [
      {
        id: "tous-ages",
        tag: <ChildrenAgeTag age={null} />,
        description:
          "Ce remède peut être utilisé chez l'enfant sans limite d'âge, dans le respect des doses recommandées.",
      },
      {
        id: "age-minimum",
        tag: <ChildrenAgeTag age={6} />,
        description:
          "Ce remède peut être utilisé chez l'enfant à partir de 6 ans (exemple), dans le respect des doses recommandées.",
      },
      {
        id: "adulte-uniqument",
        tag: <ChildrenAgeTag age={18} />,
        description:
          "Ce remède est utilisé uniquement par des adultes et ne doit pas être utilisé chez l'enfant, dans le respect des doses recommandées.",
      },
    ],
  },
];

/**
 * TagsCategoryAccordion Component
 *
 * Accordéon pour une catégorie de tags (mode contrôlé)
 */
function TagsCategoryAccordion({ category, isOpen, onToggle }) {
  const handleHeaderClick = (e) => {
    e.stopPropagation();
    onToggle?.(category.id);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      onToggle?.(category.id);
    }
  };

  return (
    <div className="border-b-2 border-dashed border-emerald-200 last:border-b-0 dark:border-emerald-700">
      <button
        onClick={handleHeaderClick}
        onKeyDown={handleKeyDown}
        className="flex w-full cursor-pointer items-center justify-between py-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
        aria-expanded={isOpen}
        aria-controls={`tags-category-${category.id}`}
        tabIndex={0}
      >
        <span className="text-lg font-semibold text-black lg:text-xl dark:text-white">
          {category.label}
        </span>
        {isOpen ? (
          <HiChevronUp
            className="mx-2 h-5 w-5 text-neutral-500"
            aria-hidden="true"
          />
        ) : (
          <HiChevronDown
            className="mx-2 h-5 w-5 text-neutral-500"
            aria-hidden="true"
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`tags-category-${category.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pb-4">
              {category.options.map((option) => (
                <div
                  key={option.id}
                  className="grid grid-cols-1 gap-3 rounded-md p-2 transition-colors lg:grid-cols-3"
                >
                  <div className="flex h-8 shrink-0 lg:col-span-1">
                    {option.tag}
                  </div>
                  <p className="text-sm leading-relaxed text-neutral-900 lg:col-span-2 dark:text-neutral-100">
                    {option.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

TagsCategoryAccordion.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        tag: PropTypes.element.isRequired,
        description: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func,
};

/**
 * TagsInfoContent Component (Main)
 */
function TagsInfoContent({
  variant = "full",
  className = "",
  openAccordionIds = undefined,
  onAccordionToggle = null,
  defaultOpenFirst = true,
}) {
  const isControlled =
    openAccordionIds !== undefined && onAccordionToggle !== null;

  const [internalOpenIds, setInternalOpenIds] = useState(() =>
    defaultOpenFirst ? [TAGS_CATEGORIES[0].id] : [],
  );

  const handleToggle = (categoryId) => {
    if (isControlled) {
      onAccordionToggle?.(categoryId);
    } else {
      setInternalOpenIds((prev) => {
        return prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId)
          : [...prev, categoryId];
      });
    }
  };

  const activeOpenIds = isControlled ? openAccordionIds : internalOpenIds;

  return (
    <div className={`${className}`}>
      {variant === "full" && (
        <div className="space-y-0">
          {TAGS_CATEGORIES.map((category) => (
            <TagsCategoryAccordion
              key={category.id}
              category={category}
              isOpen={activeOpenIds.includes(category.id)}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}

      {variant === "compact" && (
        <div className="space-y-4">
          {TAGS_CATEGORIES.map((category) => (
            <div key={category.id} className="space-y-2">
              <h4 className="text-sm font-semibold text-black dark:text-white">
                {category.label}
              </h4>
              <div className="space-y-3">
                {category.options.map((option) => (
                  <div
                    key={option.id}
                    className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-3"
                  >
                    <div className="flex shrink-0">{option.tag}</div>
                    <p className="text-xs leading-relaxed text-neutral-800 dark:text-neutral-200">
                      {option.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

TagsInfoContent.propTypes = {
  variant: PropTypes.oneOf(["compact", "full"]),
  className: PropTypes.string,
  openAccordionIds: PropTypes.arrayOf(PropTypes.string),
  onAccordionToggle: PropTypes.func,
  defaultOpenFirst: PropTypes.bool,
};

export default TagsInfoContent;
