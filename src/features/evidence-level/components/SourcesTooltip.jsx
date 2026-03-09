import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoBookOutline, IoDocumentTextOutline } from "react-icons/io5";
import { Z_INDEX_CLASSES } from "../../../constants/zIndexLevels";
import { useReducedMotion } from "../../../features/settings/hooks/useReducedMotion";

const SourcesTooltip = ({ sources, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [position, setPosition] = useState({ x: -9999, y: -9999 });
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const sourcesList =
    type === "scientific" ? sources.scientific : sources.traditional;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isOpen && !isPinned) return;

      const isClickInButton =
        buttonRef.current && buttonRef.current.contains(event.target);
      const isClickInTooltip =
        tooltipRef.current && tooltipRef.current.contains(event.target);

      if (!isClickInButton && !isClickInTooltip) {
        setIsPinned(false);
        setIsOpen(false);
      }
    };

    if (isOpen || isPinned) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, isPinned]);

  useEffect(() => {
    if (!isOpen || !buttonRef.current || !tooltipRef.current) {
      return;
    }

    const updatePosition = () => {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let x = buttonRect.left + buttonRect.width / 2 - tooltipRect.width / 2;
      let y = buttonRect.top - tooltipRect.height - 8;

      if (x < 8) x = 8;
      if (x + tooltipRect.width > window.innerWidth - 8) {
        x = window.innerWidth - tooltipRect.width - 8;
      }

      if (y < 8) {
        y = buttonRect.bottom + 8;
      }

      setPosition({ x, y });
    };

    updatePosition();

    const timeoutId = setTimeout(updatePosition, 10);

    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  if (!sourcesList || sourcesList.length === 0) {
    return <span className="text-gray-400 dark:text-gray-600">0</span>;
  }

  const icon = type === "scientific" ? IoDocumentTextOutline : IoBookOutline;
  const Icon = icon;
  const bgColor =
    type === "scientific"
      ? "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/40 dark:hover:bg-blue-900/60"
      : "bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/40 dark:hover:bg-amber-900/60";
  const textColor =
    type === "scientific"
      ? "text-blue-800 dark:text-blue-200"
      : "text-amber-800 dark:text-amber-200";

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    if (!isPinned) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 200);
    }
  };

  const handleTooltipMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleTooltipMouseLeave = () => {
    if (!isPinned) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 200);
    }
  };

  const handleClick = () => {
    setIsPinned((prev) => !prev);
    setIsOpen(true);
  };

  const isPositioned = position.x !== -9999 && position.y !== -9999;
  const animationClass = prefersReducedMotion
    ? isPositioned
      ? "opacity-100"
      : "opacity-0"
    : "transition-opacity duration-200 ease-in-out " +
      (isPositioned ? "opacity-100" : "opacity-0");

  const tooltipClasses = `
    ${Z_INDEX_CLASSES.TOOLTIP}
    rounded-md shadow-lg px-3 py-2 text-sm
    bg-white text-neutral-900 border-2 border-dashed border-neutral-300
    dark:bg-neutral-900 dark:text-white dark:border-neutral-500
    ${animationClass}
  `
    .trim()
    .replace(/\s+/g, " ");

  const tooltipContent = (
    <div
      ref={tooltipRef}
      className={tooltipClasses}
      style={{
        position: "fixed",
        left: position.x + "px",
        top: position.y + "px",
        pointerEvents: "auto",
      }}
      onMouseEnter={handleTooltipMouseEnter}
      onMouseLeave={handleTooltipMouseLeave}
    >
      <div className="max-w-md space-y-2">
        <h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
          {type === "scientific"
            ? "Sources scientifiques"
            : "Sources traditionnelles"}
        </h4>
        <ul className="space-y-2">
          {sourcesList.map((source, index) => (
            <li key={index} className="text-sm">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {source.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div>
      <button
        ref={buttonRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={
          "inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium transition-colors " +
          bgColor +
          " " +
          textColor
        }
        aria-label={
          sourcesList.length +
          " source" +
          (sourcesList.length > 1 ? "s" : "") +
          " " +
          (type === "scientific" ? "scientifique" : "traditionnelle") +
          (sourcesList.length > 1 ? "s" : "")
        }
      >
        <Icon className="h-4 w-4" />
        <span>{sourcesList.length}</span>
      </button>
      {isOpen && createPortal(tooltipContent, document.body)}
    </div>
  );
};

SourcesTooltip.propTypes = {
  sources: PropTypes.shape({
    scientific: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }),
    ),
    traditional: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  type: PropTypes.oneOf(["scientific", "traditional"]).isRequired,
};

export default SourcesTooltip;
