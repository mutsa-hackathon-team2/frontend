import { useEffect, useMemo, useState } from "react";
import { checkSession } from "../apis/authApi.js";
import AuthContext from "../contexts/AuthContext.js";

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadSession() {
      try {
        const isLoggedIn = await checkSession({
          signal: controller.signal,
        });
        setIsAuthenticated(isLoggedIn);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setIsAuthenticated(false);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsAuthLoading(false);
        }
      }
    }

    loadSession();

    return () => controller.abort();
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      isAuthLoading,
    }),
    [isAuthenticated, isAuthLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
