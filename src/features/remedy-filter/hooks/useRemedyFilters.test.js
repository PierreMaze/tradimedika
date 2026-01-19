import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { INITIAL_FILTERS } from "../utils/filterRemedies";
import { useRemedyFilters } from "./useRemedyFilters";

describe("useRemedyFilters", () => {
  describe("État initial", () => {
    it("devrait initialiser avec la modal fermée", () => {
      const { result } = renderHook(() => useRemedyFilters());

      expect(result.current.isModalOpen).toBe(false);
    });

    it("devrait initialiser avec des filtres vides", () => {
      const { result } = renderHook(() => useRemedyFilters());

      expect(result.current.appliedFilters).toEqual(INITIAL_FILTERS);
      expect(result.current.tempFilters).toEqual(INITIAL_FILTERS);
    });

    it("devrait initialiser hasAppliedFilters à false", () => {
      const { result } = renderHook(() => useRemedyFilters());

      expect(result.current.hasAppliedFilters).toBe(false);
    });

    it("devrait initialiser appliedFiltersCount à 0", () => {
      const { result } = renderHook(() => useRemedyFilters());

      expect(result.current.appliedFiltersCount).toBe(0);
    });
  });

  describe("Gestion de la modal", () => {
    it("openModal devrait ouvrir la modal", () => {
      const { result } = renderHook(() => useRemedyFilters());

      act(() => {
        result.current.openModal();
      });

      expect(result.current.isModalOpen).toBe(true);
    });

    it("openModal devrait copier les filtres appliqués dans les filtres temporaires", () => {
      const { result } = renderHook(() => useRemedyFilters());

      // Appliquer des filtres
      act(() => {
        result.current.toggleTempFilter("pregnancy", "ok");
        result.current.applyFilters();
      });

      // Modifier les filtres temporaires
      act(() => {
        result.current.toggleTempFilter("verified", "verified");
      });

      // Ouvrir la modal
      act(() => {
        result.current.openModal();
      });

      // Les filtres temporaires doivent être réinitialisés aux filtres appliqués
      expect(result.current.tempFilters).toEqual(result.current.appliedFilters);
    });

    it("closeModal devrait fermer la modal", () => {
      const { result } = renderHook(() => useRemedyFilters());

      act(() => {
        result.current.openModal();
      });

      expect(result.current.isModalOpen).toBe(true);

      act(() => {
        result.current.closeModal();
      });

      expect(result.current.isModalOpen).toBe(false);
    });

    it("closeModal devrait annuler les modifications temporaires", () => {
      const { result } = renderHook(() => useRemedyFilters());

      // Appliquer un filtre
      act(() => {
        result.current.toggleTempFilter("pregnancy", "ok");
        result.current.applyFilters();
      });

      // Ouvrir la modal et modifier les filtres temporaires
      act(() => {
        result.current.openModal();
        result.current.toggleTempFilter("pregnancy", "ok");
        result.current.toggleTempFilter("verified", "verified");
      });

      // Fermer sans appliquer
      act(() => {
        result.current.closeModal();
      });

      // Les filtres temporaires doivent être restaurés
      expect(result.current.tempFilters).toEqual(result.current.appliedFilters);
    });
  });

  describe("Toggle des filtres temporaires", () => {
    it("devrait activer un filtre temporaire", () => {
      const { result } = renderHook(() => useRemedyFilters());

      act(() => {
        result.current.toggleTempFilter("pregnancy", "ok");
      });

      expect(result.current.tempFilters.pregnancy.ok).toBe(true);
    });

    it("devrait désactiver un filtre temporaire", () => {
      const { result } = renderHook(() => useRemedyFilters());

      act(() => {
        result.current.toggleTempFilter("pregnancy", "ok");
        result.current.toggleTempFilter("pregnancy", "ok");
      });

      expect(result.current.tempFilters.pregnancy.ok).toBe(false);
    });

    it("devrait gérer plusieurs filtres dans la même catégorie", () => {
      const { result } = renderHook(() => useRemedyFilters());

      act(() => {
        result.current.toggleTempFilter("pregnancy", "ok");
        result.current.toggleTempFilter("pregnancy", "variant");
      });

      expect(result.current.tempFilters.pregnancy.ok).toBe(true);
      expect(result.current.tempFilters.pregnancy.variant).toBe(true);
      expect(result.current.tempFilters.pregnancy.interdit).toBe(false);
    });

    it("devrait gérer plusieurs filtres de catégories différentes", () => {
      const { result } = renderHook(() => useRemedyFilters());

      act(() => {
        result.current.toggleTempFilter("pregnancy", "ok");
        result.current.toggleTempFilter("verified", "verified");
        result.current.toggleTempFilter("children", "allAges");
      });

      expect(result.current.tempFilters.pregnancy.ok).toBe(true);
      expect(result.current.tempFilters.verified.verified).toBe(true);
      expect(result.current.tempFilters.children.allAges).toBe(true);
    });

    it("ne devrait pas affecter les filtres appliqués", () => {
      const { result } = renderHook(() => useRemedyFilters());

      const initialAppliedFilters = result.current.appliedFilters;

      act(() => {
        result.current.toggleTempFilter("pregnancy", "ok");
      });

      expect(result.current.appliedFilters).toEqual(initialAppliedFilters);
    });
  });

  describe("Réinitialisation des filtres temporaires", () => {
    it("resetTempFilters devrait réinitialiser uniquement les filtres temporaires", () => {
      const { result } = renderHook(() => useRemedyFilters());

      act(() => {
        result.current.toggleTempFilter("pregnancy", "ok");
        result.current.toggleTempFilter("verified", "verified");
      });

      act(() => {
        result.current.resetTempFilters();
      });

      expect(result.current.tempFilters).toEqual(INITIAL_FILTERS);
    });

    it("resetTempFilters ne devrait pas affecter les filtres appliqués", () => {
      const { result } = renderHook(() => useRemedyFilters());

      act(() => {
        result.current.toggleTempFilter("pregnancy", "ok");
        result.current.applyFilters();
      });

      const appliedBeforeReset = result.current.appliedFilters;

      act(() => {
        result.current.toggleTempFilter("verified", "verified");
        result.current.resetTempFilters();
      });

      expect(result.current.appliedFilters).toEqual(appliedBeforeReset);
    });
  });

  describe("Application des filtres", () => {
    it("applyFilters devrait appliquer les filtres temporaires", () => {
      const { result } = renderHook(() => useRemedyFilters());

      act(() => {
        result.current.toggleTempFilter("pregnancy", "ok");
        result.current.toggleTempFilter("verified", "verified");
      });

      act(() => {
        result.current.applyFilters();
      });

      expect(result.current.appliedFilters.pregnancy.ok).toBe(true);
      expect(result.current.appliedFilters.verified.verified).toBe(true);
    });

    it("applyFilters devrait fermer la modal", () => {
      const { result } = renderHook(() => useRemedyFilters());

      act(() => {
        result.current.openModal();
        result.current.toggleTempFilter("pregnancy", "ok");
      });

      act(() => {
        result.current.applyFilters();
      });

      expect(result.current.isModalOpen).toBe(false);
    });

    it("applyFilters devrait synchroniser tempFilters avec appliedFilters", () => {
      const { result } = renderHook(() => useRemedyFilters());

      act(() => {
        result.current.toggleTempFilter("pregnancy", "ok");
        result.current.applyFilters();
      });

      expect(result.current.tempFilters).toEqual(result.current.appliedFilters);
    });
  });

  describe("Réinitialisation complète", () => {
    it("resetAndApplyFilters devrait réinitialiser les deux états", () => {
      const { result } = renderHook(() => useRemedyFilters());

      act(() => {
        result.current.toggleTempFilter("pregnancy", "ok");
        result.current.applyFilters();
      });

      act(() => {
        result.current.resetAndApplyFilters();
      });

      expect(result.current.appliedFilters).toEqual(INITIAL_FILTERS);
      expect(result.current.tempFilters).toEqual(INITIAL_FILTERS);
    });

    it("resetAndApplyFilters ne devrait pas fermer la modal", () => {
      const { result } = renderHook(() => useRemedyFilters());

      act(() => {
        result.current.openModal();
      });

      act(() => {
        result.current.resetAndApplyFilters();
      });

      expect(result.current.isModalOpen).toBe(true);
    });
  });

  describe("Compteur de filtres appliqués", () => {
    it("devrait compter correctement un filtre actif", () => {
      const { result } = renderHook(() => useRemedyFilters());

      act(() => {
        result.current.toggleTempFilter("pregnancy", "ok");
        result.current.applyFilters();
      });

      expect(result.current.appliedFiltersCount).toBe(1);
    });

    it("devrait compter correctement plusieurs filtres", () => {
      const { result } = renderHook(() => useRemedyFilters());

      act(() => {
        result.current.toggleTempFilter("pregnancy", "ok");
        result.current.toggleTempFilter("pregnancy", "variant");
        result.current.toggleTempFilter("verified", "verified");
        result.current.applyFilters();
      });

      expect(result.current.appliedFiltersCount).toBe(3);
    });

    it("devrait retourner 0 si aucun filtre n'est actif", () => {
      const { result } = renderHook(() => useRemedyFilters());

      expect(result.current.appliedFiltersCount).toBe(0);
    });

    it("ne devrait pas compter les filtres temporaires non appliqués", () => {
      const { result } = renderHook(() => useRemedyFilters());

      act(() => {
        result.current.toggleTempFilter("pregnancy", "ok");
        result.current.toggleTempFilter("verified", "verified");
      });

      expect(result.current.appliedFiltersCount).toBe(0);
    });
  });

  describe("hasAppliedFilters", () => {
    it("devrait être false sans filtres appliqués", () => {
      const { result } = renderHook(() => useRemedyFilters());

      expect(result.current.hasAppliedFilters).toBe(false);
    });

    it("devrait être true avec des filtres appliqués", () => {
      const { result } = renderHook(() => useRemedyFilters());

      act(() => {
        result.current.toggleTempFilter("pregnancy", "ok");
        result.current.applyFilters();
      });

      expect(result.current.hasAppliedFilters).toBe(true);
    });

    it("devrait être false après réinitialisation", () => {
      const { result } = renderHook(() => useRemedyFilters());

      act(() => {
        result.current.toggleTempFilter("pregnancy", "ok");
        result.current.applyFilters();
      });

      act(() => {
        result.current.resetAndApplyFilters();
      });

      expect(result.current.hasAppliedFilters).toBe(false);
    });

    it("ne devrait pas considérer les filtres temporaires non appliqués", () => {
      const { result } = renderHook(() => useRemedyFilters());

      act(() => {
        result.current.toggleTempFilter("pregnancy", "ok");
      });

      expect(result.current.hasAppliedFilters).toBe(false);
    });
  });

  describe("Valeurs de retour", () => {
    it("devrait retourner toutes les propriétés requises", () => {
      const { result } = renderHook(() => useRemedyFilters());

      expect(result.current).toHaveProperty("isModalOpen");
      expect(result.current).toHaveProperty("openModal");
      expect(result.current).toHaveProperty("closeModal");
      expect(result.current).toHaveProperty("appliedFilters");
      expect(result.current).toHaveProperty("tempFilters");
      expect(result.current).toHaveProperty("toggleTempFilter");
      expect(result.current).toHaveProperty("resetTempFilters");
      expect(result.current).toHaveProperty("applyFilters");
      expect(result.current).toHaveProperty("resetAndApplyFilters");
      expect(result.current).toHaveProperty("hasAppliedFilters");
      expect(result.current).toHaveProperty("appliedFiltersCount");
    });

    it("devrait retourner des fonctions pour les actions", () => {
      const { result } = renderHook(() => useRemedyFilters());

      expect(typeof result.current.openModal).toBe("function");
      expect(typeof result.current.closeModal).toBe("function");
      expect(typeof result.current.toggleTempFilter).toBe("function");
      expect(typeof result.current.resetTempFilters).toBe("function");
      expect(typeof result.current.applyFilters).toBe("function");
      expect(typeof result.current.resetAndApplyFilters).toBe("function");
    });

    it("devrait retourner des types corrects pour les propriétés", () => {
      const { result } = renderHook(() => useRemedyFilters());

      expect(typeof result.current.isModalOpen).toBe("boolean");
      expect(typeof result.current.appliedFilters).toBe("object");
      expect(typeof result.current.tempFilters).toBe("object");
      expect(typeof result.current.hasAppliedFilters).toBe("boolean");
      expect(typeof result.current.appliedFiltersCount).toBe("number");
    });
  });

  describe("Scénarios d'utilisation réels", () => {
    it("devrait simuler le workflow complet d'utilisation", () => {
      const { result } = renderHook(() => useRemedyFilters());

      // 1. Ouvrir la modal
      act(() => {
        result.current.openModal();
      });
      expect(result.current.isModalOpen).toBe(true);

      // 2. Sélectionner des filtres
      act(() => {
        result.current.toggleTempFilter("pregnancy", "ok");
        result.current.toggleTempFilter("verified", "verified");
      });
      expect(result.current.tempFilters.pregnancy.ok).toBe(true);
      expect(result.current.tempFilters.verified.verified).toBe(true);

      // 3. Appliquer
      act(() => {
        result.current.applyFilters();
      });
      expect(result.current.isModalOpen).toBe(false);
      expect(result.current.appliedFilters.pregnancy.ok).toBe(true);
      expect(result.current.appliedFilters.verified.verified).toBe(true);
      expect(result.current.appliedFiltersCount).toBe(2);
    });

    it("devrait simuler l'annulation d'un changement", () => {
      const { result } = renderHook(() => useRemedyFilters());

      // Appliquer un premier filtre
      act(() => {
        result.current.toggleTempFilter("pregnancy", "ok");
        result.current.applyFilters();
      });

      // Ouvrir et modifier
      act(() => {
        result.current.openModal();
        result.current.toggleTempFilter("pregnancy", "ok");
        result.current.toggleTempFilter("verified", "verified");
      });

      // Annuler
      act(() => {
        result.current.closeModal();
      });

      expect(result.current.appliedFilters.pregnancy.ok).toBe(true);
      expect(result.current.appliedFilters.verified.verified).toBe(false);
    });

    it("devrait simuler la réinitialisation depuis le bouton", () => {
      const { result } = renderHook(() => useRemedyFilters());

      // Appliquer des filtres
      act(() => {
        result.current.toggleTempFilter("pregnancy", "ok");
        result.current.toggleTempFilter("verified", "verified");
        result.current.applyFilters();
      });

      expect(result.current.appliedFiltersCount).toBe(2);

      // Réinitialiser directement
      act(() => {
        result.current.resetAndApplyFilters();
      });

      expect(result.current.appliedFiltersCount).toBe(0);
      expect(result.current.hasAppliedFilters).toBe(false);
    });
  });
});
