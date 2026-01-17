import { useMemo } from "react";
import db from "../../../data/db.json";
import { getRemedyBySlug } from "../../remedy-result-page";
import { getSafeImageUrl } from "../utils/remedyImageValidator";

/**
 * Hook to fetch and validate remedy details by slug
 * @param {string} slug - The remedy slug from URL params
 * @returns {Object} { remedy, safeImageUrl, notFound }
 */
export function useRemedyDetails(slug) {
  const remedy = useMemo(() => getRemedyBySlug(slug, db), [slug]);

  const safeImageUrl = useMemo(
    () => (remedy ? getSafeImageUrl(remedy.image) : null),
    [remedy],
  );

  return {
    remedy,
    safeImageUrl,
    notFound: !remedy,
  };
}
