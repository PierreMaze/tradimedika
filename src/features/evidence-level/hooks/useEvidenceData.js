import { useMemo } from "react";
import dbOriginal from "../../../data/db.json";
import evidenceBaseData from "../../../data/evidenceBase.json";
import { EVIDENCE_LEVEL_ORDER } from "../constants/evidenceLevelConfig";

/**
 * Hook principal pour récupérer les données de niveau de preuve
 * Fonctionne avec les deux systèmes: ancien (db.json) et nouveau (evidenceBase.json)
 */
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

/**
 * Hook pour récupérer les données détaillées d'évidence depuis evidenceBase.json
 *
 * @param {string} remedyKey - Clé du produit naturel (ex: "gingembre")
 * @param {string} evidenceId - ID spécifique de l'évidence (optionnel)
 */
export function useEvidenceDetails(remedyKey = null, evidenceId = null) {
  const data = useMemo(() => {
    if (!remedyKey) {
      return evidenceBaseData;
    }

    const remedyEvidence = evidenceBaseData[remedyKey];
    if (!remedyEvidence) {
      return null;
    }

    if (!evidenceId) {
      return remedyEvidence;
    }

    const specificEvidence = remedyEvidence.evidences?.find(
      (ev) => ev.id === evidenceId,
    );

    if (!specificEvidence) {
      return null;
    }

    // Si l'évidence est liée, récupérer l'évidence principale
    if (specificEvidence.linkedEvidence) {
      const linkedEvidence = remedyEvidence.evidences?.find(
        (ev) => ev.id === specificEvidence.linkedEvidence,
      );
      return { ...specificEvidence, linkedData: linkedEvidence };
    }

    return specificEvidence;
  }, [remedyKey, evidenceId]);

  return data;
}

/**
 * Hook pour récupérer toutes les évidences détaillées (pour tableau)
 * Combine db.json et evidenceBase.json
 */
export function useAllEvidences() {
  const evidences = useMemo(() => {
    const allEvidences = [];

    Object.entries(evidenceBaseData).forEach(([remedyKey, remedyData]) => {
      const remedyInfo = dbOriginal.find(
        (remedy) => remedy.evidenceBaseKey === remedyKey,
      );

      remedyData.evidences?.forEach((evidence) => {
        // Ignorer les évidences liées (on prend les principales seulement)
        if (evidence.linkedEvidence) return;

        allEvidences.push({
          ...evidence,
          remedyKey,
          remedyCommonName: remedyData.commonName,
          remedyScientificName: remedyData.scientificName,
          remedyId: remedyData.remedyId,
          remedyInfo: remedyInfo || null,
        });
      });
    });

    return allEvidences;
  }, []);

  return evidences;
}

/**
 * Hook pour filtrer les évidences
 *
 * @param {Object} filters - { gradeLevel, symptom, property, remedy }
 */
export function useFilteredEvidences(filters = {}) {
  const allEvidences = useAllEvidences();

  const filteredEvidences = useMemo(() => {
    if (!allEvidences || allEvidences.length === 0) {
      return [];
    }

    let filtered = [...allEvidences];

    if (filters.gradeLevel) {
      filtered = filtered.filter((ev) => ev.gradeLevel === filters.gradeLevel);
    }

    if (filters.symptom) {
      filtered = filtered.filter((ev) =>
        ev.symptom?.toLowerCase().includes(filters.symptom.toLowerCase()),
      );
    }

    if (filters.property) {
      filtered = filtered.filter((ev) =>
        ev.property?.toLowerCase().includes(filters.property.toLowerCase()),
      );
    }

    if (filters.remedy) {
      filtered = filtered.filter(
        (ev) =>
          ev.remedyCommonName
            ?.toLowerCase()
            .includes(filters.remedy.toLowerCase()) ||
          ev.remedyScientificName
            ?.toLowerCase()
            .includes(filters.remedy.toLowerCase()),
      );
    }

    return filtered;
  }, [allEvidences, filters]);

  return filteredEvidences;
}
