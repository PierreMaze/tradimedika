import PropTypes from "prop-types";
import { useState } from "react";
import { FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  IoInformationCircleOutline,
  IoFlaskOutline,
  IoStatsChartOutline,
  IoShieldCheckmarkOutline,
  IoAlertCircleOutline,
  IoEyeOutline,
  IoListOutline,
  IoRibbonOutline,
} from "react-icons/io5";

/**
 * Section accordéon réutilisable pour la modal
 */
function AccordionSection({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-neutral-200 dark:border-neutral-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
      >
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="font-semibold text-neutral-900 dark:text-white">
            {title}
          </h3>
        </div>
        {isOpen ? (
          <FiChevronUp className="h-5 w-5 text-neutral-400" />
        ) : (
          <FiChevronDown className="h-5 w-5 text-neutral-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300">
          {children}
        </div>
      )}
    </div>
  );
}

AccordionSection.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
  defaultOpen: PropTypes.bool,
};

/**
 * Modal affichant tous les détails scientifiques d'une évidence
 */
export default function ScientificDetailsModal({ evidence, onClose }) {
  if (!evidence) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal - Fixed Layout */}
      <div className="relative z-10 flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl dark:bg-neutral-900">
        {/* Header - Fixed */}
        <div className="flex shrink-0 items-start justify-between border-b border-neutral-200 px-6 py-4 dark:border-neutral-700">
          <div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              Détails Scientifiques
            </h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {evidence.remedyCommonName} • {evidence.symptom} •{" "}
              {evidence.property}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {/* Outlet - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {/* 1. Méthodologie */}
          {evidence.methodology ? (
            <AccordionSection
              title="Méthodologie Complète"
              icon={IoInformationCircleOutline}
              defaultOpen={true}
            >
              <div className="space-y-3">
                {evidence.methodology.studyCollection && (
                  <div>
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">
                      📚 Collection des Études
                    </h4>
                    <div className="mt-1 space-y-1 text-xs">
                      <p>
                        <strong>Bases de données :</strong>{" "}
                        {evidence.methodology.studyCollection.databases?.join(
                          ", ",
                        )}
                      </p>
                      <p>
                        <strong>Période de recherche :</strong>{" "}
                        {evidence.methodology.studyCollection.searchPeriod}
                      </p>
                      <p>
                        <strong>Mots-clés :</strong>{" "}
                        {evidence.methodology.studyCollection.keywords?.join(
                          ", ",
                        )}
                      </p>
                      {evidence.methodology.studyCollection
                        .inclusionCriteria && (
                        <div>
                          <strong>Critères d&apos;inclusion :</strong>
                          <ul className="ml-4 list-disc">
                            {evidence.methodology.studyCollection.inclusionCriteria.map(
                              (c, i) => (
                                <li key={i}>{c}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {evidence.methodology.methodologicalEvaluation && (
                  <div className="rounded bg-neutral-50 p-2 dark:bg-neutral-800">
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">
                      🔍 Évaluation Méthodologique
                    </h4>
                    <p className="mt-1 text-xs">
                      {evidence.methodology.methodologicalEvaluation.process}
                    </p>
                  </div>
                )}

                {evidence.methodology.clinicalSynthesis && (
                  <div className="rounded bg-emerald-50 p-2 dark:bg-emerald-900/20">
                    <h4 className="font-semibold text-emerald-800 dark:text-emerald-200">
                      💊 Synthèse Clinique
                    </h4>
                    <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-300">
                      {evidence.methodology.clinicalSynthesis}
                    </p>
                  </div>
                )}
              </div>
            </AccordionSection>
          ) : (
            <div className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-700">
              <div className="flex items-center gap-2">
                <IoInformationCircleOutline className="h-5 w-5 text-neutral-400" />
                <span className="font-semibold text-neutral-900 dark:text-white">
                  Méthodologie Complète
                </span>
              </div>
              <p className="mt-2 text-sm text-neutral-400 italic dark:text-neutral-500">
                Aucune donnée disponible
              </p>
            </div>
          )}

          {/* 2. Hiérarchie des études */}
          {evidence.studyHierarchy ? (
            <AccordionSection
              title="Hiérarchie des Études"
              icon={IoListOutline}
              defaultOpen={true}
            >
              <div className="space-y-2">
                <p className="text-xs">
                  <strong>Niveau le plus élevé :</strong> Niveau{" "}
                  {evidence.studyHierarchy.highestLevel} -{" "}
                  {evidence.studyHierarchy.levelDescription}
                </p>
                {evidence.studyHierarchy.studies?.map((study, idx) => (
                  <div
                    key={idx}
                    className="rounded border border-neutral-200 p-2 dark:border-neutral-700"
                  >
                    <p className="text-xs font-semibold">
                      Niveau {study.level} - {study.type} ({study.count} études,{" "}
                      {study.totalParticipants} participants)
                    </p>
                    <p className="mt-1 text-xs italic">{study.mainFindings}</p>
                    {study.references && study.references.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {study.references.map((ref, refIdx) => (
                          <div key={refIdx} className="flex gap-1">
                            {ref.doi && (
                              <a
                                href={`https://doi.org/${ref.doi}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300"
                              >
                                DOI
                              </a>
                            )}
                            {ref.pmid && (
                              <a
                                href={
                                  ref.link ||
                                  `https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300"
                              >
                                PMID: {ref.pmid}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </AccordionSection>
          ) : (
            <div className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-700">
              <div className="flex items-center gap-2">
                <IoListOutline className="h-5 w-5 text-neutral-400" />
                <span className="font-semibold text-neutral-900 dark:text-white">
                  Hiérarchie des Études
                </span>
              </div>
              <p className="mt-2 text-sm text-neutral-400 italic dark:text-neutral-500">
                Aucune donnée disponible
              </p>
            </div>
          )}

          {/* 3. Système GRADE */}
          <AccordionSection
            title="Système GRADE"
            icon={IoRibbonOutline}
            defaultOpen={true}
          >
            <div className="space-y-2">
              <div
                className={`rounded p-3 ${
                  evidence.gradeLevel === "A"
                    ? "bg-green-100 dark:bg-green-900/30"
                    : evidence.gradeLevel === "B"
                      ? "bg-blue-100 dark:bg-blue-900/30"
                      : evidence.gradeLevel === "C"
                        ? "bg-yellow-100 dark:bg-yellow-900/30"
                        : "bg-red-100 dark:bg-red-900/30"
                }`}
              >
                <p className="text-lg font-bold">Grade {evidence.gradeLevel}</p>
                <p className="text-xs">
                  Niveau d&apos;évidence : {evidence.evidenceLevel}
                </p>
              </div>
              {evidence.methodology?.gradingProcess && (
                <div className="text-xs">
                  <p>
                    <strong>Framework :</strong>{" "}
                    {evidence.methodology.gradingProcess.framework}
                  </p>
                  {evidence.methodology.gradingProcess.domains && (
                    <div className="mt-1">
                      <strong>Domaines évalués :</strong>
                      <ul className="ml-4 list-disc">
                        {evidence.methodology.gradingProcess.domains.map(
                          (d, i) => (
                            <li key={i}>{d}</li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </AccordionSection>

          {/* 4. Qualité méthodologique */}
          {evidence.methodologicalQuality ? (
            <AccordionSection
              title="Qualité Méthodologique"
              icon={IoShieldCheckmarkOutline}
              defaultOpen={true}
            >
              <div className="space-y-3">
                {evidence.methodologicalQuality.rob2 && (
                  <div className="rounded bg-neutral-50 p-2 dark:bg-neutral-800">
                    <h4 className="font-semibold">RoB 2 (Cochrane)</h4>
                    <p className="text-xs">
                      Score global :{" "}
                      {evidence.methodologicalQuality.rob2.overallScore}
                    </p>
                  </div>
                )}
                {evidence.methodologicalQuality.jadad && (
                  <div className="rounded bg-neutral-50 p-2 dark:bg-neutral-800">
                    <h4 className="font-semibold">JADAD Scale</h4>
                    <p className="text-xs">
                      Score : {evidence.methodologicalQuality.jadad.score}/5
                    </p>
                    <p className="text-xs italic">
                      {evidence.methodologicalQuality.jadad.interpretation}
                    </p>
                  </div>
                )}
                {evidence.methodologicalQuality.amstar2 && (
                  <div className="rounded bg-neutral-50 p-2 dark:bg-neutral-800">
                    <h4 className="font-semibold">AMSTAR 2</h4>
                    <p className="text-xs">
                      Qualité : {evidence.methodologicalQuality.amstar2.quality}
                    </p>
                  </div>
                )}
              </div>
            </AccordionSection>
          ) : (
            <div className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-700">
              <div className="flex items-center gap-2">
                <IoShieldCheckmarkOutline className="h-5 w-5 text-neutral-400" />
                <span className="font-semibold text-neutral-900 dark:text-white">
                  Qualité Méthodologique
                </span>
              </div>
              <p className="mt-2 text-sm text-neutral-400 italic dark:text-neutral-500">
                Aucune donnée disponible
              </p>
            </div>
          )}

          {/* 5. Indicateurs statistiques */}
          {evidence.statisticalIndicators ? (
            <AccordionSection
              title="Indicateurs Statistiques"
              icon={IoStatsChartOutline}
              defaultOpen={true}
            >
              <div className="space-y-3">
                {evidence.statisticalIndicators.heterogeneity && (
                  <div className="rounded bg-neutral-50 p-2 dark:bg-neutral-800">
                    <h4 className="font-semibold">Hétérogénéité (I²)</h4>
                    <p className="text-xs">
                      I² = {evidence.statisticalIndicators.heterogeneity.i2}%
                    </p>
                    <p className="text-xs italic">
                      {
                        evidence.statisticalIndicators.heterogeneity
                          .interpretation
                      }
                    </p>
                  </div>
                )}
                {evidence.statisticalIndicators.effectSize && (
                  <div className="rounded bg-emerald-50 p-2 dark:bg-emerald-900/20">
                    <h4 className="font-semibold">Taille d&apos;Effet</h4>
                    <p className="text-xs">
                      {evidence.statisticalIndicators.effectSize.type} :{" "}
                      {evidence.statisticalIndicators.effectSize.value}
                    </p>
                    <p className="text-xs italic">
                      {evidence.statisticalIndicators.effectSize.interpretation}
                    </p>
                  </div>
                )}
              </div>
            </AccordionSection>
          ) : (
            <div className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-700">
              <div className="flex items-center gap-2">
                <IoStatsChartOutline className="h-5 w-5 text-neutral-400" />
                <span className="font-semibold text-neutral-900 dark:text-white">
                  Indicateurs Statistiques
                </span>
              </div>
              <p className="mt-2 text-sm text-neutral-400 italic dark:text-neutral-500">
                Aucune donnée disponible
              </p>
            </div>
          )}

          {/* 6. Standardisation du produit */}
          {evidence.productStandardization ? (
            <AccordionSection
              title="Standardisation du Produit"
              icon={IoFlaskOutline}
              defaultOpen={true}
            >
              <div className="space-y-2">
                {evidence.productStandardization.extract && (
                  <p className="text-xs">
                    <strong>Type d&apos;extrait :</strong>{" "}
                    {evidence.productStandardization.extract}
                  </p>
                )}
                {evidence.productStandardization.dosage && (
                  <div className="rounded bg-neutral-50 p-2 dark:bg-neutral-800">
                    <h4 className="text-xs font-semibold">Posologie</h4>
                    <p className="text-xs">
                      Dose recommandée :{" "}
                      {evidence.productStandardization.dosage.recommended}
                    </p>
                    {evidence.productStandardization.dosage.duration && (
                      <p className="text-xs">
                        Durée :{" "}
                        {evidence.productStandardization.dosage.duration}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </AccordionSection>
          ) : (
            <div className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-700">
              <div className="flex items-center gap-2">
                <IoFlaskOutline className="h-5 w-5 text-neutral-400" />
                <span className="font-semibold text-neutral-900 dark:text-white">
                  Standardisation du Produit
                </span>
              </div>
              <p className="mt-2 text-sm text-neutral-400 italic dark:text-neutral-500">
                Aucune donnée disponible
              </p>
            </div>
          )}

          {/* 7. Signaux d'alerte */}
          {evidence.alerts && evidence.alerts.length > 0 ? (
            <AccordionSection
              title={`Signaux d'Alerte (${evidence.alerts.length})`}
              icon={IoAlertCircleOutline}
              defaultOpen={true}
            >
              <div className="space-y-2">
                {evidence.alerts.map((alert, idx) => (
                  <div
                    key={idx}
                    className={`rounded border-l-4 p-2 ${
                      alert.severity === "critical"
                        ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                        : alert.severity === "high"
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                          : alert.severity === "moderate"
                            ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                            : "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    }`}
                  >
                    <p className="text-xs font-semibold">
                      {alert.type} - {alert.severity}
                    </p>
                    <p className="mt-1 text-xs">{alert.description}</p>
                    {alert.recommendation && (
                      <p className="mt-1 text-xs italic">
                        💡 {alert.recommendation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </AccordionSection>
          ) : (
            <div className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-700">
              <div className="flex items-center gap-2">
                <IoAlertCircleOutline className="h-5 w-5 text-neutral-400" />
                <span className="font-semibold text-neutral-900 dark:text-white">
                  Signaux d&apos;Alerte
                </span>
              </div>
              <p className="mt-2 text-sm text-neutral-400 italic dark:text-neutral-500">
                Aucun signal d&apos;alerte
              </p>
            </div>
          )}

          {/* 8. Transparence */}
          {evidence.transparency ? (
            <AccordionSection
              title="Transparence & Traçabilité"
              icon={IoEyeOutline}
              defaultOpen={true}
            >
              <div className="space-y-2 text-xs">
                {evidence.transparency.fundingSources && (
                  <div>
                    <strong>Sources de financement :</strong>
                    <ul className="ml-4 list-disc">
                      {evidence.transparency.fundingSources.map((source, i) => (
                        <li key={i}>
                          {typeof source === "object"
                            ? source.organization
                            : source}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {evidence.transparency.conflicts && (
                  <p>
                    <strong>Conflits d&apos;intérêt :</strong>{" "}
                    {evidence.transparency.conflicts}
                  </p>
                )}
                {evidence.transparency.lastUpdate && (
                  <p>
                    <strong>Dernière mise à jour :</strong>{" "}
                    {evidence.transparency.lastUpdate}
                  </p>
                )}
              </div>
            </AccordionSection>
          ) : (
            <div className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-700">
              <div className="flex items-center gap-2">
                <IoEyeOutline className="h-5 w-5 text-neutral-400" />
                <span className="font-semibold text-neutral-900 dark:text-white">
                  Transparence & Traçabilité
                </span>
              </div>
              <p className="mt-2 text-sm text-neutral-400 italic dark:text-neutral-500">
                Aucune donnée disponible
              </p>
            </div>
          )}
        </div>

        {/* Footer - Fixed */}
        <div className="shrink-0 border-t border-neutral-200 px-6 py-4 dark:border-neutral-700">
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

ScientificDetailsModal.propTypes = {
  evidence: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};
