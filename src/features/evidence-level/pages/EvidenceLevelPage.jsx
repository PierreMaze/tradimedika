import {
  EvidenceLevelLegend,
  EvidenceLevelStats,
  EvidenceLevelTable,
  useEvidenceData,
} from "..";

export default function EvidenceLevelPage() {
  const { products, stats } = useEvidenceData();

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="flex items-center gap-3 text-2xl font-bold text-neutral-800 dark:text-white">
          Niveau de preuve scientifique
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Consulter les études et la fiabilité des recommandations sur les
          produits naturels
        </p>
      </div>

      {/* Légende HAS */}
      <EvidenceLevelLegend />

      {/* Stats par niveau */}
      <EvidenceLevelStats stats={stats} />

      {/* Tableau filtrable */}
      <EvidenceLevelTable products={products} />
    </div>
  );
}
