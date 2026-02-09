import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { createLogger } from "../../../utils/logger";
import { useCookieConsent } from "../../cookie-consent";

const logger = createLogger("AllergiesContext");

// Migration : IDs anglais → français
const ALLERGEN_MIGRATION_MAP = {
  citrus: "agrumes",
  asteraceae: "asteracees",
  "bee-venom": "venin-abeille",
  "pollen-olive": "pollen-olivier",
};

const AllergiesContext = createContext(undefined);

/**
 * Provider pour gérer les allergies personnalisées de l'utilisateur
 * Contrôle le filtrage strict des remèdes contenant des allergènes dangereux
 */
export function AllergiesProvider({ children }) {
  // CRITIQUE: initialValue doit être [] (array vide) pour validation stricte
  const [userAllergies, setUserAllergies] = useLocalStorage(
    "tradimedika-allergies",
    [],
  );

  // State pour activer/désactiver le filtrage (indépendant des allergies)
  // Par défaut: false pour éviter confusion sur première visite
  const [isFilteringEnabled, setIsFilteringEnabled] = useLocalStorage(
    "tradimedika-allergies-filtering-enabled",
    false,
  );

  const { isAllergiesAccepted } = useCookieConsent();

  // Migration automatique : nettoyer les anciens IDs numériques
  // + Migration : franciser les IDs anglais
  // Exécuté une seule fois au montage du Provider
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

      // Migration : Vérifier si userAllergies contient des anciens IDs numériques ("0", "1", "2"...)
      const hasOldNumericIds =
        Array.isArray(userAllergies) &&
        userAllergies.some((id) => /^\d+$/.test(id));

      if (hasOldNumericIds) {
        logger.warn(
          "Migration : Anciens IDs numériques détectés, nettoyage du localStorage...",
        );
        setUserAllergies([]); // Réinitialiser les allergies
        logger.info(
          "Migration terminée: utilisateur devra resélectionner ses allergies",
        );
        return; // Sortir pour ne pas exécuter la migration
      }

      // Migration : Franciser les IDs anglais
      const hasOldEnglishIds =
        Array.isArray(userAllergies) &&
        userAllergies.some((id) => ALLERGEN_MIGRATION_MAP[id]);

      if (hasOldEnglishIds) {
        logger.warn("🔄 Migration : Francisation des allergènes...");
        const migratedAllergies = userAllergies.map(
          (id) => ALLERGEN_MIGRATION_MAP[id] || id,
        );
        setUserAllergies(migratedAllergies);
        logger.info("✅ Migration réussie :", migratedAllergies);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Vider les allergies sauvegardées quand la sauvegarde est désactivée
  useEffect(() => {
    if (!isAllergiesAccepted && userAllergies.length > 0) {
      setUserAllergies([]);
      logger.debug("Allergies cleared - consent revoked");
    }
  }, [isAllergiesAccepted]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Ajoute ou retire un allergène (toggle)
   * @param {string} allergenId - ID de l'allergène (kebab-case)
   */
  const toggleAllergen = useCallback(
    (allergenId) => {
      if (typeof allergenId !== "string" || !allergenId) {
        logger.warn("toggleAllergen: allergenId must be a non-empty string");
        return;
      }

      setUserAllergies((prev) => {
        // Défense en profondeur: toujours vérifier que prev est un array
        const currentAllergies = Array.isArray(prev) ? prev : [];

        if (currentAllergies.includes(allergenId)) {
          // Retirer
          return currentAllergies.filter((id) => id !== allergenId);
        } else {
          // Ajouter
          return [...currentAllergies, allergenId];
        }
      });
    },
    [setUserAllergies],
  );

  /**
   * Remplace toutes les allergies par un nouveau tableau
   * @param {string[]} allergensArray - Nouveau tableau d'IDs d'allergènes
   */
  const setAllergies = useCallback(
    (allergensArray) => {
      if (!Array.isArray(allergensArray)) {
        logger.warn("setAllergies: allergensArray must be an array");
        return;
      }

      // Filtrer les IDs invalides (sécurité)
      const validIds = allergensArray.filter(
        (id) => typeof id === "string" && id.length > 0,
      );

      setUserAllergies(validIds);
    },
    [setUserAllergies],
  );

  /**
   * Efface toutes les allergies
   */
  const clearAllergies = useCallback(() => {
    setUserAllergies([]);
  }, [setUserAllergies]);

  /**
   * Active le filtrage des allergies
   */
  const enableFiltering = useCallback(() => {
    setIsFilteringEnabled(true);
  }, [setIsFilteringEnabled]);

  /**
   * Désactive le filtrage des allergies (garde les allergies en mémoire)
   */
  const disableFiltering = useCallback(() => {
    setIsFilteringEnabled(false);
  }, [setIsFilteringEnabled]);

  /**
   * Toggle le filtrage des allergies
   */
  const toggleFiltering = useCallback(() => {
    setIsFilteringEnabled((prev) => !prev);
  }, [setIsFilteringEnabled]);

  /**
   * Vérifie si un allergène est actif
   * @param {string} allergenId - ID de l'allergène à vérifier
   * @returns {boolean} true si l'allergène est dans la liste
   */
  const hasAllergen = useCallback(
    (allergenId) => {
      // Défense en profondeur: toujours vérifier que userAllergies est un array
      const allergies = Array.isArray(userAllergies) ? userAllergies : [];
      return allergies.includes(allergenId);
    },
    [userAllergies],
  );

  /**
   * Vérifie si un remède peut être utilisé en toute sécurité
   * Mode strict: retourne false si le remède contient au moins 1 allergène
   * Ne filtre QUE si isFilteringEnabled est true
   *
   * @param {Object} remedy - Objet remède depuis db.json
   * @returns {boolean} true si safe, false si dangereux
   */
  const canUseRemedy = useCallback(
    (remedy) => {
      // Si le filtrage est désactivé, tout est safe
      if (!isFilteringEnabled) return true;

      // Défense en profondeur
      const allergies = Array.isArray(userAllergies) ? userAllergies : [];

      // Pas d'allergies = tout est safe
      if (allergies.length === 0) return true;

      // Remède sans allergènes = safe
      if (!remedy || !Array.isArray(remedy.allergens)) return true;
      if (remedy.allergens.length === 0) return true;

      // Vérifier intersection: au moins 1 allergène en commun = dangereux
      const hasDangerousAllergen = remedy.allergens.some((allergenId) =>
        allergies.includes(allergenId),
      );

      return !hasDangerousAllergen;
    },
    [isFilteringEnabled, userAllergies],
  );

  const value = useMemo(
    () => ({
      userAllergies: Array.isArray(userAllergies) ? userAllergies : [],
      isFilteringEnabled,
      toggleAllergen,
      setAllergies,
      clearAllergies,
      hasAllergen,
      canUseRemedy,
      enableFiltering,
      disableFiltering,
      toggleFiltering,
    }),
    [
      userAllergies,
      isFilteringEnabled,
      toggleAllergen,
      setAllergies,
      clearAllergies,
      hasAllergen,
      canUseRemedy,
      enableFiltering,
      disableFiltering,
      toggleFiltering,
    ],
  );

  return (
    <AllergiesContext.Provider value={value}>
      {children}
    </AllergiesContext.Provider>
  );
}

AllergiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Hook pour accéder aux allergies de l'utilisateur
 * Doit être utilisé à l'intérieur d'un AllergiesProvider
 *
 * @returns {Object} { userAllergies, isFilteringEnabled, toggleAllergen, setAllergies, clearAllergies, hasAllergen, canUseRemedy, enableFiltering, disableFiltering, toggleFiltering }
 * @throws {Error} Si utilisé en dehors d'un AllergiesProvider
 */
// eslint-disable-next-line react-refresh/only-export-components -- Structure recommandée par React: hook avec son Provider
export function useAllergies() {
  const context = useContext(AllergiesContext);

  if (context === undefined) {
    throw new Error("useAllergies must be used within AllergiesProvider");
  }

  return context;
}
