/**
 * Validates that an image URL uses HTTPS protocol
 * @param {string} url - The URL to validate
 * @returns {boolean} True if URL is valid and uses HTTPS
 */
export function isValidImageUrl(url) {
  if (!url || typeof url !== "string") return false;
  return /^https:\/\/.+/.test(url);
}

/**
 * Returns safe image URL or placeholder if invalid
 * @param {string} url - The URL to validate
 * @returns {string} Safe HTTPS URL or placeholder
 */
export function getSafeImageUrl(url) {
  return isValidImageUrl(url)
    ? url
    : "https://via.placeholder.com/400x400?text=Image+non+disponible";
}
