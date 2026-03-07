import { useMemo } from "react";
import dbOriginal from "../../../data/db.json";
import { EVIDENCE_LEVEL_ORDER } from "../constants/evidenceLevelConfig";

export function useEvidenceData() {
  const products = useMemo(() => dbOriginal, []);

  const stats = useMemo(() => {
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    products.forEach((p) => {
      if (p.evidenceLevel && counts[p.evidenceLevel] !== undefined) {
        counts[p.evidenceLevel]++;
      }
    });
    return { ...counts, total: products.length };
  }, [products]);

  const getProductsByLevel = useMemo(() => {
    return (level) => products.filter((p) => p.evidenceLevel === level);
  }, [products]);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      const indexA = EVIDENCE_LEVEL_ORDER.indexOf(a.evidenceLevel);
      const indexB = EVIDENCE_LEVEL_ORDER.indexOf(b.evidenceLevel);
      return indexA - indexB;
    });
  }, [products]);

  return { products: sortedProducts, stats, getProductsByLevel };
}
