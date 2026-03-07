import PropTypes from "prop-types";
import { useState } from "react";
import {
  IoCreateOutline,
  IoSearchOutline,
  IoTrashOutline,
} from "react-icons/io5";

const ITEMS_PER_PAGE = 10;

export default function AdminProductTable({ products, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE,
  );

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4">
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

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-xs font-medium tracking-wide text-neutral-500 uppercase dark:bg-neutral-800 dark:text-neutral-400">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Grossesse</th>
              <th className="w-0 px-4 py-3 whitespace-nowrap">Enfants</th>
              <th className="px-4 py-3">Propriétés</th>
              <th className="px-4 py-3">Allergènes</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
            {paginated.map((product) => (
              <tr
                key={product.id}
                className="bg-light dark:bg-dark text-neutral-700 transition-colors hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800/50"
              >
                <td className="px-4 py-3 font-mono text-base text-neutral-500 dark:text-neutral-400">
                  {product.id}
                </td>
                <td className="w-40 px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400">
                  {product.name}
                </td>
                <td className="px-4 py-3">
                  <span className="rounded bg-neutral-100 px-2 py-0.5 text-sm font-medium dark:bg-neutral-700">
                    {product.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {product.pregnancySafe?.safe === true && (
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-sm font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                      OK
                    </span>
                  )}
                  {product.pregnancySafe?.safe === false && (
                    <span className="rounded bg-red-100 px-2 py-0.5 text-sm font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                      Interdit
                    </span>
                  )}
                  {product.pregnancySafe?.safe === null && (
                    <span className="rounded bg-amber-100 px-2 py-0.5 text-sm font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                      Précaution
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {product.childrenAge === null ? (
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-sm font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                      Tous âges
                    </span>
                  ) : (
                    <span className="rounded bg-amber-100 px-2 py-0.5 text-sm font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                      {product.childrenAge}+ ans
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {(product.properties ?? []).length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {(product.properties ?? []).map((p, i) => (
                        <span
                          key={i}
                          className="rounded bg-purple-100 px-1.5 py-0.5 text-sm font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                        >
                          {p.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-neutral-400 dark:text-neutral-500">
                      —
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {(product.allergens ?? []).length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {product.allergens.map((a, i) => (
                        <span
                          key={i}
                          className="rounded bg-amber-100 px-1.5 py-0.5 text-sm font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-neutral-400 dark:text-neutral-500">
                      —
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => onEdit(product)}
                      className="cursor-pointer rounded p-1.5 text-neutral-400 transition-colors hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400"
                      aria-label={`Modifier ${product.name}`}
                    >
                      <IoCreateOutline className="text-lg" />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="cursor-pointer rounded p-1.5 text-neutral-400 transition-colors hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                      aria-label={`Supprimer ${product.name}`}
                    >
                      <IoTrashOutline className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-sm text-neutral-400 dark:text-neutral-500"
                >
                  Aucun produit trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            {filtered.length} produit{filtered.length > 1 ? "s" : ""} — Page{" "}
            {page + 1}/{totalPages}
          </p>
          <div className="flex gap-1">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="cursor-pointer rounded border border-neutral-300 px-3 py-1 text-xs text-neutral-600 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-600 dark:text-neutral-400 dark:hover:bg-neutral-700"
            >
              Précédent
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="cursor-pointer rounded border border-neutral-300 px-3 py-1 text-xs text-neutral-600 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-600 dark:text-neutral-400 dark:hover:bg-neutral-700"
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

AdminProductTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
