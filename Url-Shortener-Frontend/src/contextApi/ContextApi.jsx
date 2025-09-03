import { createContext, useContext, useEffect, useState } from "react";

const ContextApi = createContext(null);

const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

export const ContextProvider = ({ children }) => {

  const [token, setToken] = useState(() => localStorage.getItem("JWT_TOKEN") || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("JWT_TOKEN", token);
      const userData = decodeJWT(token);
      setUser(userData);
    } else {
      localStorage.removeItem("JWT_TOKEN");
      setUser(null);
    }
  }, [token]);

  const value = { token, setToken, user };

  return <ContextApi.Provider value={value}>{children}</ContextApi.Provider>;
};

export const useStoreContext = () => useContext(ContextApi);
