// components/search/SearchHistoryItem.jsx
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * Helper function to capitalize the first letter of a symptom
 * @param {string} symptom - Symptom to capitalize
 * @returns {string} - Capitalized symptom
 */
const capitalizeSymptom = (symptom) => {
  return symptom.charAt(0).toUpperCase() + symptom.slice(1);
};

/**
 * SearchHistoryItem Component
 *
 * Displays a single search history entry with:
 * - Symptom pills (tags)
 * - Result count badge
 * - Delete button
 * - Click to re-run search
 *
 * @component
 * @param {Object} props
 * @param {Object} props.search - Search entry object { id, symptoms[], timestamp, resultCount }
 * @param {Function} props.onClick - Callback when item is clicked (re-run search)
 * @param {Function} props.onRemove - Callback when delete button is clicked
 */
export default function SearchHistoryItem({ search, onClick, onRemove }) {
  const prefersReducedMotion = useReducedMotion();

  const handleClick = () => {
    onClick(search);
  };

  const handleRemove = (e) => {
    e.stopPropagation(); // Prevent triggering onClick
    onRemove(search.id);
  };

  return (
    <motion.li
      initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="group relative"
    >
      {/* Delete button (top-right, outside main button to avoid nesting) */}
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 z-10 rounded-full p-1.5 text-neutral-400 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-neutral-100 hover:text-emerald-600 dark:hover:bg-neutral-800"
        aria-label="Supprimer cette recherche"
      >
        <IoMdClose className="text-lg" />
      </button>

      <button
        onClick={handleClick}
        className="dark:bg-dark w-full rounded-lg border-2 border-emerald-100 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md dark:border-neutral-700"
        aria-label={`Relancer la recherche : ${search.symptoms.join(", ")}`}
      >
        {/* Symptoms pills */}
        <div className="mb-3 flex flex-wrap gap-2">
          {search.symptoms.map((symptom, index) => (
            <span
              key={`${search.id}-${index}`}
              className="rounded-md bg-emerald-50 px-2.5 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
            >
              {capitalizeSymptom(symptom)}
            </span>
          ))}
        </div>

        {/* Result count badge */}
        {search.resultCount !== undefined && (
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 font-medium dark:bg-neutral-800">
              {search.resultCount}{" "}
              {search.resultCount > 1 ? "résultats" : "résultat"}
            </span>
            <span>•</span>
            <time dateTime={new Date(search.timestamp).toISOString()}>
              {formatRelativeTime(search.timestamp)}
            </time>
          </div>
        )}
      </button>
    </motion.li>
  );
}

SearchHistoryItem.propTypes = {
  search: PropTypes.shape({
    id: PropTypes.string.isRequired,
    symptoms: PropTypes.arrayOf(PropTypes.string).isRequired,
    timestamp: PropTypes.number.isRequired,
    resultCount: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

/**
 * Formats a timestamp as relative time (e.g., "il y a 5 min")
 * @param {number} timestamp - Timestamp in milliseconds
 * @returns {string} - Formatted relative time
 */
function formatRelativeTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `il y a ${days}j`;
  if (hours > 0) return `il y a ${hours}h`;
  if (minutes > 0) return `il y a ${minutes}min`;
  return "à l'instant";
}
