import {
  AgeCriteriaSection,
  AlertSignalsSection,
  EvidenceLevelStats,
  EvidenceLevelTable,
  LegalDisclaimer,
  TransparencySection,
  useEvidenceData,
} from "..";
import EvidenceLevelMethodology from "../components/EvidenceLevelMethodology";

export default function EvidenceLevelPage() {
  const { products, stats } = useEvidenceData();

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="flex items-center gap-3 text-2xl font-bold text-neutral-800 dark:text-white">
          Niveaux de preuve scientifique
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Méthodologie rigoureuse basée sur les standards internationaux (GRADE,
          HAS, Cochrane) pour évaluer la qualité des preuves scientifiques.
        </p>
      </div>

      {/* 1. Méthodologie scientifique - Sans cadre */}
      <EvidenceLevelMethodology />

      {/* 2. Critères d'âge et exclusions */}
      <AgeCriteriaSection />

      {/* 3. Signaux d'alerte */}
      <AlertSignalsSection />

      {/* 4. Transparence et traçabilité */}
      <TransparencySection />

      {/* 6. Cadre légal - Ouvert par défaut */}
      <LegalDisclaimer />

      {/* 5. Stats par niveau */}
      <EvidenceLevelStats stats={stats} />

      {/* 7. Tableau filtrable */}
      <EvidenceLevelTable products={products} />
    </div>
  );
}
