import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const SettingsModalContext = createContext(undefined);

export function SettingsModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldOpenCookieSection, setShouldOpenCookieSection] = useState(false);

  const openSettings = useCallback(() => {
    setIsOpen(true);
    setShouldOpenCookieSection(false);
  }, []);

  const openSettingsWithCookies = useCallback(() => {
    setIsOpen(true);
    setShouldOpenCookieSection(true);
  }, []);

  const closeSettings = useCallback(() => {
    setIsOpen(false);
    setShouldOpenCookieSection(false);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      shouldOpenCookieSection,
      openSettings,
      openSettingsWithCookies,
      closeSettings,
      resetCookieSectionFlag: () => setShouldOpenCookieSection(false),
    }),
    [
      isOpen,
      shouldOpenCookieSection,
      openSettings,
      openSettingsWithCookies,
      closeSettings,
    ],
  );

  return (
    <SettingsModalContext.Provider value={value}>
      {children}
    </SettingsModalContext.Provider>
  );
}

SettingsModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Hook pour accéder aux paramètres de la modal
 * Doit être utilisé à l'intérieur d'un SettingsModalProvider
 *
 * @returns {Object} { isOpen, shouldOpenCookieSection, openSettings, openSettingsWithCookies, closeSettings, resetCookieSectionFlag }
 * @throws {Error} Si utilisé en dehors d'un SettingsModalProvider
 */
// eslint-disable-next-line react-refresh/only-export-components -- Structure recommandée par React: hook avec son Provider
export function useSettingsModal() {
  const context = useContext(SettingsModalContext);
  if (context === undefined) {
    throw new Error(
      "useSettingsModal must be used within SettingsModalProvider",
    );
  }
  return context;
}
