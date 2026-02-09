import { createContext, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useAccessibility } from "../../settings/context/AccessibilityContext";

const ExternalLinkContext = createContext(undefined);

export function ExternalLinkProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [targetUrl, setTargetUrl] = useState("");
  const [siteName, setSiteName] = useState("");

  const { isExternalLinkConfirmEnabled } = useAccessibility();

  const openConfirmation = useCallback(
    (url, name) => {
      // Si confirmation désactivée, ouvrir directement sans modal
      if (!isExternalLinkConfirmEnabled) {
        window.open(url, "_blank", "noopener,noreferrer");
        return;
      }

      // Sinon, afficher la modal de confirmation (comportement actuel)
      setTargetUrl(url);
      setSiteName(name);
      setIsOpen(true);
    },
    [isExternalLinkConfirmEnabled],
  );

  const closeConfirmation = useCallback(() => {
    setIsOpen(false);
    setTargetUrl("");
    setSiteName("");
  }, []);

  const confirmAndNavigate = useCallback(() => {
    if (targetUrl) {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    }
    closeConfirmation();
  }, [targetUrl, closeConfirmation]);

  const value = useMemo(
    () => ({
      isOpen,
      targetUrl,
      siteName,
      openConfirmation,
      closeConfirmation,
      confirmAndNavigate,
    }),
    [
      isOpen,
      targetUrl,
      siteName,
      openConfirmation,
      closeConfirmation,
      confirmAndNavigate,
    ],
  );

  return (
    <ExternalLinkContext.Provider value={value}>
      {children}
    </ExternalLinkContext.Provider>
  );
}

ExternalLinkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ExternalLinkContext;
