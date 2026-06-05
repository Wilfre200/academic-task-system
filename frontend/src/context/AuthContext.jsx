import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const storedToken =
    localStorage.getItem("token");

  const [token, setToken] =
    useState(storedToken);

  const [user, setUser] =
    useState(
      storedToken
        ? jwtDecode(storedToken)
        : null
    );

  const login = (jwt) => {

    localStorage.setItem(
      "token",
      jwt
    );

    setToken(jwt);

    const decoded =
      jwtDecode(jwt);

    setUser(decoded);

  };

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    setToken(null);

    setUser(null);

  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () =>
  useContext(AuthContext);