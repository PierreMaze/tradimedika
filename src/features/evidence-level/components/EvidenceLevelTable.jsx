import PropTypes from "prop-types";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { generateSlug } from "../../product-result-page/utils/productMatcher";
import EvidenceBadge from "./EvidenceBadge";

const ITEMS_PER_PAGE = 10;

export default function EvidenceLevelTable({ products }) {
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState(null);
  const [page, setPage] = useState(0);

  const filtered = products.filter((p) => {
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = !filterLevel || p.evidenceLevel === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE,
  );

  const levels = ["A", "B", "C", "D"];

  return (
    <div>
      {/* Recherche + filtres */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <IoSearchOutline className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            placeholder="Rechercher un produit..."
            className="w-full rounded-lg border border-neutral-300 bg-white py-2 pr-4 pl-9 text-sm text-neutral-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
          />
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={() => {
              setFilterLevel(null);
              setPage(0);
            }}
            className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              filterLevel === null
                ? "bg-neutral-800 text-white dark:bg-white dark:text-neutral-800"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600"
            }`}
          >
            Tous
          </button>
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => {
                setFilterLevel(filterLevel === level ? null : level);
                setPage(0);
              }}
              className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                filterLevel === level
                  ? "bg-neutral-800 text-white dark:bg-white dark:text-neutral-800"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-xs font-medium tracking-wide text-neutral-500 uppercase dark:bg-neutral-800 dark:text-neutral-400">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Niveau</th>
              <th className="hidden px-4 py-3 sm:table-cell">Sources sci.</th>
              <th className="hidden px-4 py-3 sm:table-cell">Sources trad.</th>
              <th className="hidden px-4 py-3">Vérifié</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
            {paginated.map((product) => (
              <tr
                key={product.id}
                className="bg-light dark:bg-dark text-neutral-700 transition-colors hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800/50"
              >
                <td className="px-4 py-3">
                  <Link
                    to={`/products/${generateSlug(product.name)}`}
                    className="text-base font-medium text-emerald-600 hover:underline dark:text-emerald-400"
                  >
                    {product.name}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded bg-neutral-100 px-2 py-0.5 text-sm capitalize dark:bg-neutral-700">
                    {product.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {product.evidenceLevel && (
                    <EvidenceBadge
                      level={product.evidenceLevel}
                      showLabel={true}
                    />
                  )}
                </td>
                <td className="hidden px-4 py-3 sm:table-cell">
                  <span className="text-base text-neutral-500 dark:text-neutral-400">
                    {product.sources?.scientific?.length || 0}
                  </span>
                </td>
                <td className="hidden px-4 py-3 sm:table-cell">
                  <span className="text-base text-neutral-500 dark:text-neutral-400">
                    {product.sources?.traditional?.length || 0}
                  </span>
                </td>
                <td className="hidden px-4 py-3">
                  {product.verifiedByProfessional ? (
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-base text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                      Oui
                    </span>
                  ) : (
                    <span className="rounded bg-neutral-100 px-2 py-0.5 text-base text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400">
                      Non
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {filtered.length} produit{filtered.length > 1 ? "s" : ""}
          </p>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`cursor-pointer rounded px-3 py-1 text-xs font-medium transition-colors ${
                  page === i
                    ? "bg-emerald-600 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-400"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

EvidenceLevelTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
