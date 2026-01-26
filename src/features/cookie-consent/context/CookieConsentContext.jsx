import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { createLogger } from "../../../utils/logger";
import {
  CONSENT_STORAGE_KEY,
  CONSENT_STORAGE_VERSION,
  CONSENT_DURATION_MS,
  updateConsentMode,
  deleteGACookies,
} from "../constants/cookieConfig";

const logger = createLogger("CookieConsent");
const CookieConsentContext = createContext(undefined);

function isConsentValid(data) {
  if (!data) return false;
  if (data.version !== CONSENT_STORAGE_VERSION) {
    logger.debug("Consent version mismatch", {
      stored: data.version,
      current: CONSENT_STORAGE_VERSION,
    });
    return false;
  }
  if (Date.now() > data.expiresAt) {
    logger.debug("Consent expired", { expiresAt: new Date(data.expiresAt) });
    return false;
  }
  return true;
}

export function CookieConsentProvider({ children }) {
  const [storedConsent, setStoredConsent] = useLocalStorage(
    CONSENT_STORAGE_KEY,
    null,
  );

  // Check storage availability on mount - initialize with function to avoid effect
  const [storageAvailable] = useState(() => {
    try {
      localStorage.setItem("__test__", "test");
      localStorage.removeItem("__test__");
      return true;
    } catch {
      logger.error("localStorage non disponible");
      return false;
    }
  });

  const consentData = useMemo(() => {
    return isConsentValid(storedConsent) ? storedConsent : null;
  }, [storedConsent]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === CONSENT_STORAGE_KEY) {
        try {
          const newValue = JSON.parse(e.newValue);
          if (isConsentValid(newValue)) {
            logger.debug("Consent updated from another tab", newValue);
            updateConsentMode(newValue.accepted);
          }
        } catch (error) {
          logger.warn("Invalid consent data from storage event", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const acceptCookies = useCallback(() => {
    const newConsent = {
      version: CONSENT_STORAGE_VERSION,
      accepted: true,
      timestamp: Date.now(),
      expiresAt: Date.now() + CONSENT_DURATION_MS,
      categories: { analytics: true, functional: true },
    };

    setStoredConsent(newConsent);
    updateConsentMode(true);
    logger.debug("Cookies accepted", newConsent);
  }, [setStoredConsent]);

  const rejectCookies = useCallback(() => {
    const newConsent = {
      version: CONSENT_STORAGE_VERSION,
      accepted: false,
      timestamp: Date.now(),
      expiresAt: Date.now() + CONSENT_DURATION_MS,
      categories: { analytics: false, functional: false },
    };

    setStoredConsent(newConsent);
    updateConsentMode(false);

    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (measurementId) {
      deleteGACookies(measurementId);
    }

    logger.debug("Cookies rejected", newConsent);
  }, [setStoredConsent]);

  const value = useMemo(
    () => ({
      consentData,
      hasConsent: consentData !== null,
      isAccepted: consentData?.accepted ?? false,
      acceptCookies,
      rejectCookies,
      storageAvailable,
    }),
    [consentData, acceptCookies, rejectCookies, storageAvailable],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

CookieConsentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error(
      "useCookieConsent must be used within CookieConsentProvider",
    );
  }
  return context;
}
