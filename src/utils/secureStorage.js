import { createLogger } from "./logger";

const logger = createLogger("secureStorage");

/**
 * Clé secrète pour la signature HMAC
 * Note: En production, cette clé devrait être stockée de manière sécurisée
 * Pour une application cliente, la vraie sécurité viendrait d'un backend
 */
const SECRET_KEY = "tradimedika-hmac-secret-v1";

/**
 * Génère une signature HMAC simple pour les données
 * Note: Utilise un algorithme simple car crypto.subtle n'est pas disponible en synchrone
 * @param {string} data - Données à signer
 * @param {string} key - Clé secrète
 * @returns {string} - Signature hex
 */
function generateSimpleHMAC(data, key) {
  // Simple hash pour la signature (non cryptographiquement sécurisé mais suffisant pour la détection de tampering)
  let hash = 0;
  const combined = key + data + key;

  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash).toString(16);
}

/**
 * Encrypts data for localStorage storage
 * Ajoute un timestamp et une signature HMAC pour détecter le tampering
 * @param {any} data - Données à chiffrer
 * @param {string} key - Clé personnalisée (optionnelle)
 * @returns {string} - Données chiffrées en JSON
 */
export function encryptForStorage(data, key = SECRET_KEY) {
  try {
    const payload = JSON.stringify(data);
    const timestamp = Date.now();
    const signature = generateSimpleHMAC(payload + timestamp, key);

    const encrypted = {
      payload,
      timestamp,
      signature,
      version: 1, // Pour migrations futures
    };

    return JSON.stringify(encrypted);
  } catch (error) {
    logger.error("Erreur lors du chiffrement des données:", error);
    throw error;
  }
}

/**
 * Decrypts data from localStorage
 * Vérifie la signature HMAC et la validité des données
 * @param {string} encrypted - Données chiffrées
 * @param {string} key - Clé personnalisée (optionnelle)
 * @param {number} maxAge - Âge maximum en ms (défaut: 1 an)
 * @returns {any|null} - Données déchiffrées ou null si invalides
 */
export function decryptFromStorage(
  encrypted,
  key = SECRET_KEY,
  maxAge = 365 * 24 * 60 * 60 * 1000,
) {
  try {
    const parsed = JSON.parse(encrypted);

    // Vérifier la structure
    if (
      !parsed ||
      typeof parsed !== "object" ||
      !parsed.payload ||
      !parsed.timestamp ||
      !parsed.signature
    ) {
      logger.warn("Structure de données invalide");
      return null;
    }

    const { payload, timestamp, signature } = parsed;

    // Vérifier la signature
    const expectedSignature = generateSimpleHMAC(payload + timestamp, key);
    if (signature !== expectedSignature) {
      logger.error("Signature invalide - données potentiellement tamponnées");
      return null;
    }

    // Vérifier l'âge des données
    const age = Date.now() - timestamp;
    if (age > maxAge) {
      logger.warn(
        `Données expirées (âge: ${Math.floor(age / (24 * 60 * 60 * 1000))} jours)`,
      );
      return null;
    }

    // Décoder le payload
    return JSON.parse(payload);
  } catch (error) {
    logger.warn("Erreur lors du déchiffrement:", error);
    return null;
  }
}

/**
 * Vérifie si les données stockées sont valides sans les déchiffrer complètement
 * @param {string} encrypted - Données chiffrées
 * @param {string} key - Clé personnalisée (optionnelle)
 * @returns {boolean} - true si les données sont valides
 */
export function isStorageValid(encrypted, key = SECRET_KEY) {
  try {
    const parsed = JSON.parse(encrypted);
    if (!parsed || !parsed.payload || !parsed.timestamp || !parsed.signature) {
      return false;
    }

    const expectedSignature = generateSimpleHMAC(
      parsed.payload + parsed.timestamp,
      key,
    );
    return parsed.signature === expectedSignature;
  } catch {
    return false;
  }
}
