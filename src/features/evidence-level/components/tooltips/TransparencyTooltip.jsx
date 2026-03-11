import { Tooltip } from "@/components/ui/tooltip";
import PropTypes from "prop-types";
import { FiEye } from "react-icons/fi";

/**
 * Tooltip affichant transparence et traçabilité (financement, conflits, reviewers, etc.)
 */
const TransparencyTooltip = ({ transparency }) => {
  if (!transparency) return null;

  return (
    <Tooltip
      content={
        <div className="space-y-3">
          <h4 className="text-base font-bold text-gray-900 dark:text-white">
            👁 Transparence & Traçabilité
          </h4>

          {/* Sources de financement */}
          {transparency.fundingSources &&
            transparency.fundingSources.length > 0 && (
              <div className="rounded-md border border-gray-200 p-2 dark:border-gray-600">
                <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                  Sources de Financement
                </h5>
                <div className="mt-1 space-y-1">
                  {transparency.fundingSources.map((source, idx) => (
                    <div
                      key={idx}
                      className="rounded bg-gray-50 p-1.5 text-xs dark:bg-gray-700"
                    >
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {source.organization || source}
                      </p>
                      {typeof source === "object" && (
                        <>
                          {source.country && (
                            <p className="text-gray-600 dark:text-gray-400">
                              Pays: {source.country}
                            </p>
                          )}
                          {source.type && (
                            <p className="text-gray-600 dark:text-gray-400">
                              Type:{" "}
                              {source.type === "public"
                                ? "Public"
                                : source.type === "non-profit"
                                  ? "Non-lucratif"
                                  : source.type}
                            </p>
                          )}
                          {source.conflictRisk && (
                            <p className="text-gray-600 dark:text-gray-400">
                              Risque conflit:{" "}
                              {source.conflictRisk === "aucun"
                                ? "Aucun"
                                : source.conflictRisk}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Conflits d'intérêt */}
          {transparency.conflicts && (
            <div className="rounded-md bg-green-50 p-2 dark:bg-green-900/20">
              <p className="text-xs font-medium text-gray-800 dark:text-gray-200">
                ✅ Conflits d&apos;intérêt
              </p>
              <p className="mt-0.5 text-xs text-gray-700 dark:text-gray-300">
                {transparency.conflicts}
              </p>
            </div>
          )}

          {/* Disponibilité des données */}
          {transparency.dataAvailability && (
            <div className="rounded-md border border-gray-200 p-2 dark:border-gray-600">
              <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                Disponibilité des Données
              </h5>
              <div className="mt-1 space-y-0.5 text-xs text-gray-700 dark:text-gray-300">
                {transparency.dataAvailability.rawData && (
                  <p>
                    <strong>Données brutes:</strong>{" "}
                    {transparency.dataAvailability.rawData}
                  </p>
                )}
                {transparency.dataAvailability.supplementaryMaterial && (
                  <p>
                    <strong>Matériel supplémentaire:</strong>{" "}
                    {transparency.dataAvailability.supplementaryMaterial}
                  </p>
                )}
                {transparency.dataAvailability.repositories && (
                  <p>
                    <strong>Dépôts:</strong>{" "}
                    {Array.isArray(transparency.dataAvailability.repositories)
                      ? transparency.dataAvailability.repositories.join(", ")
                      : transparency.dataAvailability.repositories}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Pré-enregistrement */}
          {transparency.preregistration && (
            <div className="rounded-md border border-gray-200 p-2 dark:border-gray-600">
              <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                Pré-enregistrement
              </h5>
              <div className="mt-1 space-y-0.5 text-xs text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Statut:</strong> {transparency.preregistration.status}
                </p>
                {transparency.preregistration.platforms && (
                  <p>
                    <strong>Plateformes:</strong>{" "}
                    {Array.isArray(transparency.preregistration.platforms)
                      ? transparency.preregistration.platforms.join(", ")
                      : transparency.preregistration.platforms}
                  </p>
                )}
                {transparency.preregistration.protocol && (
                  <p className="italic">
                    {transparency.preregistration.protocol}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Reviewers / Experts */}
          {transparency.reviewers && transparency.reviewers.length > 0 && (
            <div className="rounded-md border border-gray-200 p-2 dark:border-gray-600">
              <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                Experts Reviewers
              </h5>
              <div className="mt-1 space-y-1">
                {transparency.reviewers.map((reviewer, idx) => (
                  <div
                    key={idx}
                    className="rounded bg-gray-50 p-1.5 text-xs dark:bg-gray-700"
                  >
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {reviewer.name || reviewer}
                    </p>
                    {typeof reviewer === "object" && (
                      <>
                        {reviewer.specialty && (
                          <p className="text-gray-600 dark:text-gray-400">
                            Spécialité: {reviewer.specialty}
                          </p>
                        )}
                        {reviewer.affiliation && (
                          <p className="text-gray-600 dark:text-gray-400">
                            Affiliation: {reviewer.affiliation}
                          </p>
                        )}
                        {reviewer.role && (
                          <p className="text-gray-600 dark:text-gray-400">
                            Rôle: {reviewer.role}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Peer review */}
          {transparency.peerReview && (
            <div className="text-xs text-gray-700 dark:text-gray-300">
              <strong>Peer-review:</strong> {transparency.peerReview}
            </div>
          )}

          {/* Versioning */}
          {transparency.versioning && (
            <div className="rounded-md border border-gray-200 p-2 dark:border-gray-600">
              <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                Historique des Versions
              </h5>
              <div className="mt-1 space-y-0.5 text-xs text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Version actuelle:</strong>{" "}
                  {transparency.versioning.currentVersion}
                </p>
                {transparency.versioning.changelog &&
                  transparency.versioning.changelog.length > 0 && (
                    <div className="mt-1">
                      <p className="font-medium">Changelog:</p>
                      <div className="mt-1 ml-2 space-y-1">
                        {transparency.versioning.changelog.map((entry, idx) => (
                          <div
                            key={idx}
                            className="rounded bg-gray-50 p-1 dark:bg-gray-700"
                          >
                            <p className="font-medium">
                              v{entry.version} - {entry.date}
                            </p>
                            <p className="text-xs italic opacity-75">
                              {entry.changes}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* Dernière mise à jour */}
          {transparency.lastUpdate && (
            <div className="rounded-md bg-blue-50 p-2 dark:bg-blue-900/20">
              <p className="text-xs text-gray-700 dark:text-gray-300">
                <strong>Dernière mise à jour:</strong> {transparency.lastUpdate}
              </p>
              {transparency.updateFrequency && (
                <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">
                  Fréquence de révision: {transparency.updateFrequency}
                </p>
              )}
            </div>
          )}

          {/* Note */}
          {transparency.note && (
            <div className="rounded-md bg-gray-100 p-2 text-xs italic dark:bg-gray-700">
              {transparency.note}
            </div>
          )}
        </div>
      }
      placement="top"
      className="max-w-[500px]"
    >
      <span className="inline-flex items-center gap-1 rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200">
        <FiEye className="h-3 w-3" />
        Transparence
      </span>
    </Tooltip>
  );
};

TransparencyTooltip.propTypes = {
  transparency: PropTypes.shape({
    fundingSources: PropTypes.array,
    conflicts: PropTypes.string,
    dataAvailability: PropTypes.object,
    preregistration: PropTypes.object,
    lastUpdate: PropTypes.string,
    updateFrequency: PropTypes.string,
    reviewers: PropTypes.array,
    peerReview: PropTypes.string,
    versioning: PropTypes.object,
    note: PropTypes.string,
  }),
};

export default TransparencyTooltip;
