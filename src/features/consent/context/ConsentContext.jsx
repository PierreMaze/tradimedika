import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { ConsentContext } from "./createConsentContext";

const CONSENT_STORAGE_KEY = "tradimedika-consent-health-data";

/**
 * Provider pour le consentement RGPD
 * Gère l'état global du consentement partagé dans toute l'application
 */
export function ConsentProvider({ children }) {
  // État initial basé sur localStorage (appelé UNE SEULE FOIS au montage de l'app)
  const [isModalOpen, setIsModalOpen] = useState(() => {
    const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
    return consent !== "accepted";
  });

  const [hasConsent, setHasConsent] = useState(() => {
    const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
    return consent === "accepted";
  });

  const consentDate = useCallback(() => {
    const consentTimestamp = localStorage.getItem(
      `${CONSENT_STORAGE_KEY}-date`,
    );
    return consentTimestamp ? new Date(parseInt(consentTimestamp, 10)) : null;
  }, []);

  const grantConsent = useCallback(() => {
    localStorage.setItem(CONSENT_STORAGE_KEY, "accepted");
    localStorage.setItem(`${CONSENT_STORAGE_KEY}-date`, Date.now().toString());
    setHasConsent(true);
    setIsModalOpen(false);
  }, []);

  const revokeConsent = useCallback(() => {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    localStorage.removeItem(`${CONSENT_STORAGE_KEY}-date`);

    // Effacer toutes les données de santé
    localStorage.removeItem("tradimedika-symptom-tags");
    localStorage.removeItem("tradimedika-search-history");
    localStorage.removeItem("tradimedika-allergies");

    setHasConsent(false);
    setIsModalOpen(true);
  }, []);

  const openConsentModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeConsentModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Valeur du contexte partagée avec tous les composants enfants
  const value = {
    hasConsent,
    consentDate: consentDate(),
    isModalOpen,
    grantConsent,
    revokeConsent,
    openConsentModal,
    closeConsentModal,
  };

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

ConsentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
