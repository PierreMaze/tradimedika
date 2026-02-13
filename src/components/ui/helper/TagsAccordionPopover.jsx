// tradimedika/src/components/ui/helper/TagsAccordionPopover.jsx

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { GrCircleQuestion } from "react-icons/gr";
import { HiXMark } from "react-icons/hi2";
import TagsInfoContent from "./TagsInfoContent";

/**
 * TagsAccordionPopover Component
 *
 * Popover avec accordéons contrôlés, appelé depuis les tags cliquables.
 * Réutilise la logique de positionnement de TagsInfoButton.
 *
 * API exposée via ref :
 * - open(categoryId, triggerElement) : Ouvre le popover avec l'accordéon ciblé
 * - close() : Ferme le popover
 *
 * Comportement :
 * - Desktop (≥ 1024px) : Positionnement adaptatif, fermeture via MouseLeave
 * - Mobile (< 1024px) : Centré, backdrop, fermeture via clic extérieur/Escape
 * - Focus management : Focus se déplace vers le popover à l'ouverture, retourne au tag à la fermeture
 * - Multi-ouverture : Plusieurs accordéons peuvent être ouverts simultanément
 */
const TagsAccordionPopover = forwardRef(
  function TagsAccordionPopover(props, ref) {
    const [isOpen, setIsOpen] = useState(false);
    const [openAccordionIds, setOpenAccordionIds] = useState([]);
    const [triggerElement, setTriggerElement] = useState(null);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
    const [popoverPosition, setPopoverPosition] = useState({
      top: 0,
      left: 0,
      placement: "bottom-right",
    });

    const popoverRef = useRef(null);

    useEffect(() => {
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 1024);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const calculatePosition = (element) => {
      if (!element || !isDesktop) return;

      const buttonRect = element.getBoundingClientRect();
      const popoverWidth = 640;
      const popoverMaxHeight = window.innerHeight * 0.8;
      const spacing = 12;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = 0;
      let left = 0;
      let placement = "bottom-right";

      const spaceRight = viewportWidth - buttonRect.right;
      const spaceLeft = buttonRect.left;
      const spaceBelow = viewportHeight - buttonRect.bottom;

      if (spaceRight >= popoverWidth + spacing) {
        left = buttonRect.right + spacing;
        top = Math.max(
          spacing,
          Math.min(buttonRect.top, viewportHeight - popoverMaxHeight - spacing),
        );
        placement = "right";
      } else if (spaceLeft >= popoverWidth + spacing) {
        left = buttonRect.left - popoverWidth - spacing;
        top = Math.max(
          spacing,
          Math.min(buttonRect.top, viewportHeight - popoverMaxHeight - spacing),
        );
        placement = "left";
      } else if (spaceBelow >= 300) {
        top = buttonRect.bottom + spacing;
        left = Math.max(
          spacing,
          Math.min(buttonRect.left, viewportWidth - popoverWidth - spacing),
        );
        placement = "bottom";
      } else {
        top = Math.max(spacing, buttonRect.top - 300 - spacing);
        left = Math.max(
          spacing,
          Math.min(buttonRect.left, viewportWidth - popoverWidth - spacing),
        );
        placement = "top";
      }

      setPopoverPosition({ top, left, placement });
    };

    useImperativeHandle(ref, () => ({
      open: (categoryId, element) => {
        setOpenAccordionIds([categoryId]);
        setTriggerElement(element);
        calculatePosition(element);
        setIsOpen(true);

        setTimeout(() => {
          const firstButton = popoverRef.current?.querySelector(
            "button[aria-expanded]",
          );
          firstButton?.focus();
        }, 100);
      },
      close: () => {
        setIsOpen(false);
        setOpenAccordionIds([]);
        triggerElement?.focus();
        setTriggerElement(null);
      },
    }));

    const closePopover = useCallback(
      (e) => {
        if (e) {
          e.stopPropagation();
        }
        setIsOpen(false);
        setOpenAccordionIds([]);
        triggerElement?.focus();
        setTriggerElement(null);
      },
      [triggerElement],
    );

    const handlePopoverClick = (e) => {
      e.stopPropagation();
    };

    const handleMouseLeave = () => {
      if (isDesktop) {
        closePopover();
      }
    };

    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }

      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);

    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event) => {
        if (
          popoverRef.current &&
          !popoverRef.current.contains(event.target) &&
          triggerElement &&
          !triggerElement.contains(event.target)
        ) {
          closePopover();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, triggerElement, closePopover]);

    useEffect(() => {
      const handleEscape = (event) => {
        if (event.key === "Escape" && isOpen) {
          closePopover();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
      }
    }, [isOpen, closePopover]);

    const handleAccordionToggle = (categoryId) => {
      setOpenAccordionIds((prev) => {
        return prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId)
          : [...prev, categoryId];
      });
    };

    if (!isOpen) return null;

    return createPortal(
      <>
        <div
          className="animate-in fade-in fixed inset-0 z-50 bg-black/50 duration-200 lg:pointer-events-none lg:bg-transparent"
          onClick={closePopover}
          aria-hidden="true"
        />

        <div
          ref={popoverRef}
          role="dialog"
          aria-modal="true"
          aria-label="Explication des indications d'usage"
          onClick={handlePopoverClick}
          onMouseLeave={handleMouseLeave}
          style={
            isDesktop
              ? {
                  top: `${popoverPosition.top}px`,
                  left: `${popoverPosition.left}px`,
                }
              : {}
          }
          className={`animate-in fade-in slide-in-from-top-2 duration-200 ${
            isDesktop
              ? "fixed w-full lg:max-w-2xl 2xl:max-w-3xl"
              : "fixed top-1/2 left-1/2 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2"
          } z-60 max-h-[80vh] overflow-auto rounded-xl bg-white p-6 shadow-2xl ring-1 ring-neutral-200 dark:bg-neutral-800 dark:ring-neutral-700`}
        >
          {!isDesktop && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                closePopover(e);
              }}
              aria-label="Fermer l'aide"
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-neutral-700 transition duration-200 hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
            >
              <HiXMark className="h-5 w-5" aria-hidden="true" />
            </button>
          )}

          <h3
            className={`border-b-2 border-dashed border-emerald-200 pb-4 text-xl font-bold text-black lg:text-2xl dark:border-emerald-700 dark:text-white ${!isDesktop ? "pr-8" : ""}`}
          >
            <GrCircleQuestion className="mr-2 inline-block h-5 w-5 lg:h-6 lg:w-6" />
            Lexique des indications d&apos;usage
          </h3>

          <TagsInfoContent
            variant="full"
            openAccordionIds={openAccordionIds}
            onAccordionToggle={handleAccordionToggle}
            defaultOpenFirst={false}
          />
        </div>
      </>,
      document.body,
    );
  },
);

TagsAccordionPopover.displayName = "TagsAccordionPopover";

export default TagsAccordionPopover;
