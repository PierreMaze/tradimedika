import { useContext } from "react";
import ExternalLinkContext from "../context/ExternalLinkContext";

export function useExternalLink() {
  const context = useContext(ExternalLinkContext);

  if (context === undefined) {
    throw new Error(
      "useExternalLink must be used within an ExternalLinkProvider",
    );
  }

  return context;
}
