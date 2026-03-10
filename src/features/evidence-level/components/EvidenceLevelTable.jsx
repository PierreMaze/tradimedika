import PropTypes from "prop-types";
import { useState } from "react";
import {
  IoAlertCircleOutline,
  IoSearchOutline,
  IoFlaskOutline,
  IoMedicalOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { Tooltip } from "../../../components/ui/tooltip";
import { generateSlug } from "../../product-result-page/utils/productMatcher";
import EvidenceBadge from "./EvidenceBadge";

const ITEMS_PER_PAGE = 10;

// Vue par produit - Une ligne par entrée dans symptomPropertyMap
function ProductView({ products, search, filterLevel, page, setPage }) {
  // Créer une liste "aplatie" basée sur le symptomPropertyMap
  const expandedRows = [];
  products.forEach((product) => {
    // Priorité au symptomPropertyMap si disponible
    if (product.symptomPropertyMap && product.symptomPropertyMap.length > 0) {
      product.symptomPropertyMap.forEach((entry) => {
        // Pour chaque propriété de cette entrée, créer une ligne
        if (entry.properties && entry.properties.length > 0) {
          entry.properties.forEach((propertyName) => {
            expandedRows.push({
              ...product,
              currentSymptom: entry.symptom,
              currentPropertyName: propertyName,
              currentEvidenceLevel: entry.evidenceLevel,
            });
          });
        } else {
          // Entrée sans propriété
          expandedRows.push({
            ...product,
            currentSymptom: entry.symptom,
            currentPropertyName: null,
            currentEvidenceLevel: entry.evidenceLevel,
          });
        }
      });
    } else {
      // Fallback : ancienne structure (produit cartésien)
      const hasProperties = product.properties && product.properties.length > 0;
      const hasSymptoms = product.symptoms && product.symptoms.length > 0;

      if (hasSymptoms && hasProperties) {
        product.symptoms.forEach((symptom) => {
          product.properties.forEach((property) => {
            expandedRows.push({
              ...product,
              currentSymptom: symptom,
              currentPropertyName: property.name,
              currentEvidenceLevel: product.evidenceLevel,
            });
          });
        });
      } else if (hasSymptoms) {
        product.symptoms.forEach((symptom) => {
          expandedRows.push({
            ...product,
            currentSymptom: symptom,
            currentPropertyName: null,
            currentEvidenceLevel: product.evidenceLevel,
          });
        });
      } else if (hasProperties) {
        product.properties.forEach((property) => {
          expandedRows.push({
            ...product,
            currentSymptom: null,
            currentPropertyName: property.name,
            currentEvidenceLevel: product.evidenceLevel,
          });
        });
      } else {
        expandedRows.push({
          ...product,
          currentSymptom: null,
          currentPropertyName: null,
          currentEvidenceLevel: product.evidenceLevel,
        });
      }
    }
  });

  // Filtrer
  const filtered = expandedRows.filter((row) => {
    const matchesSearch =
      !search ||
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.type.toLowerCase().includes(search.toLowerCase()) ||
      (row.currentPropertyName &&
        row.currentPropertyName.toLowerCase().includes(search.toLowerCase())) ||
      (row.currentSymptom &&
        row.currentSymptom.toLowerCase().includes(search.toLowerCase()));
    const matchesLevel =
      !filterLevel || row.currentEvidenceLevel === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE,
  );

  return (
    <div>
      <div
        className="overflow-x-auto overflow-y-auto rounded-lg border-2 border-dashed border-neutral-200 shadow-sm dark:border-neutral-700"
        style={{ maxHeight: "600px" }}
      >
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 z-10 bg-neutral-100 text-xs font-medium tracking-wide text-neutral-500 uppercase shadow-sm dark:bg-neutral-800 dark:text-neutral-400">
            <tr>
              <th className="px-4 py-3">
                <Tooltip
                  content={
                    <div className="max-w-xs text-xs">
                      Nom du produit naturel (plante, huile essentielle,
                      complément)
                    </div>
                  }
                  placement="top"
                >
                  <span className="cursor-help border-b border-dashed border-neutral-400">
                    Produit
                  </span>
                </Tooltip>
              </th>
              <th className="px-4 py-3">
                <Tooltip
                  content={
                    <div className="max-w-xs text-xs">
                      Symptôme ou indication ciblée
                    </div>
                  }
                  placement="top"
                >
                  <span className="cursor-help border-b border-dashed border-neutral-400">
                    Symptôme
                  </span>
                </Tooltip>
              </th>
              <th className="px-4 py-3">
                <Tooltip
                  content={
                    <div className="max-w-xs text-xs">
                      Propriété thérapeutique responsable de l&apos;effet
                    </div>
                  }
                  placement="top"
                >
                  <span className="cursor-help border-b border-dashed border-neutral-400">
                    Propriété
                  </span>
                </Tooltip>
              </th>
              <th className="px-4 py-3">
                <Tooltip
                  content={
                    <div className="max-w-xs text-xs">
                      Niveau de preuve scientifique (A = solide, D =
                      insuffisant)
                    </div>
                  }
                  placement="top"
                >
                  <span className="cursor-help border-b border-dashed border-neutral-400">
                    Preuve
                  </span>
                </Tooltip>
              </th>
              <th className="hidden px-4 py-3 xl:table-cell">
                <Tooltip
                  content={
                    <div className="max-w-xs text-xs">
                      Données scientifiques (études, participants, I²)
                    </div>
                  }
                  placement="top"
                >
                  <span className="cursor-help border-b border-dashed border-neutral-400">
                    Données
                  </span>
                </Tooltip>
              </th>
              <th className="hidden px-4 py-3 md:table-cell">
                <Tooltip
                  content={
                    <div className="max-w-xs text-xs">
                      Signaux d&apos;alerte méthodologiques
                    </div>
                  }
                  placement="top"
                >
                  <span className="cursor-help border-b border-dashed border-neutral-400">
                    Alertes
                  </span>
                </Tooltip>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
            {paginated.map((row, idx) => (
              <tr
                key={`${row.id}-${idx}`}
                className="dark:bg-dark bg-white text-neutral-700 transition-colors hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800/50"
              >
                {/* Nom du produit */}
                <td className="px-4 py-3">
                  <Link
                    to={`/products/${generateSlug(row.name)}`}
                    className="block text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
                  >
                    {row.name}
                  </Link>
                  <span className="mt-0.5 inline-block rounded bg-neutral-200 px-1.5 py-0.5 text-xs capitalize dark:bg-neutral-700">
                    {row.type}
                  </span>
                </td>

                {/* Symptôme */}
                <td className="px-4 py-3">
                  {row.currentSymptom ? (
                    <span className="inline-flex items-center gap-1.5 rounded bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800 capitalize dark:bg-blue-900/30 dark:text-blue-300">
                      <IoMedicalOutline className="h-3.5 w-3.5" />
                      {row.currentSymptom}
                    </span>
                  ) : (
                    <span className="text-xs text-neutral-400 dark:text-neutral-500">
                      N/A
                    </span>
                  )}
                </td>

                {/* Propriété */}
                <td className="px-4 py-3">
                  {row.currentPropertyName ? (
                    <span className="inline-flex items-center gap-1.5 rounded bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      <IoFlaskOutline className="h-3.5 w-3.5" />
                      {row.currentPropertyName}
                    </span>
                  ) : (
                    <span className="text-xs text-neutral-400 dark:text-neutral-500">
                      N/A
                    </span>
                  )}
                </td>

                {/* Niveau de preuve */}
                <td className="px-4 py-3">
                  {row.currentEvidenceLevel && (
                    <EvidenceBadge
                      level={row.currentEvidenceLevel}
                      showLabel={true}
                    />
                  )}
                </td>

                {/* Données scientifiques */}
                <td className="hidden px-4 py-3 xl:table-cell">
                  {row.evidenceDetails ? (
                    <Tooltip
                      content={
                        <div className="max-w-sm space-y-2 text-xs">
                          <div>
                            <strong className="text-neutral-900 dark:text-white">
                              Études:
                            </strong>{" "}
                            {row.evidenceDetails.studyCount} (
                            {row.evidenceDetails.studyTypes?.join(", ")})
                          </div>
                          <div>
                            <strong className="text-neutral-900 dark:text-white">
                              Participants:
                            </strong>{" "}
                            n = {row.evidenceDetails.participantCount}
                          </div>
                          {row.evidenceDetails.heterogeneity && (
                            <div>
                              <strong className="text-neutral-900 dark:text-white">
                                Hétérogénéité:
                              </strong>{" "}
                              I² = {row.evidenceDetails.heterogeneity.i2}% (
                              {row.evidenceDetails.heterogeneity.interpretation}
                              )
                            </div>
                          )}
                          <div>
                            <strong className="text-neutral-900 dark:text-white">
                              Dernière revue:
                            </strong>{" "}
                            {new Date(
                              row.evidenceDetails.lastReviewed,
                            ).toLocaleDateString("fr-FR")}
                          </div>
                        </div>
                      }
                      placement="left"
                    >
                      <div className="cursor-help space-y-0.5 text-xs">
                        <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                          {row.evidenceDetails.studyCount} études
                        </div>
                        <div className="text-neutral-500 dark:text-neutral-400">
                          n = {row.evidenceDetails.participantCount}
                        </div>
                      </div>
                    </Tooltip>
                  ) : (
                    <span className="text-xs text-neutral-400 dark:text-neutral-500">
                      N/A
                    </span>
                  )}
                </td>

                {/* Signaux d'alerte */}
                <td className="hidden px-4 py-3 md:table-cell">
                  {row.alertSignals && row.alertSignals.length > 0 ? (
                    <Tooltip
                      content={
                        <div className="max-w-xs">
                          <h4 className="mb-2 text-sm font-semibold text-neutral-900 dark:text-white">
                            Signaux d&apos;alerte
                          </h4>
                          <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                            {row.alertSignals.map((alert, aidx) => (
                              <li
                                key={aidx}
                                className={`flex items-start gap-1.5 ${
                                  alert.severity === "high"
                                    ? "text-red-700 dark:text-red-400"
                                    : alert.severity === "moderate"
                                      ? "text-orange-700 dark:text-orange-400"
                                      : "text-yellow-700 dark:text-yellow-400"
                                }`}
                              >
                                <IoAlertCircleOutline className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                                <span>{alert.description}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      }
                      placement="left"
                    >
                      <span className="inline-flex cursor-help items-center gap-1 rounded bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                        <IoAlertCircleOutline className="h-3.5 w-3.5" />
                        {row.alertSignals.length}
                      </span>
                    </Tooltip>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                      ✓ Aucune
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
        <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
            {filtered.length} produit{filtered.length > 1 ? "s" : ""} trouvé
            {filtered.length > 1 ? "s" : ""}
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium shadow-sm transition-all ${
                  page === i
                    ? "bg-emerald-600 text-white shadow-md hover:bg-emerald-700"
                    : "bg-white text-neutral-600 hover:bg-neutral-50 hover:shadow dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600"
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

ProductView.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  search: PropTypes.string.isRequired,
  filterLevel: PropTypes.string,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

// Vue par symptôme
function SymptomView({ products, search, filterLevel, page, setPage }) {
  // Regrouper par symptôme
  const symptomMap = {};
  products.forEach((product) => {
    if (product.symptoms) {
      product.symptoms.forEach((symptom) => {
        if (!symptomMap[symptom]) {
          symptomMap[symptom] = [];
        }
        symptomMap[symptom].push(product);
      });
    }
  });

  // Filtrer
  const filtered = Object.entries(symptomMap).filter(([symptom, prods]) => {
    const matchesSearch =
      !search || symptom.toLowerCase().includes(search.toLowerCase());
    const matchesLevel =
      !filterLevel || prods.some((p) => p.evidenceLevel === filterLevel);
    return matchesSearch && matchesLevel;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE,
  );

  return (
    <div>
      <div
        className="overflow-x-auto overflow-y-auto rounded-lg border-2 border-dashed border-neutral-200 shadow-sm dark:border-neutral-700"
        style={{ maxHeight: "600px" }}
      >
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 z-10 bg-neutral-100 text-xs font-medium tracking-wide text-neutral-500 uppercase shadow-sm dark:bg-neutral-800 dark:text-neutral-400">
            <tr>
              <th className="px-4 py-3">
                <Tooltip
                  content={
                    <div className="max-w-xs text-xs">
                      Symptôme ou indication thérapeutique
                    </div>
                  }
                  placement="top"
                >
                  <span className="cursor-help border-b border-dashed border-neutral-400">
                    Symptôme / Indication
                  </span>
                </Tooltip>
              </th>
              <th className="px-4 py-3">
                <Tooltip
                  content={
                    <div className="max-w-xs text-xs">
                      Produits naturels efficaces avec leur niveau de preuve
                    </div>
                  }
                  placement="top"
                >
                  <span className="cursor-help border-b border-dashed border-neutral-400">
                    Produits efficaces
                  </span>
                </Tooltip>
              </th>
              <th className="hidden px-4 py-3 lg:table-cell">
                <Tooltip
                  content={
                    <div className="max-w-xs text-xs">
                      Meilleur niveau de preuve disponible pour ce symptôme
                    </div>
                  }
                  placement="top"
                >
                  <span className="cursor-help border-b border-dashed border-neutral-400">
                    Meilleur niveau
                  </span>
                </Tooltip>
              </th>
              <th className="hidden px-4 py-3 xl:table-cell">
                <Tooltip
                  content={
                    <div className="max-w-xs text-xs">
                      Données scientifiques agrégées (total études et
                      participants)
                    </div>
                  }
                  placement="top"
                >
                  <span className="cursor-help border-b border-dashed border-neutral-400">
                    Données
                  </span>
                </Tooltip>
              </th>
              <th className="hidden px-4 py-3 md:table-cell">
                <Tooltip
                  content={
                    <div className="max-w-xs text-xs">
                      Présence de signaux d&apos;alerte sur les produits
                    </div>
                  }
                  placement="top"
                >
                  <span className="cursor-help border-b border-dashed border-neutral-400">
                    Alertes
                  </span>
                </Tooltip>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-dashed divide-neutral-200 dark:divide-neutral-700">
            {paginated.map(([symptom, prods]) => {
              // Trier par niveau de preuve (A > B > C > D)
              const sortedProds = [...prods].sort((a, b) => {
                const levels = { A: 4, B: 3, C: 2, D: 1 };
                return (
                  (levels[b.evidenceLevel] || 0) -
                  (levels[a.evidenceLevel] || 0)
                );
              });
              const bestLevel = sortedProds[0]?.evidenceLevel;

              // Calculer les données agrégées
              const totalStudies = sortedProds.reduce(
                (sum, p) => sum + (p.evidenceDetails?.studyCount || 0),
                0,
              );
              const totalParticipants = sortedProds.reduce(
                (sum, p) => sum + (p.evidenceDetails?.participantCount || 0),
                0,
              );
              const totalAlerts = sortedProds.reduce(
                (sum, p) => sum + (p.alertSignals?.length || 0),
                0,
              );
              const hasHighAlert = sortedProds.some((p) =>
                p.alertSignals?.some((a) => a.severity === "high"),
              );

              return (
                <tr
                  key={symptom}
                  className="dark:bg-dark bg-white text-neutral-700 transition-colors hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800/50"
                >
                  {/* Symptôme */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <IoMedicalOutline className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-base font-medium text-neutral-800 capitalize dark:text-neutral-200">
                        {symptom}
                      </span>
                    </div>
                  </td>

                  {/* Produits efficaces */}
                  <td className="px-4 py-3">
                    <div className="space-y-1.5">
                      {sortedProds.slice(0, 3).map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-2"
                        >
                          <Link
                            to={`/products/${generateSlug(product.name)}`}
                            className="text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
                          >
                            {product.name}
                          </Link>
                          <EvidenceBadge
                            level={product.evidenceLevel}
                            showLabel={false}
                          />
                        </div>
                      ))}
                      {sortedProds.length > 3 && (
                        <Tooltip
                          content={
                            <div className="max-w-xs space-y-1">
                              {sortedProds.slice(3).map((p) => (
                                <div
                                  key={p.id}
                                  className="flex items-center gap-2 text-xs"
                                >
                                  <Link
                                    to={`/products/${generateSlug(p.name)}`}
                                    className="text-emerald-600 hover:underline dark:text-emerald-400"
                                  >
                                    {p.name}
                                  </Link>
                                  <EvidenceBadge
                                    level={p.evidenceLevel}
                                    showLabel={false}
                                  />
                                </div>
                              ))}
                            </div>
                          }
                          placement="top"
                        >
                          <span className="cursor-help text-xs text-neutral-500 dark:text-neutral-400">
                            +{sortedProds.length - 3} autre(s)
                          </span>
                        </Tooltip>
                      )}
                    </div>
                  </td>

                  {/* Meilleur niveau */}
                  <td className="hidden px-4 py-3 lg:table-cell">
                    {bestLevel && (
                      <EvidenceBadge level={bestLevel} showLabel={true} />
                    )}
                  </td>

                  {/* Données agrégées */}
                  <td className="hidden px-4 py-3 xl:table-cell">
                    {totalStudies > 0 ? (
                      <Tooltip
                        content={
                          <div className="max-w-sm space-y-2 text-xs">
                            <div>
                              <strong className="text-neutral-900 dark:text-white">
                                Total études:
                              </strong>{" "}
                              {totalStudies} (tous produits confondus)
                            </div>
                            <div>
                              <strong className="text-neutral-900 dark:text-white">
                                Total participants:
                              </strong>{" "}
                              n = {totalParticipants}
                            </div>
                            <div>
                              <strong className="text-neutral-900 dark:text-white">
                                Produits:
                              </strong>{" "}
                              {sortedProds.length} option
                              {sortedProds.length > 1 ? "s" : ""}
                            </div>
                          </div>
                        }
                        placement="left"
                      >
                        <div className="cursor-help space-y-0.5 text-xs">
                          <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                            {totalStudies} études
                          </div>
                          <div className="text-neutral-500 dark:text-neutral-400">
                            n = {totalParticipants}
                          </div>
                        </div>
                      </Tooltip>
                    ) : (
                      <span className="text-xs text-neutral-400 dark:text-neutral-500">
                        N/A
                      </span>
                    )}
                  </td>

                  {/* Alertes */}
                  <td className="hidden px-4 py-3 md:table-cell">
                    {totalAlerts > 0 ? (
                      <Tooltip
                        content={
                          <div className="max-w-xs">
                            <h4 className="mb-2 text-sm font-semibold text-neutral-900 dark:text-white">
                              Signaux d&apos;alerte par produit
                            </h4>
                            <div className="space-y-2">
                              {sortedProds
                                .filter(
                                  (p) =>
                                    p.alertSignals && p.alertSignals.length > 0,
                                )
                                .map((product) => (
                                  <div key={product.id} className="text-xs">
                                    <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                                      {product.name}:
                                    </div>
                                    <ul className="mt-1 ml-3 space-y-1">
                                      {product.alertSignals.map(
                                        (alert, idx) => (
                                          <li
                                            key={idx}
                                            className={`flex items-start gap-1.5 ${
                                              alert.severity === "high"
                                                ? "text-red-700 dark:text-red-400"
                                                : alert.severity === "moderate"
                                                  ? "text-orange-700 dark:text-orange-400"
                                                  : "text-yellow-700 dark:text-yellow-400"
                                            }`}
                                          >
                                            <IoAlertCircleOutline className="mt-0.5 h-3 w-3 shrink-0" />
                                            <span>{alert.description}</span>
                                          </li>
                                        ),
                                      )}
                                    </ul>
                                  </div>
                                ))}
                            </div>
                          </div>
                        }
                        placement="left"
                      >
                        <span
                          className={`inline-flex cursor-help items-center gap-1 rounded px-2 py-0.5 text-xs font-medium ${
                            hasHighAlert
                              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                              : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                          }`}
                        >
                          <IoAlertCircleOutline className="h-3.5 w-3.5" />
                          {totalAlerts} alerte{totalAlerts > 1 ? "s" : ""}
                        </span>
                      </Tooltip>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                        ✓ Aucune
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
            {filtered.length} symptôme{filtered.length > 1 ? "s" : ""} trouvé
            {filtered.length > 1 ? "s" : ""}
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium shadow-sm transition-all ${
                  page === i
                    ? "bg-emerald-600 text-white shadow-md hover:bg-emerald-700"
                    : "bg-white text-neutral-600 hover:bg-neutral-50 hover:shadow dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600"
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

SymptomView.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  search: PropTypes.string.isRequired,
  filterLevel: PropTypes.string,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

// Composant principal avec onglets
export default function EvidenceLevelTable({ products }) {
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState(null);
  const [page, setPage] = useState(0);
  const [activeTab, setActiveTab] = useState("product"); // "product" ou "symptom"

  const levels = ["A", "B", "C", "D"];

  return (
    <div>
      {/* Onglets */}
      <div className="mb-4 flex gap-2 rounded-lg bg-neutral-100 p-1.5 shadow-sm dark:bg-neutral-800">
        <button
          onClick={() => {
            setActiveTab("product");
            setPage(0);
          }}
          className={`flex-1 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
            activeTab === "product"
              ? "bg-white text-neutral-800 shadow-md dark:bg-neutral-700 dark:text-white"
              : "text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700/50 dark:hover:text-neutral-200"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <IoFlaskOutline className="h-4 w-4" />
            <span className="hidden sm:inline">Vue par produit</span>
            <span className="sm:hidden">Produits</span>
          </div>
        </button>
        <button
          onClick={() => {
            setActiveTab("symptom");
            setPage(0);
          }}
          className={`flex-1 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
            activeTab === "symptom"
              ? "bg-white text-neutral-800 shadow-md dark:bg-neutral-700 dark:text-white"
              : "text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700/50 dark:hover:text-neutral-200"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <IoMedicalOutline className="h-4 w-4" />
            <span className="hidden sm:inline">Vue par symptôme</span>
            <span className="sm:hidden">Symptômes</span>
          </div>
        </button>
      </div>

      {/* Recherche + filtres */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <IoSearchOutline className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            placeholder={
              activeTab === "product"
                ? "Rechercher un produit..."
                : "Rechercher un symptôme..."
            }
            className="w-full rounded-lg border border-neutral-300 bg-white py-2.5 pr-4 pl-10 text-sm text-neutral-800 shadow-sm transition-all outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:focus:border-emerald-400"
          />
        </div>
        <div className="flex flex-wrap gap-1.5 sm:flex-nowrap">
          <button
            onClick={() => {
              setFilterLevel(null);
              setPage(0);
            }}
            className={`cursor-pointer rounded-md px-3 py-2 text-xs font-medium shadow-sm transition-all ${
              filterLevel === null
                ? "bg-neutral-800 text-white shadow-md dark:bg-white dark:text-neutral-800"
                : "bg-white text-neutral-600 hover:bg-neutral-50 hover:shadow dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600"
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
              className={`cursor-pointer rounded-md px-3 py-2 text-xs font-medium shadow-sm transition-all ${
                filterLevel === level
                  ? "bg-neutral-800 text-white shadow-md dark:bg-white dark:text-neutral-800"
                  : "bg-white text-neutral-600 hover:bg-neutral-50 hover:shadow dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Affichage conditionnel selon l'onglet actif */}
      {activeTab === "product" ? (
        <ProductView
          products={products}
          search={search}
          filterLevel={filterLevel}
          page={page}
          setPage={setPage}
        />
      ) : (
        <SymptomView
          products={products}
          search={search}
          filterLevel={filterLevel}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
}

EvidenceLevelTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
