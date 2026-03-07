export const ROLES = {
  PATIENT: "patient",
  PRO: "pro",
  ADMIN: "admin",
};

export const ROLE_LABELS = {
  [ROLES.PATIENT]: "Particulier",
  [ROLES.PRO]: "Professionnel",
  [ROLES.ADMIN]: "Administrateur",
};

export const ACCOUNTS = [
  {
    email: "patient@tradimedika.com",
    password: "Tradi2026!",
    role: ROLES.PATIENT,
  },
  {
    email: "pro@tradimedika.com",
    password: "Tradi2026!",
    role: ROLES.PRO,
  },
  {
    email: "admin@tradimedika.com",
    password: "Tradi2026!",
    role: ROLES.ADMIN,
  },
];
