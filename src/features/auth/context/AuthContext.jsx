import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(undefined);

const AUTH_STORAGE_KEY = "tradimedika-auth-session";

function getStoredSession() {
  try {
    const item = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!item) return null;
    const parsed = JSON.parse(item);
    if (parsed && parsed.authenticated && parsed.email) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => getStoredSession());

  const isAuthenticated = session?.authenticated === true;
  const userEmail = session?.email || null;

  const login = useCallback((email, password) => {
    const envEmail = import.meta.env.VITE_PRO_EMAIL;
    const envPassword = import.meta.env.VITE_PRO_PASSWORD;

    if (!envEmail || !envPassword) {
      return { success: false, error: "Configuration manquante" };
    }

    if (email === envEmail && password === envPassword) {
      const newSession = { authenticated: true, email };
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newSession));
      setSession(newSession);
      return { success: true };
    }

    return { success: false, error: "Email ou mot de passe incorrect" };
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      userEmail,
      login,
      logout,
    }),
    [isAuthenticated, userEmail, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components -- Structure recommandée par React: hook avec son Provider
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
