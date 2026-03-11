import { useState } from "react";
import {
  IoAlertCircleOutline,
  IoChevronDown,
  IoChevronUp,
} from "react-icons/io5";

export default function AlertSignalsSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border-2 border-orange-300 bg-orange-100 px-4 py-3 text-left transition-colors hover:bg-orange-200 dark:border-orange-800 dark:bg-orange-900/30 dark:hover:bg-orange-900/50"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-orange-900 dark:text-orange-200">
            Signaux d&apos;alerte documentés
          </span>
        </div>
        {isOpen ? (
          <IoChevronUp className="h-5 w-5 text-orange-700 dark:text-orange-400" />
        ) : (
          <IoChevronDown className="h-5 w-5 text-orange-700 dark:text-orange-400" />
        )}
      </button>

      {isOpen && (
        <div className="mt-4 rounded-lg border border-orange-200 bg-white p-4 dark:border-orange-800 dark:bg-neutral-900/50">
          <div className="space-y-4">
            <div className="overflow-x-auto rounded-lg border border-orange-200 dark:border-orange-800">
              <table className="w-full text-xs">
                <thead className="bg-orange-100/50 dark:bg-orange-900/20">
                  <tr className="text-left">
                    <th className="p-2 font-semibold text-neutral-800 dark:text-white">
                      Signal détecté
                    </th>
                    <th className="p-2 font-semibold text-neutral-800 dark:text-white">
                      Action prise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-200 dark:divide-orange-800">
                  <tr className="hover:bg-orange-50/30 dark:hover:bg-orange-900/10">
                    <td className="p-2">
                      <div className="flex items-start gap-2">
                        <IoAlertCircleOutline className="mt-0.5 h-4 w-4 shrink-0 text-orange-600 dark:text-orange-400" />
                        <div>
                          <strong className="text-neutral-800 dark:text-neutral-300">
                            Étude financée par un fabricant
                          </strong>
                          <p className="mt-0.5 text-neutral-600 dark:text-neutral-500">
                            Conflit d&apos;intérêt potentiel
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 text-neutral-700 dark:text-neutral-400">
                      Mention explicite du conflit d&apos;intérêt dans la fiche
                      produit avec badge d&apos;avertissement
                    </td>
                  </tr>
                  <tr className="hover:bg-orange-50/30 dark:hover:bg-orange-900/10">
                    <td className="p-2">
                      <div className="flex items-start gap-2">
                        <IoAlertCircleOutline className="mt-0.5 h-4 w-4 shrink-0 text-orange-600 dark:text-orange-400" />
                        <div>
                          <strong className="text-neutral-800 dark:text-neutral-300">
                            Résultats non répliqués
                          </strong>
                          <p className="mt-0.5 text-neutral-600 dark:text-neutral-500">
                            Étude isolée sans confirmation
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 text-neutral-700 dark:text-neutral-400">
                      Indication <em>&quot;résultat préliminaire&quot;</em> avec
                      recommandation de prudence
                    </td>
                  </tr>
                  <tr className="hover:bg-orange-50/30 dark:hover:bg-orange-900/10">
                    <td className="p-2">
                      <div className="flex items-start gap-2">
                        <IoAlertCircleOutline className="mt-0.5 h-4 w-4 shrink-0 text-orange-600 dark:text-orange-400" />
                        <div>
                          <strong className="text-neutral-800 dark:text-neutral-300">
                            Forte hétérogénéité (I² &gt; 75%)
                          </strong>
                          <p className="mt-0.5 text-neutral-600 dark:text-neutral-500">
                            Résultats incohérents entre études
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 text-neutral-700 dark:text-neutral-400">
                      Mention de la limite méthodologique avec explication de
                      l&apos;hétérogénéité
                    </td>
                  </tr>
                  <tr className="hover:bg-orange-50/30 dark:hover:bg-orange-900/10">
                    <td className="p-2">
                      <div className="flex items-start gap-2">
                        <IoAlertCircleOutline className="mt-0.5 h-4 w-4 shrink-0 text-orange-600 dark:text-orange-400" />
                        <div>
                          <strong className="text-neutral-800 dark:text-neutral-300">
                            Biais de publication suspecté
                          </strong>
                          <p className="mt-0.5 text-neutral-600 dark:text-neutral-500">
                            Résultats négatifs potentiellement non publiés
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 text-neutral-700 dark:text-neutral-400">
                      Indication{" "}
                      <em>&quot;biais de publication possible&quot;</em> avec
                      réduction du niveau de confiance
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 rounded-md border border-orange-200 bg-white p-3 dark:border-orange-800 dark:bg-neutral-900/50">
              <h3 className="mb-2 text-xs font-semibold text-neutral-800 dark:text-white">
                Transparence totale
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Tous les signaux d&apos;alerte sont clairement indiqués sur les
                fiches produits. Notre objectif est de fournir une information
                honnête et complète, incluant les limites des données
                disponibles.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
