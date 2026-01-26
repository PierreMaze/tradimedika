export const COOKIE_CATEGORIES = {
  necessary: {
    id: "necessary",
    label: "Cookies nécessaires",
    description:
      "Ces cookies sont essentiels au fonctionnement du site. Ils permettent de mémoriser vos préférences (thème, performance) et votre historique de recherche. Ces données restent uniquement sur votre appareil (localStorage) et ne sont jamais transmises à nos serveurs.",
    required: true,
    cookies: [
      {
        name: "tradimedika-theme",
        purpose: "Mémorise votre préférence de thème (mode clair/sombre)",
      },
      {
        name: "tradimedika-performance",
        purpose:
          "Mémorise vos préférences de performance (niveau d'animations)",
      },
      {
        name: "tradimedika-symptom-history",
        purpose: "Stocke votre historique de recherche de symptômes",
      },
      {
        name: "tradimedika-cookie-consent",
        purpose: "Enregistre vos choix concernant les cookies",
      },
    ],
  },
  analytics: {
    id: "analytics",
    label: "Cookies analytiques",
    description:
      "Ces cookies nous permettent de mesurer l'audience du site et d'améliorer nos contenus grâce à Google Analytics 4. Les données sont anonymisées et conformes au RGPD.",
    required: false,
    cookies: [
      {
        name: "_ga",
        purpose: "Identifiant unique anonyme Google Analytics (durée : 2 ans)",
      },
      {
        name: "_ga_*",
        purpose: "État de session Google Analytics (durée : 2 ans)",
      },
    ],
  },
};

export const CONSENT_STORAGE_KEY = "tradimedika-cookie-consent";
export const CONSENT_STORAGE_VERSION = 1;
export const CONSENT_DURATION_MS = 365 * 24 * 60 * 60 * 1000;

export const DEFAULT_CONSENT_CONFIG = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  functionality_storage: "denied",
  personalization_storage: "denied",
  security_storage: "granted",
  wait_for_update: 500,
};

export const ACCEPTED_CONSENT_CONFIG = {
  analytics_storage: "granted",
  functionality_storage: "granted",
};

export const REJECTED_CONSENT_CONFIG = {
  analytics_storage: "denied",
  functionality_storage: "denied",
};

export function initializeConsentMode() {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    // eslint-disable-next-line no-undef
    dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag("consent", "default", DEFAULT_CONSENT_CONFIG);
}

export function updateConsentMode(accepted) {
  if (typeof window.gtag !== "function") {
    console.warn("[CookieConsent] gtag not available");
    return;
  }

  const config = accepted ? ACCEPTED_CONSENT_CONFIG : REJECTED_CONSENT_CONFIG;
  window.gtag("consent", "update", config);
}

export function deleteGACookies(measurementId) {
  const cookies = [
    "_ga",
    `_ga_${measurementId.replace("G-", "")}`,
    "_gid",
    "_gat",
  ];

  cookies.forEach((name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
}
