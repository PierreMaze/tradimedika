import { Tooltip } from "@/components/ui/tooltip";
import PropTypes from "prop-types";
import { FiPackage } from "react-icons/fi";

/**
 * Tooltip affichant la standardisation du produit (extrait, dosage, forme galénique)
 */
const StandardizationTooltip = ({ productStandardization }) => {
  if (!productStandardization) return null;

  const scoreColors = {
    high: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    moderate:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    low: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  return (
    <Tooltip
      content={
        <div className="space-y-3">
          <h4 className="text-base font-bold text-gray-900 dark:text-white">
            📦 Standardisation du Produit
          </h4>

          {/* Score de standardisation */}
          {productStandardization.standardizationScore && (
            <div
              className={`rounded-md p-2 ${scoreColors[productStandardization.standardizationScore] || scoreColors.low}`}
            >
              <p className="text-sm font-bold">
                Niveau de standardisation:{" "}
                {productStandardization.standardizationScore === "high"
                  ? "Élevé"
                  : productStandardization.standardizationScore === "moderate"
                    ? "Modéré"
                    : "Faible"}
              </p>
              {productStandardization.standardizationJustification && (
                <p className="mt-1 text-xs">
                  {productStandardization.standardizationJustification}
                </p>
              )}
            </div>
          )}

          {/* Type d'extrait */}
          {productStandardization.extract && (
            <div className="text-xs text-gray-700 dark:text-gray-300">
              <strong>Type d&apos;extrait:</strong>{" "}
              {productStandardization.extract}
            </div>
          )}

          {/* Composés actifs */}
          {productStandardization.activeCompounds &&
            productStandardization.activeCompounds.length > 0 && (
              <div className="rounded-md border border-gray-200 p-2 dark:border-gray-600">
                <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                  Composés Actifs
                </h5>
                <div className="mt-1 space-y-1">
                  {productStandardization.activeCompounds.map(
                    (compound, idx) => (
                      <div
                        key={idx}
                        className="rounded bg-gray-50 p-1.5 text-xs dark:bg-gray-700"
                      >
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                          {compound.name}
                        </p>
                        {compound.concentration && (
                          <p className="text-gray-600 dark:text-gray-400">
                            Concentration: {compound.concentration}
                          </p>
                        )}
                        {compound.role && (
                          <p className="text-gray-600 dark:text-gray-400">
                            Rôle: {compound.role}
                          </p>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

          {/* Dosage */}
          {productStandardization.dosage && (
            <div className="rounded-md border border-gray-200 p-2 dark:border-gray-600">
              <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                Posologie Étudiée
              </h5>
              <div className="mt-1 space-y-0.5 text-xs text-gray-700 dark:text-gray-300">
                {productStandardization.dosage.recommended && (
                  <p>
                    <strong>Dose recommandée:</strong>{" "}
                    {productStandardization.dosage.recommended}
                  </p>
                )}
                {productStandardization.dosage.range && (
                  <p>
                    <strong>Fourchette:</strong>{" "}
                    {productStandardization.dosage.range}
                  </p>
                )}
                {productStandardization.dosage.fractionation && (
                  <p>
                    <strong>Fractionnement:</strong>{" "}
                    {productStandardization.dosage.fractionation}
                  </p>
                )}
                {productStandardization.dosage.timing && (
                  <p>
                    <strong>Moment prise:</strong>{" "}
                    {productStandardization.dosage.timing}
                  </p>
                )}
                {productStandardization.dosage.duration && (
                  <p>
                    <strong>Durée:</strong>{" "}
                    {productStandardization.dosage.duration}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Formes galéniques */}
          {productStandardization.galenic &&
            productStandardization.galenic.length > 0 && (
              <div className="rounded-md border border-gray-200 p-2 dark:border-gray-600">
                <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                  Formes Galéniques Étudiées
                </h5>
                <div className="mt-1 space-y-1">
                  {productStandardization.galenic.map((form, idx) => (
                    <div
                      key={idx}
                      className="rounded bg-gray-50 p-1.5 text-xs dark:bg-gray-700"
                    >
                      <p className="font-medium text-gray-800 capitalize dark:text-gray-200">
                        {typeof form === "object" ? form.form : form}
                      </p>
                      {typeof form === "object" && (
                        <>
                          {form.advantage && (
                            <p className="text-gray-600 dark:text-gray-400">
                              Avantage: {form.advantage}
                            </p>
                          )}
                          {form.standardization && (
                            <p className="text-gray-600 dark:text-gray-400">
                              Standardisation: {form.standardization}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Biodisponibilité */}
          {productStandardization.bioavailability && (
            <div className="rounded-md border border-gray-200 p-2 dark:border-gray-600">
              <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                Biodisponibilité
              </h5>
              <div className="mt-1 space-y-0.5 text-xs text-gray-700 dark:text-gray-300">
                {productStandardization.bioavailability
                  .absoluteBioavailability && (
                  <p>
                    <strong>Biodisponibilité absolue:</strong>{" "}
                    {
                      productStandardization.bioavailability
                        .absoluteBioavailability
                    }
                  </p>
                )}
                {productStandardization.bioavailability.enhancers && (
                  <p>
                    <strong>Améliorateurs absorption:</strong>{" "}
                    {Array.isArray(
                      productStandardization.bioavailability.enhancers,
                    )
                      ? productStandardization.bioavailability.enhancers.join(
                          ", ",
                        )
                      : productStandardization.bioavailability.enhancers}
                  </p>
                )}
                {productStandardization.bioavailability.peakPlasma && (
                  <p>
                    <strong>Pic plasmatique:</strong>{" "}
                    {productStandardization.bioavailability.peakPlasma}
                  </p>
                )}
                {productStandardization.bioavailability.halfLife && (
                  <p>
                    <strong>Demi-vie:</strong>{" "}
                    {productStandardization.bioavailability.halfLife}
                  </p>
                )}
                {productStandardization.bioavailability.limitingFactor && (
                  <p className="mt-1 rounded bg-yellow-50 p-1 italic dark:bg-yellow-900/20">
                    ⚠ Facteur limitant:{" "}
                    {productStandardization.bioavailability.limitingFactor}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      }
      placement="top"
      className="max-w-[500px]"
    >
      <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
        <FiPackage className="h-3 w-3" />
        Standardisation
      </span>
    </Tooltip>
  );
};

StandardizationTooltip.propTypes = {
  productStandardization: PropTypes.shape({
    extract: PropTypes.string,
    activeCompounds: PropTypes.arrayOf(PropTypes.object),
    dosage: PropTypes.object,
    galenic: PropTypes.array,
    standardizationScore: PropTypes.oneOf(["high", "moderate", "low"]),
    standardizationJustification: PropTypes.string,
    bioavailability: PropTypes.object,
  }),
};

export default StandardizationTooltip;
